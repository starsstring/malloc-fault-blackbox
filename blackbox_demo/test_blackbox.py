"""Check snapshot ownership, order, budget and failure isolation."""
import pathlib
import re
import subprocess
import sys

program = str(pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else './blackbox').resolve())
temperatures = [25, 42, 27, 28, 29, 46, 26, 27, 49, 26, 51, 25]
checks = 0


def execute(args):
    result = subprocess.run([program, *args], capture_output=True, text=True, timeout=10)
    output = result.stdout + result.stderr
    assert not any(word in output for word in ['AddressSanitizer', 'runtime error:', 'LeakSanitizer']), output
    return result.returncode, output


_, layout = execute(['--budget', '8192'])
sample_bytes, header_bytes = map(int, re.search(r'sample_bytes=(\d+) header_bytes=(\d+)', layout).groups())
first = header_bytes + 2 * sample_bytes
full = header_bytes + 4 * sample_bytes


def check(args, events, window=4, threshold=40, samples=12, rejected=0, failed=0):
    global checks
    code, output = execute(args)
    assert (code == 0) == (rejected == 0 and failed == 0), (args, code, output)
    all_events = [i + 1 for i, t in enumerate(temperatures[:samples]) if t >= threshold]
    summary = re.search(r'SUMMARY events=(\d+) saved=(\d+) rejected=(\d+) alloc_failed=(\d+) used=(\d+)', output)
    expected_bytes = sum(header_bytes + min(e, window) * sample_bytes for e in events)
    assert summary and tuple(map(int, summary.groups())) == (
        len(all_events), len(events), rejected, failed, expected_bytes), (args, output)
    snapshots = re.findall(r'SNAPSHOT event=(\d+) frames=([^\n]+)', output)
    assert [int(e) for e, _ in snapshots] == events, (args, output)
    for event, records in snapshots:
        event = int(event)
        got = [(int(n), float(t)) for n, t in re.findall(r'(\d+):([\d.]+)', records)]
        expected = [(n, float(temperatures[n - 1])) for n in range(max(1, event - window + 1), event + 1)]
        assert got == expected, (args, got, expected, output)
    live = re.search(r'LIVE_RING final_frames=([^\n]+)', output).group(1)
    assert list(map(int, live.split(','))) == list(range(max(1, samples - window + 1), samples + 1)), (args, output)
    cleanup = f'CLEANUP blocks={len(events)} released={expected_bytes} remaining=0'
    assert output.count(cleanup) == 1, (args, output)
    budget = int(re.search(r'window=\d+ budget=(\d+)', output).group(1))
    used = [int(n) for n in re.findall(r'CAPTURE event=\d+ frames=\d+ bytes=\d+ used=(\d+)', output)]
    assert all(n <= budget for n in used), (args, output)
    checks += 1
    print(f'PASS {checks:02d}: {" ".join(args) or "default"}')


check([], [2, 6, 9], rejected=1)
check(['--budget', '8192'], [2, 6, 9, 11])
check(['--window', '1', '--budget', '8192'], [2, 6, 9, 11], window=1)
check(['--window', '16', '--budget', '8192'], [2, 6, 9, 11], window=16)
check(['--budget', str(first)], [2], rejected=3)
check(['--budget', str(first + full)], [2, 6], rejected=2)
check(['--budget', str(first + 2 * full)], [2, 6, 9], rejected=1)
check(['--budget', str(first - 1)], [], rejected=4)
check(['--budget', '8192', '--fail-after', '0'], [], failed=4)
check(['--budget', '8192', '--fail-after', '1'], [2], failed=3)
check(['--budget', '8192', '--fail-after', '2'], [2, 6], failed=2)
check(['--budget', '8192', '--fail-after', '4'], [2, 6, 9, 11])
check(['--samples', '1'], [], samples=1)
check(['--samples', '2'], [2], samples=2)
check(['--threshold', '100'], [], threshold=100)
check(['--threshold', '1', '--budget', '8192'], list(range(1, 9)), threshold=1, rejected=4)
for args in [
    ['--window', '0'], ['--window', '17'], ['--budget', '0'], ['--budget', '8193'],
    ['--samples', '13'], ['--threshold', '101'], ['--fail-after', '-1'],
    ['--window', 'abc'], ['--budget', '+1'], ['--samples', ' 2'],
    ['--budget', '184467440737095516160000'], ['--window', ''], ['--window'],
    ['--unknown'],
]:
    code, output = execute(args)
    assert code != 0 and ('Invalid or missing parameter' in output or 'Unknown option:' in output), (args, output)
    checks += 1
    print(f'PASS {checks:02d}: invalid {args!r}')
code, output = execute(['--help'])
assert code == 0 and 'Usage:' in output
checks += 1
print(f'PASS {checks:02d}: help')
print(f'ALL {checks} CHECKS PASSED')
