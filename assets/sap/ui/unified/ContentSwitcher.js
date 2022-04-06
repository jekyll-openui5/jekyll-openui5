/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','./library',"./ContentSwitcherRenderer","sap/base/Log"],function(C,l,a,L){"use strict";var b=l.ContentSwitcherAnimation;var c=C.extend("sap.ui.unified.ContentSwitcher",{metadata:{deprecated:true,library:"sap.ui.unified",properties:{animation:{type:"string",group:"Appearance",defaultValue:'None'},activeContent:{type:"int",group:"Behavior",defaultValue:1}},aggregations:{content1:{type:"sap.ui.core.Control",multiple:true,singularName:"content1"},content2:{type:"sap.ui.core.Control",multiple:true,singularName:"content2"}}}});(function(w){c.prototype.init=function(){};c.prototype.switchContent=function(){this.setActiveContent(this.getActiveContent()==1?2:1);return this;};c.prototype.onAfterRendering=function(){this._$Contents=[this.$("content1"),this.$("content2")];};c.prototype._showActiveContent=function(n){if(this._$Contents){this._$Contents[0].toggleClass("sapUiUfdCSwitcherVisible",n===1);this._$Contents[1].toggleClass("sapUiUfdCSwitcherVisible",n===2);}};c.prototype.setActiveContent=function(n){n=parseInt(n);if(isNaN(n)||n<1){n=1;L.warning("setActiveContent argument must be either 1 or 2. Active content set to 1.");}else if(n>2){n=2;L.warning("setActiveContent argument must be either 1 or 2. Active content set to 2.");}this.setProperty("activeContent",n,true);this._showActiveContent(n);return this;};c.prototype.setAnimation=function(A,s){if(typeof(A)!=="string"){A=b.None;L.warning("setAnimation argument must be a string. Animation was set to \""+b.None+"\".");}A=A.replace(/[^a-zA-Z0-9]/g,"");var d=this.getProperty("animation");if(A===d){return this;}var D=this.$();if(D[0]){D.toggleClass("sapUiUfdCSwitcherAnimation"+d,false);D.toggleClass("sapUiUfdCSwitcherAnimation"+A,true);}return this.setProperty("animation",A,s);};})(window);return c;});
