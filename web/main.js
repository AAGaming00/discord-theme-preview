(()=>{"use strict";var e,t,r,n,a,o={753:(e,t,r)=>{let n;r.d(t,{Wu:()=>i,Cp:()=>c,$Z:()=>u,cM:()=>p});let a,o,l,s=!1,d=null;function i(e){s=e}function c(){s||(n.classList.add("fadeout"),o=setTimeout((()=>{n.remove(),n=!1,a=!1,l=!1,d=[],o=!1}),500))}function u(){if(o&&(clearTimeout(o),o=!1,n.classList.remove("fadeout")),n)return;const e=document.createElement("div");e.id="splash",e.classList.add("splashContainer");const t=document.createElement("video");t.classList.add("spinner"),t.setAttribute("playsinline",""),t.loop=!0,t.autoplay=!0,t.innerHTML='\n    <source src="https://canary.discord.com/assets/0bdc0497eb3a19e66f2b1e3d5741634c.webm" type="video/webm">\n    <source src="https://canary.discord.com/assets/ffac5bb3fb919ce8bf7137d79e9defc9.mp4" type="video/mp4">\n    <img alt="" src="https://canary.discord.com/assets/5ccabf62108d5a8074ddd95af2211727.png">\n    ',e.appendChild(t),document.body.prepend(e),n=e}function p(e){requestAnimationFrame((()=>{l||(l=document.createElement("div"),l.classList.add("splashLog-container"),n.appendChild(l));const t=document.createElement("span");t.textContent=e,t.classList.add("splashLog-line"),l.prepend(t),l.childNodes.length>8&&l.removeChild(l.childNodes[8])}))}}},l={};function s(e){if(l[e])return l[e].exports;var t=l[e]={exports:{}};return o[e].call(t.exports,t,t.exports,s),t.exports}s.m=o,s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,s.t=function(r,n){if(1&n&&(r=this(r)),8&n)return r;if("object"==typeof r&&r){if(4&n&&r.__esModule)return r;if(16&n&&"function"==typeof r.then)return r}var a=Object.create(null);s.r(a);var o={};e=e||[null,t({}),t([]),t(t)];for(var l=2&n&&r;"object"==typeof l&&!~e.indexOf(l);l=t(l))Object.getOwnPropertyNames(l).forEach((e=>o[e]=()=>r[e]));return o.default=()=>r,s.d(a,o),a},s.d=(e,t)=>{for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},s.f={},s.e=e=>Promise.all(Object.keys(s.f).reduce(((t,r)=>(s.f[r](e,t),t)),[])),s.u=e=>e+".js",s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r={},n="discord-theme-preview:",s.l=(e,t,a)=>{if(r[e])r[e].push(t);else{var o,l;if(void 0!==a)for(var d=document.getElementsByTagName("script"),i=0;i<d.length;i++){var c=d[i];if(c.getAttribute("src")==e||c.getAttribute("data-webpack")==n+a){o=c;break}}o||(l=!0,(o=document.createElement("script")).charset="utf-8",o.timeout=120,s.nc&&o.setAttribute("nonce",s.nc),o.setAttribute("data-webpack",n+a),o.src=e),r[e]=[t];var u=(t,n)=>{o.onerror=o.onload=null,clearTimeout(p);var a=r[e];if(delete r[e],o.parentNode&&o.parentNode.removeChild(o),a&&a.forEach((e=>e(n))),t)return t(n)},p=setTimeout(u.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=u.bind(null,o.onerror),o.onload=u.bind(null,o.onload),l&&document.head.appendChild(o)}},s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;s.g.importScripts&&(e=s.g.location+"");var t=s.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=e})(),(()=>{var e={179:0};s.f.j=(t,r)=>{var n=s.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var a=new Promise(((r,a)=>{n=e[t]=[r,a]}));r.push(n[2]=a);var o=s.p+s.u(t),l=new Error;s.l(o,(r=>{if(s.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var a=r&&("load"===r.type?"missing":r.type),o=r&&r.target&&r.target.src;l.message="Loading chunk "+t+" failed.\n("+a+": "+o+")",l.name="ChunkLoadError",l.type=a,l.request=o,n[1](l)}}),"chunk-"+t)}};var t=(t,r)=>{for(var n,a,o=r[0],l=r[1],d=r[2],i=0,c=[];i<o.length;i++)a=o[i],s.o(e,a)&&e[a]&&c.push(e[a][0]),e[a]=0;for(n in l)s.o(l,n)&&(s.m[n]=l[n]);for(d&&d(s),t&&t(r);c.length;)c.shift()()},r=self.webpackChunkdiscord_theme_preview=self.webpackChunkdiscord_theme_preview||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),a=s(753),(async()=>{let e,t,r=window.layerCache;window.addEventListener("message",(async e=>{let t;try{t=JSON.parse(e.data)}catch(e){return}switch(t.type){case"INSERT_CSS":const e=document.createElement("style");e.innerHTML=t.css,document.head.appendChild(e);break;case"LINK_CSS":const r=document.createElement("link");r.rel="stylesheet",r.href=t.url,document.head.appendChild(r);break;case"LINK_SASS":const{default:n}=await Promise.all([s.e(855),s.e(588)]).then(s.bind(s,588)),a=await n("https://raw.githubusercontent.com/LuckFire/Midnight-Mars/main/index.scss"),o=document.createElement("style");o.innerHTML=a,document.head.appendChild(o)}}),!1),(0,a.$Z)();const n=await r.base;r["layers/friends"]=await r["layers/friends"];const o=document.createElement("select");function l(e){const t=(new DOMParser).parseFromString(e,"text/html");t.querySelectorAll("img").forEach((e=>e.src=function(e){return e.replace(new RegExp(location.origin,"g"),"https://discord.com")}(e.src))),t.querySelectorAll('[style*="background-image"]').forEach((({style:e})=>e.backgroundImage=e.backgroundImage.replace(/(\/assets)(?!https:\/\/(?:canary|ptb\.)?discord\.com)/g,"https://discord.com$1")));const r=document.createDocumentFragment();return t.body.childNodes.forEach((e=>r.appendChild(e))),r}async function d(r,n){var a,s,i,c,u,p,m,h,f,y;e!==r&&(window.layerCache[r]=window.layerCache[r]||await fetch("./discord/".concat(r.toLowerCase(),".html")).then((e=>e.text())),n.innerHTML="",n.appendChild(l(window.layerCache[r])),n.classList.contains("oldModals")?(null===(a=n.querySelector(".backdrop-1wrmKB"))||void 0===a||a.addEventListener("click",(()=>n.innerHTML="")),o.value=e):(t=e,e=r,null===(s=n.querySelectorAll('.wrapper-1BJsBx:not([data-list-item-id="guildsnav___home"])'))||void 0===s||s.forEach((e=>null==e?void 0:e.addEventListener("click",(()=>d(e.getAttribute("href").includes("@me")?"layers/DMChannel":"layers/guildChannel",n))))),null===(i=n.querySelector('[data-list-item-id="guildsnav___home"]'))||void 0===i||i.addEventListener("click",(()=>d("layers/friends",n))),null===(c=n.querySelector('[data-list-item-id="guildsnav___guild-discover-button"]'))||void 0===c||c.addEventListener("click",(()=>d("layers/guildDiscovery",n))),null===(u=n.querySelectorAll('.channel-2QD9_O:not([id="private-channels-0"])'))||void 0===u||u.forEach((e=>e.addEventListener("click",(e=>{e.preventDefault(),d("layers/DMChannel",n)})))),null===(p=n.querySelector("#private-channels-0"))||void 0===p||p.addEventListener("click",(e=>{e.preventDefault(),d("layers/friends",n)})),null===(m=n.querySelector(".container-3baos1 .flex-1xMQg5:last-child"))||void 0===m||m.addEventListener("click",(()=>d("layers/settings",n))),null===(h=n.querySelector(".container-1taM1r.clickable-25tGDB > .header-2V-4Sw"))||void 0===h||h.addEventListener("click",(()=>d("layers/guildSettings",n))),null===(f=n.querySelector(".closeButton-1tv5uR"))||void 0===f||f.addEventListener("click",(()=>d(t,n))),null===(y=n.querySelectorAll('[id*="react-select"]'))||void 0===y||y.forEach((e=>null==e?void 0:e.remove())),o.value=r))}function i(e,t,r){const n=document.createElement("option");return n.innerHTML=e,n.value=t,r&&n.setAttribute("isoldmodal",!0),n}o.add(i("Friends","layers/friends")),o.add(i("Guild Channel","layers/guildChannel")),o.add(i("DM Channel","layers/DMChannel")),o.add(i("Discover","layers/guildDiscovery")),o.add(i("Settings","layers/settings")),o.add(i("Guild Settings","layers/guildSettings")),o.add(i("User","modals/user",!0));const c=(new DOMParser).parseFromString(n,"text/html");document.documentElement.classList=c.documentElement.classList,document.body.classList=c.body.classList,Array.from(c.body.childNodes).forEach((e=>document.body.appendChild(e))),Array.from(c.head.childNodes).forEach((e=>document.head.appendChild(e))),document.querySelector('link[rel="stylesheet"][href*="discord.com"]').onload=()=>{setTimeout((()=>{(0,a.Cp)()}),1e3)};const u=document.querySelector(".mainLayers"),p=document.querySelector(".oldModals");await d("layers/friends",u),o.classList.add("select"),o.name="Page";const m=document.querySelector('[class*="withFrame"]');m.insertBefore(o,m.childNodes[1]),o.addEventListener("input",(()=>d(o.options[o.selectedIndex].value,o.options[o.selectedIndex].getAttribute("isoldmodal")?p:u)))})()})();