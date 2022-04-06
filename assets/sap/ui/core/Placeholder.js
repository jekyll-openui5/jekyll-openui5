/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/Object','sap/base/util/Deferred','sap/base/util/LoaderExtensions','sap/ui/core/BlockLayerUtils'],function(B,D,L,a){"use strict";var p=[];var P=B.extend("sap.ui.core.Placeholder",{constructor:function(m){B.call(this);if(!m.html){throw new Error("A HTML page defining the placeholders content must be given!");}this.bShow=false;this.placeholderHTML=m.html;},show:function(c,b){this.bShow=true;return this._load().then(function(s){if(s&&this.bShow&&!c.getDomRef().contains(this.placeholder)){if(this.blockState){a.unblock(this.blockState);}this.blockState=a.block(c,c.getId()+"--placeholder",b);var d=this.blockState.$blockLayer[0];d.className+=" sapUiPlaceholder";d.insertAdjacentHTML("beforeend",s);this.placeholder=d;}return s;}.bind(this));},hide:function(){this.bShow=false;if(this.placeholder&&this.blockState){a.unblock(this.blockState);this.placeholder=undefined;this.blockState=undefined;}if(this.pLoaded){this.pLoaded.resolve();}},_load:function(){if(!this.pLoaded){this.pLoaded=new D();if(this.placeholderHTML){L.loadResource(this.placeholderHTML,{async:true,dataType:"html"}).then(function(s){this.placeholderContent=s;this.pLoaded.resolve(s);}.bind(this));}else{this.pLoaded.reject();}}return this.pLoaded.promise;}});P.registerProvider=function(f){p.push(f);};P.hasProviders=function(){return p.length>0;};P.getPlaceholderFromProviders=function(c){var o;if(c){p.some(function(f){o=f(c);return!!o;});}return o;};return P;});
