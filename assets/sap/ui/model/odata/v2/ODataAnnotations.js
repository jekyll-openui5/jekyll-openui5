/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/model/odata/AnnotationParser','sap/ui/Device','sap/ui/base/EventProvider','sap/ui/core/cache/CacheManager'],function(q,A,D,E,C){"use strict";var O=E.extend("sap.ui.model.odata.v2.ODataAnnotations",{constructor:function(m,o){var t=this;E.apply(this,[o]);this._oMetadata=m;this._pLoaded=m.loaded();this._mCustomHeaders={};this._mAnnotations={};function w(r){C.set(t.sCacheKey,JSON.stringify(r));}if(!o||!o.skipMetadata){if(!o){o={};}if(!o.source){o.source=[];}else if(Array.isArray(o.source)){o.source=o.source.slice(0);}else{o.source=[o.source];}o.source.unshift({type:"xml",data:m.loaded().then(function(p){return{xml:p["metadataString"],lastModified:p["lastModified"]};})});}if(o){this.sCacheKey=o.cacheKey;this.setHeaders(o.headers);if(this.sCacheKey){this._pLoaded=C.get(t.sCacheKey).then(function(a){var r;if(a){r=JSON.parse(a);}if(Array.isArray(r)){r.annotations={};r.forEach(function(b){A.restoreAnnotationsAtArrays(b.annotations);A.merge(r.annotations,b.annotations);});t._mAnnotations=r.annotations;t._fireSomeLoaded(r);t._fireLoaded(r);return r;}else{return t.addSource(o.source).then(function(r){w(r);return r;});}});}else{this._pLoaded=this.addSource(o.source);}}},metadata:{publicMethods:["getData","addSource","getHeaders","setHeaders","attachSuccess","detachSuccess","attachError","detachError","attachLoaded","detachLoaded","attachFailed","detachFailed"]}});O.prototype.getData=function(){return this._mAnnotations;};O.prototype.getAnnotationsData=function(){return this._mAnnotations;};O.prototype.getHeaders=function(){return q.extend({},this._mCustomHeaders,{"Accept-Language":sap.ui.getCore().getConfiguration().getLanguageTag()});};O.prototype.setHeaders=function(h){this._mCustomHeaders=q.extend({},h);};O.prototype.loaded=function(){return this._pLoaded;};O.prototype.addSource=function(s){if(!s||Array.isArray(s)&&s.length===0){return this._oMetadata.loaded();}if(!Array.isArray(s)){s=[s];}var t=this;var m=s.map(function(a){a=(typeof a==="string")?{type:"url",data:a}:a;return t._loadSource(a).then(t._parseSourceXML).then(t._parseSource.bind(t)).catch(function(e){return e;});});return Promise.all(m).then(function(a){return a.map(function(o){try{o=t._mergeSource(o);t._fireSuccess(o);}catch(e){t._fireError(o);}return o;});}).then(function(r){r.annotations=t.getData();var e=r.filter(function(R){return R instanceof Error;});if(e.length>0){if(e.length!==r.length){t._fireSomeLoaded(r);t._fireFailed(r);}else{t._fireFailed(r);t._fireAllFailed(r);return Promise.reject(r);}}else{t._fireSomeLoaded(r);t._fireLoaded(r);}return r;});};O.prototype.attachSuccess=function(d,f,l){return this.attachEvent("success",d,f,l);};O.prototype.detachSuccess=function(f,l){return this.detachEvent("success",f,l);};O.prototype.attachError=function(d,f,l){return this.attachEvent("error",d,f,l);};O.prototype.detachError=function(f,l){return this.detachEvent("error",f,l);};O.prototype.attachLoaded=function(d,f,l){return this.attachEvent("loaded",d,f,l);};O.prototype.detachLoaded=function(f,l){return this.detachEvent("loaded",f,l);};O.prototype.attachFailed=function(d,f,l){return this.attachEvent("failed",d,f,l);};O.prototype.detachFailed=function(f,l){return this.detachEvent("failed",f,l);};O.prototype.attachSomeLoaded=function(d,f,l){return this.attachEvent("someLoaded",d,f,l);};O.prototype.detachSomeLoaded=function(f,l){return this.detachEvent("someLoaded",f,l);};O.prototype.attachAllFailed=function(d,f,l){return this.attachEvent("allFailed",d,f,l);};O.prototype.detachAllFailed=function(f,l){return this.detachEvent("allFailed",f,l);};O.prototype._fireSuccess=function(r){return this.fireEvent("success",{result:r},false,false);};O.prototype._fireError=function(e){return this.fireEvent("error",{result:e},false,false);};O.prototype._fireLoaded=function(r){return this.fireEvent("loaded",{result:r},false,false);};O.prototype._fireFailed=function(e){return this.fireEvent("failed",{result:e},false,false);};O.prototype._fireSomeLoaded=function(r){return this.fireEvent("someLoaded",{result:r},false,false);};O.prototype._fireAllFailed=function(e){return this.fireEvent("allFailed",{result:e},false,false);};O.prototype._loadSource=function(s){if(s.data instanceof Promise){return s.data.then(function(d){delete s.data;s.type="xml";s.xml=d.xml;s.lastModified=d.lastModified;return this._loadSource(s);}.bind(this));}else if(s.type==="xml"){if(typeof s.data==="string"){s.xml=s.data;delete s.data;}return Promise.resolve(s);}else if(s.type==="url"){return this._loadUrl(s);}else{var e=new Error("Unknown source type: \""+s.type+"\"");e.source=s;return Promise.reject(e);}};O.prototype._loadUrl=function(s){return new Promise(function(r,R){var a={url:s.data,async:true,headers:this.getHeaders(),beforeSend:function(x){x.overrideMimeType("text/plain");}};var S=function(d,b,x){s.xml=x.responseText;if(x.getResponseHeader("Last-Modified")){s.lastModified=new Date(x.getResponseHeader("Last-Modified"));}r(s);};var f=function(x,b){var e=new Error("Could not load annotation URL: \""+s.data+"\"");e.source=s;R(e);};q.ajax(a).done(S).fail(f);}.bind(this));};O.prototype._parseSourceXML=function(s){return new Promise(function(r,R){var x;if(D.browser.msie){x=new window.ActiveXObject("Microsoft.XMLDOM");x.preserveWhiteSpace=true;var X=s.xml;if(X.indexOf(" xmlns:xml=")>-1){X=X.replace(' xmlns:xml="http://www.w3.org/XML/1998/namespace"',"").replace(" xmlns:xml='http://www.w3.org/XML/1998/namespace'","");}x.loadXML(X);}else if(window.DOMParser){x=new DOMParser().parseFromString(s.xml,'application/xml');}var e;if(!x){e=new Error("The browser does not support XML parsing. Annotations are not available.");e.source=s;R(e);}else if(x.getElementsByTagName("parsererror").length>0||(x.parseError&&x.parseError.errorCode!==0)){e=new Error("There were errors parsing the XML.");e.source={type:s.type,data:s.data,xml:s.xml,document:x};R(e);}else{s.document=x;r(s);}});};O.prototype._parseSource=function(s){return this._oMetadata.loaded().then(function(){s.annotations=A.parse(this._oMetadata,s.document,s.data);delete s.document;return s;}.bind(this));};O.prototype._mergeSource=function(s){A.merge(this._mAnnotations,s.annotations);return s;};return O;});
