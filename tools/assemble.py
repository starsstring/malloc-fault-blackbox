"""Normalize narration and author explicit Remotion scenes with word timing.

Run tools/generate_broadcast.py first. Caption text remains the reviewed
script; phrase timing comes from provider WordBoundary metadata.
"""
from pathlib import Path
import argparse, html, json, math, os, re, shutil, subprocess, wave
import numpy as np

ROOT=Path(__file__).resolve().parents[1]
FFMPEG=os.environ.get('FFMPEG_BINARY') or shutil.which('ffmpeg')
if not FFMPEG:
    candidate=ROOT.parents[1]/'work/tools/video_deps/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
    if candidate.exists(): FFMPEG=str(candidate)
assert FFMPEG, 'Set FFMPEG_BINARY to an FFmpeg executable'
FPS=30
LEAD=18
TRANSITION=15
scenes=json.loads((ROOT/'narration.json').read_text(encoding='utf-8'))
parser=argparse.ArgumentParser()
parser.add_argument('--preview-available',action='store_true',help='Temporary layout review using only completed voice tracks')
args=parser.parse_args()
if args.preview_available:
    scenes=[s for s in scenes if (ROOT/f'build/voice-broadcast/{s["id"]}.mp3').exists()]
for folder in ['public/voice','public/captions','public/word-timing','build/voice-normalized']:
    (ROOT/folder).mkdir(parents=True,exist_ok=True)

def normalized(text):
    return ''.join(c.casefold() for c in html.unescape(text) if c.isalnum())

def timed_captions(text, words, seconds):
    # Provider tokens must cover the exact script, ignoring punctuation/space.
    assert normalized(text)==normalized(''.join(w['text'] for w in words)), 'Voice/script token mismatch'
    spans=[];position=0
    for word in words:
        length=len(normalized(word['text']))
        if not length:continue
        spans.append((position,position+length,word['offset']/1e7,(word['offset']+word['duration'])/1e7))
        position+=length
    phrases=re.findall(r'[^，。！？；：]+[，。！？；：]?',text)
    pieces=[]
    for phrase in phrases:
        while len(phrase)>38:
            pieces.append(phrase[:25]);phrase=phrase[25:]
        if phrase:pieces.append(phrase)
    starts=[];ends=[];position=0
    for phrase in pieces:
        length=len(normalized(phrase));end=position+length
        matching=[span for span in spans if span[0]<end and span[1]>position]
        assert matching,phrase
        first,last=matching[0],matching[-1]
        start_time=first[2]+(first[3]-first[2])*(position-first[0])/(first[1]-first[0])
        end_time=last[2]+(last[3]-last[2])*(end-last[0])/(last[1]-last[0])
        starts.append(round((max(0,start_time-.06)+LEAD/FPS)*1000))
        ends.append(round((min(seconds,end_time+.22)+LEAD/FPS)*1000))
        position=end
    return [dict(text=p,startMs=starts[i],endMs=starts[i+1] if i+1<len(starts) else ends[i],timestampMs=None,confidence=None,pageBreakAfter=True) for i,p in enumerate(pieces)]

timeline=[];offset=0;srt=[]
for scene in scenes:
    sid=scene['id'];raw=ROOT/f'build/voice-broadcast/{sid}.mp3';pcm=ROOT/f'build/voice-normalized/{sid}.wav';mp3=ROOT/f'public/voice/{sid}.mp3'
    assert raw.exists(),f'Missing voice track: {raw}'
    words=json.loads((ROOT/f'build/voice-broadcast/{sid}.words.json').read_text(encoding='utf-8'))
    assert normalized(scene['text'])==normalized(''.join(w['text'] for w in words)),sid+': word timing does not cover script'
    shutil.copyfile(ROOT/f'build/voice-broadcast/{sid}.words.json',ROOT/f'public/word-timing/{sid}.json')
    spoken_end=max((w['offset']+w['duration'])/1e7 for w in words)
    subprocess.run([FFMPEG,'-hide_banner','-loglevel','error','-y','-i',str(raw),'-t',str(spoken_end+.26),'-af','highpass=f=70,loudnorm=I=-18:TP=-2:LRA=7','-ar','48000','-ac','1','-c:a','pcm_s16le',str(pcm)],check=True)
    with wave.open(str(pcm),'rb') as w:
        rate=w.getframerate();samples=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').astype(float)/32768
    seconds=len(samples)/rate
    subprocess.run([FFMPEG,'-hide_banner','-loglevel','error','-y','-i',str(pcm),'-c:a','libmp3lame','-b:a','128k',str(mp3)],check=True)
    captions=timed_captions(scene['text'],words,seconds)
    (ROOT/f'public/captions/{sid}.json').write_text(json.dumps(captions,ensure_ascii=False,indent=2),encoding='utf-8')
    frames=math.ceil(seconds*FPS)+42
    item={**scene,'audioSeconds':round(seconds,6),'frames':frames,'from':offset,'durationSeconds':frames/FPS,'captions':captions}
    timeline.append(item)
    for caption in captions:srt.append({**caption,'startMs':caption['startMs']+round(offset/FPS*1000),'endMs':caption['endMs']+round(offset/FPS*1000)})
    offset+=frames-TRANSITION
    print(f'{sid}: {seconds:.2f}s, {len(captions)} caption pages',flush=True)
