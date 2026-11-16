/* zip.js — création (sans compression) et lecture de fichiers .zip, sans dépendance.
   FZ.zip([{name, data:Uint8Array|string}]) → Uint8Array
   FZ.unzip(ArrayBuffer) → Promise<[{name, data:Uint8Array}]>  (méthodes « stocké » et « deflate ») */
(function(){
const T=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
const crc32=b=>{let c=0xFFFFFFFF;for(let i=0;i<b.length;i++)c=T[(c^b[i])&255]^(c>>>8);return(c^0xFFFFFFFF)>>>0};
const cat=a=>{const o=new Uint8Array(a.reduce((s,x)=>s+x.length,0));let p=0;for(const x of a){o.set(x,p);p+=x.length}return o};
const enc=new TextEncoder();
function zip(files){const parts=[],cen=[];let off=0;const n=new Date();
 const dt=(n.getHours()<<11)|(n.getMinutes()<<5)|(n.getSeconds()>>1),dd=((n.getFullYear()-1980)<<9)|((n.getMonth()+1)<<5)|n.getDate();
 for(const f of files){const data=typeof f.data==='string'?enc.encode(f.data):f.data,nm=enc.encode(f.name),crc=crc32(data),sz=data.length;
  const l=new DataView(new ArrayBuffer(30));l.setUint32(0,0x04034b50,true);l.setUint16(4,20,true);l.setUint16(6,0x0800,true);l.setUint16(10,dt,true);l.setUint16(12,dd,true);
  l.setUint32(14,crc,true);l.setUint32(18,sz,true);l.setUint32(22,sz,true);l.setUint16(26,nm.length,true);parts.push(new Uint8Array(l.buffer),nm,data);
  const c=new DataView(new ArrayBuffer(46));c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x0800,true);c.setUint16(12,dt,true);c.setUint16(14,dd,true);
  c.setUint32(16,crc,true);c.setUint32(20,sz,true);c.setUint32(24,sz,true);c.setUint16(28,nm.length,true);c.setUint32(42,off,true);cen.push(new Uint8Array(c.buffer),nm);off+=30+nm.length+sz}
 const cs=cen.reduce((s,x)=>s+x.length,0),e=new DataView(new ArrayBuffer(22));
 e.setUint32(0,0x06054b50,true);e.setUint16(8,files.length,true);e.setUint16(10,files.length,true);e.setUint32(12,cs,true);e.setUint32(16,off,true);
 return cat([...parts,...cen,new Uint8Array(e.buffer)])}
async function inflate(d){if(typeof DecompressionStream==='undefined')throw new Error("Ce navigateur ne sait pas décompresser ce .zip : utilisez un navigateur récent (Chrome, Edge, Firefox, Safari 16.4+).");
 const s=new Blob([d]).stream().pipeThrough(new DecompressionStream('deflate-raw'));return new Uint8Array(await new Response(s).arrayBuffer())}
async function unzip(buf){const v=new DataView(buf),u=new Uint8Array(buf);let e=buf.byteLength-22;
 while(e>=0&&v.getUint32(e,true)!==0x06054b50)e--;if(e<0)throw new Error('Ce fichier n\'est pas un .zip valide.');
 const n=v.getUint16(e+10,true);let p=v.getUint32(e+16,true);const out=[];const dec=new TextDecoder();
 for(let i=0;i<n;i++){if(v.getUint32(p,true)!==0x02014b50)break;
  const m=v.getUint16(p+10,true),cs=v.getUint32(p+20,true),nl=v.getUint16(p+28,true),xl=v.getUint16(p+30,true),cl=v.getUint16(p+32,true),lo=v.getUint32(p+42,true);
  const name=dec.decode(u.subarray(p+46,p+46+nl));p+=46+nl+xl+cl;
  if(name.endsWith('/'))continue;
  const ds=lo+30+v.getUint16(lo+26,true)+v.getUint16(lo+28,true),raw=u.slice(ds,ds+cs);
  out.push({name,data:m===0?raw:m===8?await inflate(raw):(()=>{throw new Error('Compression non prise en charge pour '+name)})()})}
 return out}
window.FZ={zip,unzip,crc32,isZip:b=>{const x=new Uint8Array(b,0,4);return x[0]===0x50&&x[1]===0x4b}};
})();
