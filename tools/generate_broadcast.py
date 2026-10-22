"""Generate consistent Chinese narration and provider word timing.

Requires edge-tts==7.3.1. No style prompt, pitch modification or speed-up.
"""
from pathlib import Path
import asyncio,html,json,sys

ROOT=Path(__file__).resolve().parents[1]
try:
    import edge_tts
except ImportError:
    local=ROOT.parents[1]/'work/tools/tts_deps'
    if local.exists():sys.path.insert(0,str(local))
    import edge_tts

VOICE='zh-CN-XiaoxiaoNeural'
RATE='-2%'
OUT=ROOT/'build/voice-broadcast'

def normalized(text):
    return ''.join(c.casefold() for c in html.unescape(text) if c.isalnum())

async def main():
    OUT.mkdir(parents=True,exist_ok=True)
    scenes=json.loads((ROOT/'narration.json').read_text(encoding='utf-8'))
    for i,scene in enumerate(scenes):
        audio=OUT/(scene['id']+'.mp3')
        metadata=OUT/(scene['id']+'.words.json')
        if audio.exists() and metadata.exists():
            cached=json.loads(metadata.read_text(encoding='utf-8'))
            if normalized(''.join(w['text'] for w in cached))==normalized(scene['text']):
                print('Keep '+scene['id'],flush=True);continue
        for attempt in range(2):
            try:
                words=[]
                communicate=edge_tts.Communicate(scene['text'],VOICE,rate=RATE,pitch='+0Hz',boundary='WordBoundary',connect_timeout=25,receive_timeout=90)
                with audio.with_suffix('.mp3.part').open('wb') as stream:
                    async for item in communicate.stream():
                        if item['type']=='audio':stream.write(item['data'])
                        elif item['type']=='WordBoundary':words.append(item)
                assert words,'No word timing received'
                metadata.write_text(json.dumps(words,ensure_ascii=False,indent=2),encoding='utf-8')
                audio.with_suffix('.mp3.part').replace(audio)
                print(f'{i+1}/15 {scene["id"]}: {audio.stat().st_size} bytes, {len(words)} word timings',flush=True)
                break
            except Exception as error:
                if attempt==1:raise
                print(f'Retry {scene["id"]}: {type(error).__name__}',flush=True)
    (OUT/'provider.json').write_text(json.dumps({'provider':'Microsoft Edge online TTS','voice':VOICE,'rate':RATE,'pitch':'+0Hz','postProcessingPlaybackRate':1.0,'delivery':'steady female Chinese explanatory narration; default voice style, not Azure newscast SSML','wordTiming':'provider WordBoundary metadata'},ensure_ascii=False,indent=2),encoding='utf-8')
    print('All narration tracks generated.',flush=True)

asyncio.run(main())
