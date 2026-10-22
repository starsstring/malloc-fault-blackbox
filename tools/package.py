"""Create the portable submission package after the final render is verified."""
from pathlib import Path
import hashlib,json,zipfile

root=Path(__file__).resolve().parents[1]
timeline=json.loads((root/'build/timeline.json').read_text(encoding='utf-8'))
assert len(timeline['scenes'])==15,'Refuse to package an incomplete preview'
assert (root/'video/malloc-film.mp4').is_file(),'Render the final video first'
assert (root/'VALIDATION.md').is_file(),'Record the completed checks first'
video_hash=hashlib.sha256((root/'video/malloc-film.mp4').read_bytes()).hexdigest()
assert video_hash in (root/'VALIDATION.md').read_text(encoding='utf-8'),'Validation record does not match this export'
folders=['src','public','tools','examples','notices','video']
files=[p for folder in folders for p in (root/folder).rglob('*') if p.is_file() and '__pycache__' not in p.parts]
files += [p for p in root.iterdir() if p.is_file() and p.name!='MANIFEST.sha256']
files=sorted(set(files))
(root/'MANIFEST.sha256').write_text(''.join(f'{hashlib.sha256(p.read_bytes()).hexdigest()}  {p.relative_to(root).as_posix()}\n' for p in files),encoding='utf-8')
files.append(root/'MANIFEST.sha256')
target=root.parent/'malloc-remotion-v2完整包.zip'
with zipfile.ZipFile(target,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as archive:
    for file in files:archive.write(file,'malloc-remotion/'+file.relative_to(root).as_posix())
with zipfile.ZipFile(target) as archive:assert archive.testzip() is None
print(json.dumps({'zip':str(target),'files':len(files),'bytes':target.stat().st_size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest()},ensure_ascii=False))
