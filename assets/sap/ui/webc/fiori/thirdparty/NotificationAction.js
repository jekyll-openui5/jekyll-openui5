sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/main/thirdparty/types/ButtonDesign"],function(t,e){"use strict";function n(t){return t&&typeof t==="object"&&"default"in t?t["default"]:t}var i=n(t);var a=n(e);const s={tag:"ui5-notification-action",properties:{text:{type:String},disabled:{type:Boolean},design:{type:a,defaultValue:a.Transparent},icon:{type:String}},slots:{},events:{click:{}}};class r extends i{static get metadata(){return s}}r.define();return r});