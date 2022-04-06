sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/config/Theme","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/icons/decline","sap/ui/webc/common/thirdparty/icons/sys-cancel","sap/ui/webc/common/thirdparty/base/i18nBundle","./generated/i18n/i18n-defaults","./Icon","./generated/templates/TokenTemplate.lit","./generated/themes/Token.css"],function(e,t,n,a,s,i,r,c,o,l,d){"use strict";function u(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var p=u(e);var m=u(t);const y={tag:"ui5-token",languageAware:true,managedSlots:true,properties:{text:{type:String},readonly:{type:Boolean},overflows:{type:Boolean},selected:{type:Boolean},_tabIndex:{type:String,defaultValue:"-1",noAttribute:true}},slots:{closeIcon:{type:HTMLElement}},events:{delete:{detail:{backSpace:{type:Boolean},delete:{type:Boolean}}},select:{}}};class h extends p{static get metadata(){return y}static get render(){return m}static get template(){return l}static get styles(){return d}constructor(){super();this.i18nBundle=r.getI18nBundle("@ui5/webcomponents")}_handleSelect(){this.selected=!this.selected;this.fireEvent("select")}_delete(){this.fireEvent("delete")}_keydown(e){const t=a.isBackSpace(e);const n=a.isDelete(e);if(!this.readonly&&(t||n)){e.preventDefault();this.fireEvent("delete",{backSpace:t,delete:n})}if(a.isSpace(e)){e.preventDefault();this._handleSelect()}}get tokenDeletableText(){return this.i18nBundle.getText(c.TOKEN_ARIA_DELETABLE)}get iconURI(){return n.getTheme()==="sap_fiori_3"?"decline":"sys-cancel"}static get dependencies(){return[o]}static async onDefine(){await r.fetchI18nBundle("@ui5/webcomponents")}}h.define();return h});