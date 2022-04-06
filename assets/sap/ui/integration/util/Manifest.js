/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/Manifest","sap/base/util/deepClone","sap/base/util/isPlainObject","sap/base/util/isEmptyObject","sap/base/Log","./ParameterMap","sap/ui/integration/util/CardMerger"],function(B,C,d,a,b,L,P,c){"use strict";var M="/{SECTION}/configuration/parameters",e="/{SECTION}/configuration/filters",f="/{SECTION}",A="/sap.app/dataSources",R=/\{\{(?!parameters.)(?!destinations.)([^\}\}]+)\}\}|\{i18n>([^\}]+)\}/g;var g=B.extend("sap.ui.integration.util.Manifest",{constructor:function(s,o,i,j){B.call(this);this._aChanges=j;this._sSection=s;this.PARAMETERS=M.replace("{SECTION}",s);this.FILTERS=e.replace("{SECTION}",s);this.CONFIGURATION=f.replace("{SECTION}",s);if(o){var O={},l;O.process=false;this._oInitialJson=d(o,500);if(i){O.baseUrl=i;this._sBaseUrl=i;}else{L.warning("If no base URL is provided when the manifest is an object static resources cannot be loaded.");}if(this._aChanges){l=this.mergeDeltaChanges(o);}else{l=o;}this._oManifest=new C(l,O);this.oJson=this._oManifest.getRawJson();}}});g.prototype.mergeDeltaChanges=function(o){return c.mergeCardDelta(o,this._aChanges,this._sSection);};g.prototype.getJson=function(){return this._unfreeze(this.oJson);};g.prototype.getInitialJson=function(){return this._oInitialJson;};g.prototype.get=function(s){return this._unfreeze(n(this.oJson,s));};g.prototype.getUrl=function(){return this._oManifest.resolveUri("./","manifest");};g.prototype.getResourceBundle=function(){return this.oResourceBundle;};g.prototype._unfreeze=function(v){if(typeof v==="object"){return JSON.parse(JSON.stringify(v));}return v;};g.prototype.destroy=function(){this.oJson=null;this.oResourceBundle=null;if(this._oManifest){this._oManifest.destroy();}this._bIsDestroyed=true;};g.prototype.isDestroyed=function(){return this._bIsDestroyed;};g.prototype.load=function(s){if(!s||!s.manifestUrl){if(this._sBaseUrl&&this._oManifest){return this.loadI18n().then(function(){this.processManifest();}.bind(this));}else{if(this._oManifest){this.processManifest();}return new Promise(function(i){i();});}}return C.load({manifestUrl:s.manifestUrl,async:true,processJson:function(o){this._oInitialJson=d(o,500);if(this._aChanges){return this.mergeDeltaChanges(o);}return o;}.bind(this)}).then(function(o){this._oManifest=o;this.oJson=this._oManifest.getRawJson();return this.loadI18n().then(function(){this.processManifest();}.bind(this));}.bind(this));};g.prototype.loadI18n=function(){var H=false;C.processObject(this._oManifest.getJson(),function(o,K,v){if(!H&&v.match(R)){H=true;}});if(this.get("/sap.app/i18n")){H=true;}if(!H){return Promise.resolve();}return this._oManifest._loadI18n(true).then(function(o){this.oResourceBundle=o;}.bind(this));};g.prototype.processManifest=function(){var i=0,j=15,u=jQuery.extend(true,{},this._oManifest.getRawJson()),D=this.get(A);p(u,this.oResourceBundle,i,j,this._oCombinedParams,D,this._oCombinedFilters);h(u);this.oJson=u;};function h(o){if(o&&typeof o==='object'&&!Object.isFrozen(o)){Object.freeze(o);for(var K in o){if(o.hasOwnProperty(K)){h(o[K]);}}}}function k(v){return(typeof v==="string")&&v.indexOf("{{")===0&&v.indexOf("}}")===v.length-2;}function m(v){return(typeof v==="string")&&(v.indexOf("{{parameters.")>-1||v.indexOf("{{dataSources")>-1||v.indexOf("{{filters.")>-1);}g._processPlaceholder=function(s,o,D,F){var i=P.processPredefinedParameter(s),v,j;if(!b(o)){for(var l in o){v=o[l].value;j="{{parameters."+l;i=r(i,v,j);}}if(D){i=r(i,D,"{{dataSources");}if(F){i=r(i,F,"{{filters");}return i;};function r(s,v,i){if(a(v)||Array.isArray(v)){for(var j in v){s=r(s,v[j],i+"."+j);}}else if(s.includes(i+"}}")){s=s.replace(new RegExp(i+"}}",'g'),v);}return s;}function p(o,i,j,l,q,D,F){if(j===l){return;}if(Array.isArray(o)){o.forEach(function(I,t,u){if(typeof I==="object"){p(I,i,j+1,l,q,D,F);}else if(m(I)){u[t]=g._processPlaceholder(I,q,D,F);}else if(k(I)&&i){u[t]=i.getText(I.substring(2,I.length-2));}},this);}else{for(var s in o){if(typeof o[s]==="object"){p(o[s],i,j+1,l,q,D,F);}else if(m(o[s])){o[s]=g._processPlaceholder(o[s],q,D,F);}else if(k(o[s])&&i){o[s]=i.getText(o[s].substring(2,o[s].length-2));}}}}function n(o,s){if(s==="/"){return o;}if(o&&s&&typeof s==="string"&&s[0]==="/"){var j=s.substring(1).split("/"),q;for(var i=0,l=j.length;i<l;i++){q=j[i];o=o.hasOwnProperty(q)?o[q]:undefined;if(o===null||typeof o!=="object"){if(i+1<l&&o!==undefined){o=undefined;}break;}}return o;}return o&&o[s];}g.prototype.processFilters=function(i){if(!this._oManifest){return;}var o=this.get(this.FILTERS),j={};if(i.size&&!o){L.error("If runtime filters are set, they have to be defined in the manifest configuration as well.");return;}jQuery.each(o,function(K,l){var v=i.get(K)||l.value;j[K]=v;});this._oCombinedFilters=j;this.processManifest();};g.prototype.processParameters=function(o){if(!this._oManifest){return;}var i=this.get(this.PARAMETERS);if(!b(o)&&!i){L.error("If parameters property is set, parameters should be described in the manifest");return;}this._oCombinedParams=this._syncParameters(o,i);this.processManifest();};g.prototype.getProcessedParameters=function(o){var i=this.get(this.PARAMETERS),j=this._syncParameters(o,i);p(j,this.oResourceBundle,0,15,o);return j;};g.prototype._syncParameters=function(o,l){if(b(o)){return l;}var q=d(l||{},500),s=Object.getOwnPropertyNames(o),t=Object.getOwnPropertyNames(q);for(var i=0;i<t.length;i++){for(var j=0;j<s.length;j++){if(t[i]===s[j]){q[t[i]].value=o[s[j]];}}}return q;};g.prototype.findDataSections=function(s){var i=[],K;if(!s){s=this.get(this.CONFIGURATION);}if(!a(s)){return[];}if(s.data){i.push(s.data);}for(K in s){if(s[K]){i=i.concat(this.findDataSections(s[K]));}}return i;};return g;},true);