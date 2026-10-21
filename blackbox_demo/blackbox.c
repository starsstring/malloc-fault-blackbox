/* Fault-context snapshots. Simulated input, standard C11 user-space example.
 * The live ring is fixed. Each saved event owns one malloc allocation.
 */
#include <errno.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_WINDOW 16
#define MAX_SNAPSHOTS 8

typedef struct {
    unsigned int sequence;
    int temperature_tenths;
} Sample;

typedef struct {
    size_t event;
    size_t count;
    Sample frames[]; /* C99 flexible array member, also supported in C11 */
} Snapshot;

typedef struct {
    Sample frames[MAX_WINDOW];
    size_t next;
    size_t count;
    size_t window;
} Ring;

typedef struct {
    Snapshot *saved[MAX_SNAPSHOTS];
    size_t count;
    size_t used;
    size_t budget;
    size_t seen;
    size_t rejected;
    size_t failed;
} Recorder;

static size_t fail_after = SIZE_MAX;
static size_t successful_allocations = 0;

static void *snapshot_malloc(size_t bytes)
{
    void *result;
    /* Test hook: simulate NULL without exhausting the real machine. */
    if (successful_allocations >= fail_after) {
        return NULL;
    }
    result = malloc(bytes);
    if (result != NULL) {
        ++successful_allocations;
    }
    return result;
}

static void ring_push(Ring *ring, Sample sample)
{
    ring->frames[ring->next] = sample;
    ring->next = (ring->next + 1) % ring->window;
    if (ring->count < ring->window) {
        ++ring->count;
    }
}

static void capture(Recorder *recorder, const Ring *ring, size_t event)
{
    Snapshot *snapshot;
    size_t bytes;
    size_t oldest;
    size_t i;
    ++recorder->seen;
    if (ring->count > (SIZE_MAX - sizeof *snapshot) / sizeof(Sample)) {
        ++recorder->rejected;
        printf("REJECT event=%zu reason=size_overflow\n", event);
        return;
    }
    bytes = sizeof *snapshot + ring->count * sizeof(Sample);
    if (recorder->count == MAX_SNAPSHOTS ||
        bytes > recorder->budget - recorder->used) {
        ++recorder->rejected;
        printf("REJECT event=%zu reason=budget_or_slots bytes=%zu used=%zu\n",
               event, bytes, recorder->used);
        return;
    }
    snapshot = snapshot_malloc(bytes);
    if (snapshot == NULL) {
        ++recorder->failed;
        printf("ALLOC_FAIL event=%zu previous_snapshots_preserved\n", event);
        return;
    }
    snapshot->event = event;
    snapshot->count = ring->count;
    oldest = (ring->next + ring->window - ring->count) % ring->window;
    for (i = 0; i < ring->count; ++i) {
        snapshot->frames[i] = ring->frames[(oldest + i) % ring->window];
    }
    /* Publish only after all snapshot fields have been initialized. */
    recorder->saved[recorder->count++] = snapshot;
    recorder->used += bytes;
    printf("CAPTURE event=%zu frames=%zu bytes=%zu used=%zu\n",
           event, snapshot->count, bytes, recorder->used);
}

static void report(const Recorder *recorder)
{
    size_t i;
    size_t j;
    for (i = 0; i < recorder->count; ++i) {
        const Snapshot *snapshot = recorder->saved[i];
        printf("SNAPSHOT event=%zu frames=", snapshot->event);
        for (j = 0; j < snapshot->count; ++j) {
            const Sample *frame = &snapshot->frames[j];
            printf("%s%u:%.1f", j == 0 ? "" : ",", frame->sequence,
                   frame->temperature_tenths / 10.0);
        }
        putchar('\n');
    }
    printf("SUMMARY events=%zu saved=%zu rejected=%zu alloc_failed=%zu used=%zu\n",
           recorder->seen, recorder->count, recorder->rejected,
           recorder->failed, recorder->used);
}

