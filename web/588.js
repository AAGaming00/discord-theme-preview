(self.webpackChunkdiscord_theme_preview=self.webpackChunkdiscord_theme_preview||[]).push([[588],{588:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>d});var c=n(21),s=n(78),i=n.n(s),r=n(764),o=n(753);function a(t,e){return fetch(t).then((t=>{if(!t.ok)throw Error(t.statusText);return t})).then((t=>t.text())).then((t=>e({contents:t})))}async function d(t){(0,o.Wu)(!0),(0,o.$Z)(),(0,o.cM)("Fetching main SCSS file");const e=await fetch(t).then((t=>t.text()));window.Buffer=r.lW;const s=Object.create;Object.create=(...t)=>t[0]&&t[0].window?window:s(...t),(0,o.cM)("Importing Sass");const{render:d}=await Promise.all([n.e(602),n.e(218)]).then(n.t.bind(n,602,23)),u=(0,c.F)(d);window.process={env:{}},(0,o.cM)("Compiling main SCSS file");const f=await u({data:e,importer:(...e)=>function(t,e,n,c){const s=e.includes(".scss")?e.substring(0,e.lastIndexOf("/")):e,r=c.substring(0,c.lastIndexOf("/")),d=i()("stdin"!==s?s:t,"stdin"!==s?t:""),u=i()(r,d),f=u.includes(".")?u:u+".scss";(0,o.cM)("Compiling ".concat(t)),a(function(t){const e=t.split("/");return e[e.length-1]="_"+e[e.length-1],e.join("/")}(f),n).catch((()=>a(f,n).catch((()=>a(u+"/_index.scss",n).catch((()=>a(u+"/index.scss",n).catch("Unable to fetch SCSS file ",t)))))))}(...e,t)});return Object.create=s,delete window.Buffer,(0,o.Wu)(!1),(0,o.Cp)(),f.css.toString("utf8")}}}]);