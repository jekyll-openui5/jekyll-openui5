sap.ui.define(function(){"use strict";const e=()=>{let e=document.querySelector(".sapThemeMetaData-Base-baseLib");if(e){return getComputedStyle(e).backgroundImage}e=document.createElement("span");e.style.display="none";e.classList.add("sapThemeMetaData-Base-baseLib");document.body.appendChild(e);const t=getComputedStyle(e).backgroundImage;document.body.removeChild(e);return t};const t=e=>{const t=/\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(e);if(t&&t.length>=2){let e=t[1];e=e.replace(/\\"/g,`"`);if(e.charAt(0)!=="{"&&e.charAt(e.length-1)!=="}"){try{e=decodeURIComponent(e)}catch(e){console.warn("Malformed theme metadata string, unable to decodeURIComponent");return}}try{return JSON.parse(e)}catch(e){console.warn("Malformed theme metadata string, unable to parse JSON")}}};const a=e=>{let t;let a;try{t=e.Path.match(/\.([^.]+)\.css_variables$/)[1];a=e.Extends[0]}catch(t){console.warn("Malformed theme metadata Object",e);return}return{themeName:t,baseThemeName:a}};const n=()=>{const n=e();if(!n||n==="none"){return}const r=t(n);return a(r)};return n});