static void release_all(Recorder *recorder)
{
    size_t i;
    size_t blocks = recorder->count;
    size_t bytes = recorder->used;
    for (i = 0; i < recorder->count; ++i) {
        free(recorder->saved[i]);
        recorder->saved[i] = NULL;
    }
    recorder->count = 0;
    recorder->used = 0;
    printf("CLEANUP blocks=%zu released=%zu remaining=%zu\n", blocks, bytes,
           recorder->used);
}

static int parse_count(const char *text, size_t low, size_t high, size_t *out)
{
    const char *cursor;
    char *end;
    unsigned long number;
    if (*text == '\0') {
        return 0;
    }
    for (cursor = text; *cursor != '\0'; ++cursor) {
        if (*cursor < '0' || *cursor > '9') {
            return 0;
        }
    }
    errno = 0;
    number = strtoul(text, &end, 10);
    if (errno == ERANGE || *end != '\0' || number < low || number > high) {
        return 0;
    }
    *out = (size_t)number;
    return 1;
}

static void usage(const char *program)
{
    printf("Usage: %s [--window 1..16] [--budget 1..8192]\n", program);
    puts("       [--samples 1..12] [--threshold 1..100] [--fail-after 0..4096]");
    puts("Defaults: window=4 budget=128 samples=12 threshold=40 C.");
    puts("Simulated input. Snapshots are RAM-only; no hard real-time guarantee.");
    puts("Exit 0: all triggered snapshots saved. Exit nonzero: loss or bad input.");
}

int main(int argc, char **argv)
{
    const int temperatures[] = {250, 420, 270, 280, 290, 460,
                                260, 270, 490, 260, 510, 250};
    size_t window = 4;
    size_t budget = 128;
    size_t samples = 12;
    size_t threshold = 40;
    Ring ring = {0};
    Recorder recorder = {0};
    size_t i;
    int argument;
    int status;
    for (argument = 1; argument < argc; ++argument) {
        size_t *destination;
        size_t low = 1;
        size_t high;
        if (strcmp(argv[argument], "--help") == 0) {
            usage(argv[0]);
            return EXIT_SUCCESS;
        }
        if (strcmp(argv[argument], "--window") == 0) {
            destination = &window; high = MAX_WINDOW;
        } else if (strcmp(argv[argument], "--budget") == 0) {
            destination = &budget; high = 8192;
        } else if (strcmp(argv[argument], "--samples") == 0) {
            destination = &samples; high = 12;
        } else if (strcmp(argv[argument], "--threshold") == 0) {
            destination = &threshold; high = 100;
        } else if (strcmp(argv[argument], "--fail-after") == 0) {
            destination = &fail_after; high = 4096; low = 0;
        } else {
            fprintf(stderr, "Unknown option: %s\n", argv[argument]);
            return EXIT_FAILURE;
        }
        ++argument;
        if (argument == argc || !parse_count(argv[argument], low, high, destination)) {
            fputs("Invalid or missing parameter\n", stderr);
            return EXIT_FAILURE;
        }
    }
    ring.window = window;
    recorder.budget = budget;
    printf("CONFIG sample_bytes=%zu header_bytes=%zu window=%zu budget=%zu\n",
           sizeof(Sample), sizeof(Snapshot), window, budget);
    for (i = 0; i < samples; ++i) {
        Sample sample;
        sample.sequence = (unsigned int)(i + 1);
        sample.temperature_tenths = temperatures[i];
        ring_push(&ring, sample);
        if (sample.temperature_tenths >= (int)threshold * 10) {
            capture(&recorder, &ring, i + 1);
        }
    }
    printf("LIVE_RING final_frames=");
    for (i = 0; i < ring.count; ++i) {
        size_t index = (ring.next + ring.window - ring.count + i) % ring.window;
        printf("%s%u", i == 0 ? "" : ",", ring.frames[index].sequence);
    }
    putchar('\n');
    report(&recorder);
    status = recorder.rejected != 0 || recorder.failed != 0 ? EXIT_FAILURE : EXIT_SUCCESS;
    release_all(&recorder);
    return status;
}
