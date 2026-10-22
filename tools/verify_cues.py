"""Check narration landmarks and plan semantic before/after visual reviews."""
from pathlib import Path
import json,math

root=Path(__file__).resolve().parents[1]
timeline=json.loads((root/'build/timeline.json').read_text(encoding='utf-8'))
definitions=json.loads((root/'visual-cue-definitions.json').read_text(encoding='utf-8'))
source=json.loads((root/'src/visual-cues.json').read_text(encoding='utf-8'))
by_kind={s['kind']:s for s in timeline['scenes']}
assert set(source)==set(definitions)==set(by_kind)
for kind,scene in by_kind.items():
    assert source[kind]==scene['visualCues']
    assert set(source[kind])==set(definitions[kind])
    assert all(0<t<scene['durationSeconds'] for t in source[kind].values())

plan=[]
def sample(kind,cue,delta,label):
    scene=by_kind[kind]
    local=source[kind][cue]+delta
    frame=max(0,min(scene['frames']-1,math.ceil(local*30)))
    plan.append({'id':scene['id'],'kind':kind,'cue':cue,'label':label,'localFrame':frame,'globalFrame':scene['from']+frame})

# Cover every chapter, plus both sides of the transitions that previously drifted.
targets={'opening':'journey','background':'modern','contract':'responsibility','inside':'split','virtual':'mapping','allocate':'check','initialize':'calloc','resize':'pointer','failure':'wrong','release':'alias','mistakes':'doubleFree','fragment':'merge','practice':'resize','tradeoff':'evaluate','closing':'free'}
for kind,cue in targets.items():sample(kind,cue,.65,'chapter-'+kind)
for kind,cue in [('mistakes','useAfterFree'),('mistakes','doubleFree'),('resize','pointer'),('release','null'),('fragment','merge')]:
    for delta,label in [(-.15,'before'),(.15,'after')]:sample(kind,cue,delta,f'{kind}-{cue}-{label}')
(root/'build/review-plan-v3.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'chapters':len(by_kind),'semanticLandmarks':sum(len(c) for c in source.values()),'plannedFrames':len(plan),'sameCueSourceInRuntimeAndTimeline':True},ensure_ascii=False))
