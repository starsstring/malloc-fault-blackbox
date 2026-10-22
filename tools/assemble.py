"""Normalize narration and author explicit, editable Remotion scene nodes.

Run after build/voice-raw/*.wav is complete. Captions follow the reviewed
script, with phrase boundaries fitted to detected pauses (not word-level ASR).
"""
from pathlib import Path
import argparse, json, math, os, re, shutil, subprocess, wave
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
    scenes=[s for s in scenes if (ROOT/f'build/voice-raw/{s["id"]}.wav').exists()]
for folder in ['public/voice','public/captions','build/voice-normalized']:
    (ROOT/folder).mkdir(parents=True,exist_ok=True)

def weight(text):
    return len(re.sub(r'[A-Za-z0-9_]+|\W','',text))+sum(max(1.6,len(w)*.42) for w in re.findall(r'[A-Za-z0-9_]+',text))+.5

def fit_captions(text, samples, rate):
    phrases=re.findall(r'[^，。！？；：]+[，。！？；：]?',text)
    # Split rare long phrases without losing characters from the narration.
    pieces=[]
    for phrase in phrases:
        while len(phrase)>38:
            pieces.append(phrase[:25]);phrase=phrase[25:]
        if phrase:pieces.append(phrase)
    step=int(rate*.02)
    blocks=samples[:len(samples)//step*step].reshape(-1,step)
    rms=np.sqrt(np.mean(blocks.astype(float)**2,axis=1))
    voiced=rms>max(.004,float(rms.max())*.032)
    active=np.flatnonzero(voiced)
    start=max(0,active[0]*.02-.06)
    end=min(len(samples)/rate,(active[-1]+1)*.02+.08)
    pauses=[]
    a=None
    for i,v in enumerate(voiced):
        if not v and a is None:a=i
        if v and a is not None:
            if (i-a)*.02>=.12 and a*.02>start and i*.02<end:pauses.append(((i+a)*.01,(i-a)*.02))
            a=None
    weights=np.array([weight(p) for p in pieces]);cumulative=np.cumsum(weights)/sum(weights)
    # Dynamic programming keeps boundaries ordered while balancing phrase
    # length and pause evidence. The source text remains the authority.
    layers=[[(start,0.)]]
    for j in range(len(pieces)-1):
        ideal=start+(end-start)*cumulative[j]
        candidates=[(t,-min(gap,.55)*2) for t,gap in pauses if abs(t-ideal)<2.1]
        candidates.append((ideal,.65))
        layers.append(sorted(candidates))
    layers.append([(end,0.)])
    costs=[0.];backs=[]
    for j in range(1,len(layers)):
        new=[];back=[]
        ideal_len=(end-start)*weights[j-1]/sum(weights)
        ideal_pos=start+(end-start)*cumulative[j-1]
        for t,penalty in layers[j]:
            options=[]
            for k,(prev,_) in enumerate(layers[j-1]):
                delta=t-prev
                options.append(costs[k]+((delta-ideal_len)/max(.5,ideal_len*.35))**2+((t-ideal_pos)/1.7)**2+penalty if delta>.22 else 1e9)
            k=int(np.argmin(options));new.append(options[k]);back.append(k)
        costs=new;backs.append(back)
    k=0;bounds=[end]
    for j in range(len(layers)-1,0,-1):
        k=backs[j-1][k];bounds.append(layers[j-1][k][0])
    bounds=list(reversed(bounds))
    return [dict(text=p,startMs=round((bounds[i]+LEAD/FPS)*1000),endMs=round((bounds[i+1]+LEAD/FPS)*1000),timestampMs=None,confidence=None,pageBreakAfter=True) for i,p in enumerate(pieces)]

timeline=[];offset=0;srt=[]
for scene in scenes:
    sid=scene['id'];raw=ROOT/f'build/voice-raw/{sid}.wav';pcm=ROOT/f'build/voice-normalized/{sid}.wav';mp3=ROOT/f'public/voice/{sid}.mp3'
    assert raw.exists(),f'Missing voice track: {raw}'
    subprocess.run([FFMPEG,'-hide_banner','-loglevel','error','-y','-i',str(raw),'-af','highpass=f=70,atempo=1.035,loudnorm=I=-18:TP=-2:LRA=7','-ar','48000','-ac','1','-c:a','pcm_s16le',str(pcm)],check=True)
    with wave.open(str(pcm),'rb') as w:
        rate=w.getframerate();samples=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').astype(float)/32768
    seconds=len(samples)/rate
    subprocess.run([FFMPEG,'-hide_banner','-loglevel','error','-y','-i',str(pcm),'-c:a','libmp3lame','-b:a','128k',str(mp3)],check=True)
    captions=fit_captions(scene['text'],samples,rate)
    (ROOT/f'public/captions/{sid}.json').write_text(json.dumps(captions,ensure_ascii=False,indent=2),encoding='utf-8')
    frames=math.ceil(seconds*FPS)+42
    item={**scene,'audioSeconds':round(seconds,6),'frames':frames,'from':offset,'durationSeconds':frames/FPS,'captions':captions}
    timeline.append(item)
    for caption in captions:srt.append({**caption,'startMs':caption['startMs']+round(offset/FPS*1000),'endMs':caption['endMs']+round(offset/FPS*1000)})
    offset+=frames-TRANSITION
    print(f'{sid}: {seconds:.2f}s, {len(captions)} caption pages',flush=True)
total=offset+TRANSITION
(ROOT/'build/timeline.json').write_text(json.dumps({'fps':FPS,'transitionFrames':TRANSITION,'durationInFrames':total,'scenes':timeline},ensure_ascii=False,indent=2),encoding='utf-8')

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