total=offset+TRANSITION
(ROOT/'build/timeline.json').write_text(json.dumps({'fps':FPS,'transitionFrames':TRANSITION,'durationInFrames':total,'scenes':timeline},ensure_ascii=False,indent=2),encoding='utf-8')
shutil.copyfile(ROOT/'build/voice-broadcast/provider.json',ROOT/'配音参数.json')

def stamp(ms):
    h,ms=divmod(ms,3600000);m,ms=divmod(ms,60000);s,ms=divmod(ms,1000)
    return f'{h:02}:{m:02}:{s:02},{ms:03}'
(ROOT/'malloc的一生.srt').write_text('\n\n'.join(f'{i+1}\n{stamp(c["startMs"])} --> {stamp(c["endMs"])}\n{c["text"]}' for i,c in enumerate(srt))+'\n',encoding='utf-8')

content=["import {Interactive, staticFile, useVideoConfig} from 'remotion';","import {Audio} from '@remotion/media';","import {SceneArt} from './Visuals';","import {BasicCaptions} from './basic-captions';"]
for scene in timeline:
    sid=scene['id'];secs=scene['durationSeconds']
    content.append(f'''const {sid}Content = ({{durationSeconds}}: {{durationSeconds: number}}) => {{
  const {{fps}}=useVideoConfig();
  return <>
    <SceneArt kind="{scene['kind']}" duration={{durationSeconds}} />
    <Audio name="{sid} 解说" from={{0.6 * fps}} src={{staticFile('voice/{sid}.mp3')}} />
    <BasicCaptions name="{sid} 字幕" width={{2320}} style={{{{position:'absolute',left:-200,bottom:35,scale:.75,transformOrigin:'bottom center'}}}} captions={{{json.dumps(scene['captions'],ensure_ascii=False)}}} />
  </>;
}};
export const {sid}=Interactive.create({{
  Component:{sid}Content,
  layout:'absolute-fill',
  schema:{{...Interactive.backgroundSchema,durationSeconds:{{type:'number',min:1,step:0.1,hiddenFromList:false,default:{secs},description:'Scene duration in seconds'}}}},
}});''')
(ROOT/'src/Scenes.tsx').write_text('\n\n'.join(content)+'\n',encoding='utf-8')
names=', '.join(s['id'] for s in timeline)
movie=["import {useVideoConfig} from 'remotion';","import {TransitionSeries, linearTiming} from '@remotion/transitions';","import {fade} from '@remotion/transitions/fade';",f"import {{{names}}} from './Scenes';","export const Movie = () => { const {fps}=useVideoConfig(); return <TransitionSeries name=\"Malloc 的一生\"> "]
for i,scene in enumerate(timeline):
    if i:movie.append('<TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:0.5 * fps})} />')
    movie.append(f'<TransitionSeries.Sequence name="{scene["title"]}" durationInFrames={{Math.round({scene["frames"]}/30 * fps)}}><{scene["id"]} name="{scene["title"]}" durationSeconds={{{scene["durationSeconds"]}}} /></TransitionSeries.Sequence>')
movie.append('</TransitionSeries>; };')
(ROOT/'src/Movie.tsx').write_text('\n'.join(movie)+'\n',encoding='utf-8')
registration=["import {Composition, Folder} from 'remotion';","import {Movie} from './Movie';",f"import {{{names}}} from './Scenes';",'export const RemotionRoot = () => <>',f'<Composition id="MallocFilm" component={{Movie}} durationInFrames={{{total}}} width={{1920}} height={{1080}} fps={{30}} />','<Folder name="Scenes">']
for s in timeline:registration.append(f'<Composition id="{s["id"]}" component={{{s["id"]}}} durationInFrames={{{s["frames"]}}} width={{1920}} height={{1080}} fps={{30}} defaultProps={{{{durationSeconds:{s["durationSeconds"]}}}}} />')
registration.append('</Folder></>;')
(ROOT/'src/Root.tsx').write_text('\n'.join(registration)+'\n',encoding='utf-8')
print(f'Authored {len(timeline)} chapters, {len(srt)} caption pages, {total} frames ({total/FPS:.2f}s).')
