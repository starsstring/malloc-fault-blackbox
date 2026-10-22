"""Decode the whole final export and collect representative final-video frames."""
from pathlib import Path
import hashlib,json,os,re,shutil,subprocess

root=Path(__file__).resolve().parents[1]
ffmpeg=os.environ.get('FFMPEG_BINARY') or shutil.which('ffmpeg')
if not ffmpeg:ffmpeg=str(root.parents[1]/'work/tools/video_deps/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe')
timeline=json.loads((root/'build/timeline.json').read_text(encoding='utf-8'))
assert len(timeline['scenes'])==15
video=root/'video/malloc-film.mp4'
frames=[s['from']+s['frames']//2 for s in timeline['scenes']]
for index,fraction in [(7,.9),(9,.85),(11,.8)]:
    s=timeline['scenes'][index];frames.append(s['from']+int(s['frames']*fraction))
frames.append(423)
folder=root/'build/final-frames';folder.mkdir(parents=True,exist_ok=True)
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
volume=subprocess.run([ffmpeg,'-hide_banner','-i',str(video),'-vn','-af','volumedetect','-f','null','-'],capture_output=True,text=True,encoding='utf-8',errors='replace')
levels=re.findall(r'(mean_volume|max_volume): ([\-\d.]+) dB',volume.stderr)
record={'file':'video/malloc-film.mp4','bytes':video.stat().st_size,'sha256':hashlib.sha256(video.read_bytes()).hexdigest(),'durationInFrames':timeline['durationInFrames'],'decodedFrames':decoded_frames,'fps':30,'expectedSeconds':timeline['durationInFrames']/30,'chapters':15,'captionPages':len(captions),'maxCaptionCharacters':max(len(c['text']) for c in captions),'fullVideoAndAudioDecode':'passed, zero error messages','video':'H.264 1920x1080 30fps','audio':'AAC 48000Hz stereo','audioLevels':dict(levels),'capturedFrames':sorted(set(frames))}
(root/'build/validation.json').write_text(json.dumps(record,ensure_ascii=False,indent=2),encoding='utf-8')
(root/'build/video-metadata.txt').write_text(result.stderr.split('Stream mapping:')[0],encoding='utf-8')
print(json.dumps(record,ensure_ascii=False,indent=2))
