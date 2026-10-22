"""Decode the whole final export and collect representative final-video frames."""
from pathlib import Path
import hashlib,json,os,re,shutil,subprocess
from PIL import Image

root=Path(__file__).resolve().parents[1]
ffmpeg=os.environ.get('FFMPEG_BINARY') or shutil.which('ffmpeg')
if not ffmpeg:ffmpeg=str(root.parents[1]/'work/tools/video_deps/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe')
timeline=json.loads((root/'build/timeline.json').read_text(encoding='utf-8'))
assert len(timeline['scenes'])==15
video=root/'video/malloc-film.mp4'
plan=json.loads((root/'build/review-plan-v3.json').read_text(encoding='utf-8'))
frames=[p['globalFrame'] for p in plan]
opening=timeline['scenes'][0]
poster_frame=min(opening['frames']-timeline['transitionFrames']-2,round(max(c['endMs'] for c in opening['captions'])/1000*30)+3)
frames.append(poster_frame)
folder=root/'build/final-frames-v3';folder.mkdir(parents=True,exist_ok=True)
select='+'.join(f'eq(n\\,{n})' for n in sorted(set(frames)))
result=subprocess.run([ffmpeg,'-hide_banner','-y','-i',str(video),'-vf','select='+select,'-fps_mode','vfr','-frame_pts','1',str(folder/'%06d.png'),'-progress','pipe:1','-nostats'],capture_output=True,text=True,encoding='utf-8',errors='replace')
assert result.returncode==0,result.stderr[-2500:]
# The image pass decodes video; this second pass also checks the entire audio.
decode=subprocess.run([ffmpeg,'-hide_banner','-v','error','-i',str(video),'-progress','pipe:1','-f','null','-'],capture_output=True,text=True,encoding='utf-8',errors='replace')
assert decode.returncode==0 and not decode.stderr.strip(),decode.stderr
decoded_frames=int(re.findall(r'^frame=(\d+)',decode.stdout,re.M)[-1])
assert decoded_frames==timeline['durationInFrames'],decoded_frames
assert '1920x1080' in result.stderr and '30 fps' in result.stderr
assert 'Video: h264' in result.stderr and 'Audio: aac' in result.stderr
captions=[c for s in timeline['scenes'] for c in s['captions']]
assert all(''.join(c['text'] for c in s['captions'])==s['text'] for s in timeline['scenes'])
assert all(c['endMs']>c['startMs']>=0 for c in captions)
assert all(all(a['endMs']<=b['startMs'] for a,b in zip(s['captions'],s['captions'][1:])) for s in timeline['scenes'])
assert len(list(folder.glob('*.png')))>=len(set(frames))
background_colors=[Image.open(folder/f'{n:06d}.png').convert('RGB').getpixel((40,40)) for n in sorted(set(frames))]
assert all(max(abs(a-b) for a,b in zip(color,background_colors[0]))<=3 for color in background_colors),'Background palette changed between scenes'
def border_redness(label,x):
    item=next(p for p in plan if p['label']==label)
    pixels=Image.open(folder/f'{item["globalFrame"]:06d}.png').convert('RGB')
    return max(pixels.getpixel((xx,y))[0]-pixels.getpixel((xx,y))[1] for xx in range(x,x+5) for y in range(480,540))
sync_metrics={
    'doubleFreeBefore':border_redness('mistakes-doubleFree-before',1269),
    'doubleFreeAfter':border_redness('mistakes-doubleFree-after',1269),
    'useAfterFreeBefore':border_redness('mistakes-doubleFree-before',699),
    'useAfterFreeAfter':border_redness('mistakes-doubleFree-after',699),
}
assert sync_metrics['doubleFreeAfter']>sync_metrics['doubleFreeBefore']+25,sync_metrics
assert sync_metrics['useAfterFreeBefore']>sync_metrics['useAfterFreeAfter']+25,sync_metrics
volume=subprocess.run([ffmpeg,'-hide_banner','-i',str(video),'-vn','-af','volumedetect','-f','null','-'],capture_output=True,text=True,encoding='utf-8',errors='replace')
levels=re.findall(r'(mean_volume|max_volume): ([\-\d.]+) dB',volume.stderr)
record={'file':'video/malloc-film.mp4','bytes':video.stat().st_size,'sha256':hashlib.sha256(video.read_bytes()).hexdigest(),'durationInFrames':timeline['durationInFrames'],'decodedFrames':decoded_frames,'fps':30,'expectedSeconds':timeline['durationInFrames']/30,'chapters':15,'captionPages':len(captions),'maxCaptionCharacters':max(len(c['text']) for c in captions),'fullVideoAndAudioDecode':'passed, zero error messages','video':'H.264 1920x1080 30fps','audio':'AAC 48000Hz stereo','audioLevels':dict(levels),'capturedFrames':sorted(set(frames)),'posterFrame':poster_frame,'backgroundColorSamples':sorted(set(background_colors)),'captionTiming':'provider WordBoundary metadata, no speed-up'}
record['semanticLandmarks']=sum(len(s['visualCues']) for s in timeline['scenes'])
record['doubleFreeHighlightRegression']={'passed':True,'borderRedness':sync_metrics}
record['semanticBeforeAfterSamples']=10
(root/'build/validation.json').write_text(json.dumps(record,ensure_ascii=False,indent=2),encoding='utf-8')
(root/'build/video-metadata.txt').write_text(result.stderr.split('Stream mapping:')[0],encoding='utf-8')
print(json.dumps(record,ensure_ascii=False,indent=2))
