sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/util/AriaLabelHelper","sap/ui/webc/common/thirdparty/base/i18nBundle","./types/LinkDesign","./types/WrappingType","./generated/templates/LinkTemplate.lit","./generated/i18n/i18n-defaults","./generated/themes/Link.css"],function(e,t,n,i,r,s,a,u,o,l){"use strict";function c(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var d=c(e);var p=c(t);const h={tag:"ui5-link",languageAware:true,properties:{disabled:{type:Boolean},href:{type:String},target:{type:String},design:{type:s,defaultValue:s.Default},wrappingType:{type:a,defaultValue:a.None},accessibleNameRef:{type:String,defaultValue:""},ariaHaspopup:{type:String,defaultValue:undefined},accessibleRole:{type:String},_rel:{type:String,noAttribute:true},_tabIndex:{type:String,noAttribute:true},focused:{type:Boolean}},slots:{default:{type:Node}},events:{click:{}}};class f extends d{constructor(){super();this._dummyAnchor=document.createElement("a");this.i18nBundle=r.getI18nBundle("@ui5/webcomponents")}static get metadata(){return h}static get render(){return p}static get template(){return u}static get styles(){return l}onBeforeRendering(){const e=this.target==="_blank"&&this.href&&this._isCrossOrigin();this._rel=e?"noreferrer":undefined}_isCrossOrigin(){const e=window.location;this._dummyAnchor.href=this.href;return!(this._dummyAnchor.hostname===e.hostname&&this._dummyAnchor.port===e.port&&this._dummyAnchor.protocol===e.protocol)}get tabIndex(){if(this._tabIndex){return this._tabIndex}return this.disabled||!this.textContent.length?"-1":"0"}get ariaLabelText(){return i.getAriaLabelledByTexts(this)}get hasLinkType(){return this.design!==s.Default}static typeTextMappings(){return{Subtle:o.LINK_SUBTLE,Emphasized:o.LINK_EMPHASIZED}}get linkTypeText(){return this.i18nBundle.getText(f.typeTextMappings()[this.design])}get parsedRef(){return this.href&&this.href.length>0?this.href:undefined}get effectiveAccRole(){return this.accessibleRole||"link"}static async onDefine(){await r.fetchI18nBundle("@ui5/webcomponents")}_onclick(e){e.isMarked="link"}_onfocusin(e){e.isMarked="link";this.focused=true}_onfocusout(e){this.focused=false}_onkeydown(e){if(n.isEnter(e)){const t=this.fireEvent("click",null,true);if(t){e.preventDefault();this.href&&window.open(this.href,this.target)}}else if(n.isSpace(e)){e.preventDefault()}e.isMarked="link"}_onkeyup(e){if(!n.isSpace(e)){e.isMarked="link";return}e.preventDefault();const t=this.fireEvent("click",null,true);if(t){this.href&&window.open(this.href,this.target)}}}f.define();return f});