(self.webpackChunkdiscord_theme_preview=self.webpackChunkdiscord_theme_preview||[]).push([[588],{588:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>u});var s=n(21),c=n(78),i=n.n(c),r=n(764),o=n(753);function a(t,e){return fetch(t).then((t=>{if(!t.ok)throw Error(t.statusText);return t})).then((t=>t.text())).then((t=>e({contents:t})))}async function u(t){(0,o.Wu)(!0),(0,o.$Z)(),(0,o.cM)("Fetching main SCSS file");const e=await fetch(t).then((t=>t.text()));window.Buffer=r.lW,(0,o.cM)("Importing Sass");const{render:c}=await Promise.all([n.e(133),n.e(218)]).then(n.t.bind(n,133,23)),u=(0,s.F)(c);window.process={env:{}},(0,o.cM)("Compiling main SCSS file");const d=await u({data:e,importer:(...e)=>function(t,e,n,s){const c=e.includes(".scss")?e.substring(0,e.lastIndexOf("/")):e,r=s.substring(0,s.lastIndexOf("/")),u=i()("stdin"!==c?c:t,"stdin"!==c?t:""),d=i()(r,u),f=d.includes(".")?d:d+".scss";(0,o.cM)("Compiling ".concat(t)),a(function(t){const e=t.split("/");return e[e.length-1]="_"+e[e.length-1],e.join("/")}(f),n).catch((()=>a(f,n).catch((()=>a(d+"/_index.scss",n).catch((()=>a(d+"/index.scss",n).catch("Unable to fetch SCSS file ",t)))))))}(...e,t)});return delete window.Buffer,(0,o.Wu)(!1),(0,o.Cp)(),d.css.toString("utf8")}}}]);