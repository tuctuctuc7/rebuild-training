import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
test('both sibling workers bypass Morning requests entirely',()=>{
 for(const file of ['public/sw.js','public/get-fit/sw.js','public/recovery-library/sw.js']){
  const listeners={};vm.runInNewContext(readFileSync(file,'utf8'),{URL,fetch:()=>Promise.resolve({ok:false}),self:{location:{origin:'https://build.tomnguyen.co'},addEventListener:(name,fn)=>listeners[name]=fn}});
  for(const path of ['/morning','/morning/','/morning/api/entries','/morning/_next/a.js']){
   let intercepted=false;listeners.fetch({request:{method:'GET',url:'https://build.tomnguyen.co'+path},respondWith:()=>{intercepted=true}});
   assert.equal(intercepted,false,`${file} must not cache ${path}`);
  }
 }
});
test('Morning rewrite is fixed to its own backend, never a user-controlled proxy',()=>{
 const config=JSON.parse(readFileSync('vercel.json','utf8'));
 for(const rewrite of config.rewrites) {
  assert(rewrite.source.startsWith('/morning'));
  assert(rewrite.destination.startsWith('https://morning-weight-pi.vercel.app/morning/'));
 }
 for(const source of ['/morning','/morning/','/morning/:path*','/morning/:path*/']) {
  assert(config.rewrites.some(r=>r.source===source),`Explicit strict edge match required: ${source}`);
 }
});
