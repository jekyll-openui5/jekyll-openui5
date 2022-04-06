/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","sap/ui/core/library","./thirdparty/TextArea"],function(e,a,t){"use strict";var l=t.ValueState;var u=e.extend("sap.ui.webc.main.TextArea",{metadata:{library:"sap.ui.webc.main",tag:"ui5-textarea-ui5",properties:{accessibleName:{type:"string"},accessibleNameRef:{type:"string",defaultValue:""},disabled:{type:"boolean",defaultValue:false},growing:{type:"boolean",defaultValue:false},growingMaxLines:{type:"int",defaultValue:0},height:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"},maxlength:{type:"int",defaultValue:null},name:{type:"string",defaultValue:""},placeholder:{type:"string",defaultValue:""},readonly:{type:"boolean",defaultValue:false},required:{type:"boolean",defaultValue:false},rows:{type:"int",defaultValue:0},showExceededText:{type:"boolean",defaultValue:false},value:{type:"string",defaultValue:""},valueState:{type:"sap.ui.core.ValueState",defaultValue:l.None},valueStateMessage:{type:"string",defaultValue:"",mapping:{type:"slot",to:"div"}},width:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"}},events:{change:{parameters:{}},input:{parameters:{}}}}});return u});