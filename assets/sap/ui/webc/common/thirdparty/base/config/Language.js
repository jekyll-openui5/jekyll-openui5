sap.ui.define(["exports","../InitialConfiguration","../locale/languageChange","../Render"],function(e,a,t,n){"use strict";let g;let u;const r=()=>{if(g===undefined){g=a.getLanguage()}return g};const i=async e=>{if(g===e){return}g=e;await t.fireLanguageChange(e);await n.reRenderAllUI5Elements({languageAware:true})};const l=e=>{u=e};const f=()=>{if(u===undefined){l(a.getFetchDefaultLanguage())}return u};e.getFetchDefaultLanguage=f;e.getLanguage=r;e.setFetchDefaultLanguage=l;e.setLanguage=i;Object.defineProperty(e,"__esModule",{value:true})});