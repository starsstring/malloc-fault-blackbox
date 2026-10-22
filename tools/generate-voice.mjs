import {mkdir, readFile, writeFile, access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const host='https://qwen-qwen3-tts.hf.space';
const endpoint='/gradio_api/call/generate_custom_voice';
const style='温柔、自然、亲切的年轻女声。像耐心的朋友聊天，轻松愉快地分享一个有意思的小知识。语气明亮一点，节奏稍微轻快，保持清楚的咬字。短句自然衔接，问句有轻微上扬。';
const scenes=JSON.parse(await readFile(path.join(root,'narration.json'),'utf8'));
const folder=path.join(root,'build','voice-raw');
await mkdir(folder,{recursive:true});
for(let i=0;i<scenes.length;i++){
  const scene=scenes[i];const file=path.join(folder,scene.id+'.wav');
  try{await access(file);console.log('Keep existing '+scene.id);continue;}catch{}
  const submitted=await fetch(host+endpoint,{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({data:[scene.text,'Chinese','Serena',style,'1.7B']}),signal:AbortSignal.timeout(30000)});
  if(!submitted.ok) throw Error('Submit HTTP '+submitted.status+': '+await submitted.text());
  const {event_id}=await submitted.json();console.log(`Voice ${i+1}/${scenes.length}: ${scene.id} submitted`);
  const result=await fetch(host+endpoint+'/'+event_id,{signal:AbortSignal.timeout(240000)});
  if(!result.ok)throw Error('Result HTTP '+result.status);
  const stream=await result.text();
  await writeFile(path.join(folder,scene.id+'.result.txt'),stream);
  const match=stream.match(/event: complete\s+data: (.+)/);
  if(!match)throw Error(scene.id+': '+stream.slice(-1200));
  const data=JSON.parse(match[1]);
  if(!data[0]?.url)throw Error(scene.id+': '+JSON.stringify(data));
  const audio=await fetch(data[0].url,{signal:AbortSignal.timeout(45000)});
  if(!audio.ok)throw Error('Audio HTTP '+audio.status);
  const buffer=Buffer.from(await audio.arrayBuffer());await writeFile(file,buffer);
  console.log(`Voice ${i+1}/${scenes.length}: ${scene.id} saved (${buffer.length} bytes)`);
}
await writeFile(path.join(folder,'provider.json'),JSON.stringify({provider:'Qwen official public demo',model:'Qwen3-TTS-12Hz-1.7B-CustomVoice',speaker:'Serena',style,generatedAt:new Date().toISOString()},null,2));
console.log('All requested voice tracks saved.');
