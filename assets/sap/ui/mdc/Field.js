/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/ManagedObjectObserver','sap/ui/mdc/field/FieldBase','sap/ui/mdc/field/FieldBaseRenderer','sap/ui/mdc/enum/FieldDisplay','sap/ui/mdc/condition/Condition','sap/ui/mdc/condition/FilterOperatorUtil','sap/ui/mdc/enum/BaseType','sap/ui/mdc/enum/ConditionValidated','sap/base/util/deepEqual','sap/base/util/merge','sap/ui/model/BindingMode','sap/ui/model/Context'],function(M,F,a,b,C,c,B,d,e,m,f,g){"use strict";var h=F.extend("sap.ui.mdc.Field",{metadata:{library:"sap.ui.mdc",properties:{value:{type:"any",defaultValue:null},additionalValue:{type:"any",defaultValue:null}},events:{change:{parameters:{value:{type:"string"},valid:{type:"boolean"},promise:{type:"Promise"}}}},defaultProperty:"value"},renderer:a});h.prototype.init=function(){this._vValue=null;this._vAdditionalValue=null;F.prototype.init.apply(this,arguments);this.setMaxConditions(1);this._oObserver.observe(this,{properties:["value","additionalValue"]});};h.prototype.exit=function(){F.prototype.exit.apply(this,arguments);if(this._iConditionUpdateTimer){clearTimeout(this._iConditionUpdateTimer);delete this._iConditionUpdateTimer;delete this._bPendingConditionUpdate;}this._oBindingContext=undefined;};h.prototype.bindProperty=function(N,r){if(N==="value"&&!r.formatter){r.targetType="raw";var D=this._oContentFactory.getDataType();if(r.type&&(!D||D.getMetadata().getName()!==r.type.getMetadata().getName()||!e(D.getFormatOptions(),r.type.getFormatOptions())||!e(D.getConstraints(),r.type.getConstraints())||D._bCreatedByOperator!==r.type._bCreatedByOperator)){this._oContentFactory.setDataType(r.type);this._oContentFactory.updateConditionType();this.invalidate();}}F.prototype.bindProperty.apply(this,arguments);};h.prototype._handleModelContextChange=function(E){F.prototype._handleModelContextChange.apply(this,arguments);var r=this.getBinding("value");if(r){var s=r.isA("sap.ui.model.CompositeBinding")?r.getBindings()[0].getContext():r.getContext();if(g.hasChanged(this._oBindingContext,s)){this._oBindingContext=s;this._oContentFactory.updateConditionType();if(this._bParseError||this.getFieldHelp()){this._oManagedObjectModel.checkUpdate(true,true);this._bParseError=false;}}if(!this._oContentFactory.getDataType()){this._oContentFactory.setDataType(r.getType());this.invalidate();}}};h.prototype._initDataType=function(){F.prototype._initDataType.apply(this,arguments);var r=this.getBinding("value");if(r){this._oContentFactory.setDataType(r.getType());}};h.prototype.setProperty=function(P,v,s){if(P==="value"&&this._bParseError&&e(this.getValue(),this.validateProperty(P,v))){this._oManagedObjectModel.checkUpdate(true,true);this._bParseError=false;}return F.prototype.setProperty.apply(this,arguments);};h.prototype.setMaxConditions=function(r){if(r!==1){throw new Error("Only one condition allowed for Field "+this);}return this.setProperty("maxConditions",r,true);};h.prototype._observeChanges=function(r){F.prototype._observeChanges.apply(this,arguments);if(r.name==="value"){var v=l.call(this,r.current,r.old);if(this._vAdditionalValue!==null&&q.call(this)&&!n.call(this,v,this._vValue,true)){this._vAdditionalValue=this.getAdditionalValue();}this._vValue=v;o.call(this,r.current);j.call(this);}if(r.name==="additionalValue"){this._vAdditionalValue=r.current;j.call(this);}if(r.name==="conditions"){if(this._getContent().length<=1){p.call(this,r.current);}}};function _(){return this._vValue;}function i(){return this._vAdditionalValue;}function j(){if(!this.bDelegateInitialized){this.awaitControlDelegate().then(function(){if(!this.bIsDestroyed){j.call(this);}}.bind(this));return;}if(this.getDisplay()===b.Value){k.call(this,_.call(this),i.call(this));}else if(!this._iConditionUpdateTimer){this._iConditionUpdateTimer=setTimeout(function(){k.call(this,_.call(this),i.call(this));this._iConditionUpdateTimer=undefined;this._bPendingConditionUpdate=false;}.bind(this),0);this._bPendingConditionUpdate=true;}}function k(v,A){var r=this.getConditions();if(this._checkValueInitial(v)&&!A){if(r.length>0){this.setConditions([]);}}else{var O=r[0]&&r[0].values[0];var s=r[0]&&r[0].values[1]?r[0].values[1]:null;if(!r[0]||r[0].operator!=="EQ"||!n.call(this,O,v)||s!==A){var t=C.createItemCondition(v,A);t.validated=d.Validated;this.setConditions([t]);}}}function l(v,O){var D=this._oContentFactory.getDataType()?this._oContentFactory.getDataType().getMetadata().getName():this.getDataType();if(v&&O&&(D==="sap.ui.model.odata.type.Unit"||D==="sap.ui.model.odata.type.Currency")&&!v[2]&&O[2]!==undefined){v=m([],v);v[2]=O[2];if(this._bPendingChange){var r=this.getConditions()[0];if(r){if(v[0]===O[0]&&v[0]!==r.values[0][0]){v[0]=r.values[0][0];}if(v[1]===O[1]&&v[1]!==r.values[0][1]){v[1]=r.values[0][1];}}}}return v;}function n(v,V,u){var E=v===V;var D=this._oContentFactory.getDataType()?this._oContentFactory.getDataType().getMetadata().getName():this.getDataType();if(!E&&this.getTypeUtil().getBaseType(D)===B.Unit&&Array.isArray(v)&&Array.isArray(V)){var N=v[0];var U=v[1];var r=v.length>=3?v[2]:null;var s=V[0];var t=V[1];var w=V.length>=3?V[2]:null;if(N===s&&U===t&&(((this._bUnitSet||u)&&(!r||!w))||e(r,w))){E=true;}if((r||w)&&!u){this._bUnitSet=true;}}return E;}function o(v){if(!this._bTypeInitialized){if(!this.bDelegateInitialized){this.awaitControlDelegate().then(function(){if(!this.bIsDestroyed){o.call(this,v);}}.bind(this));return;}var r=this.getBinding("value");var D=r?r.getType():this._oContentFactory.getDataType();this._oTypeInitialization=this.getControlDelegate().initializeTypeFromBinding(this.getPayload(),D,v);this._bTypeInitialized=this._oTypeInitialization.bTypeInitialized;if(this._bTypeInitialized&&this._oContentFactory.getUnitOriginalType()){this.getControlDelegate().initializeInternalUnitType(this.getPayload(),this._oContentFactory.getDataType(),this._oTypeInitialization);this.getControlDelegate().initializeInternalUnitType(this.getPayload(),this._oContentFactory.getUnitType(),this._oTypeInitialization);}}}h.prototype._fireChange=function(r,v,w,P){var V;if(r){if(v){V=this._getResultForPromise(r);}else{V=w;}}if(this._getContent().length>1){if(r){p.call(this,this.getConditions());}else if(P){P=P.then(function(R){p.call(this,this.getConditions());return R;}.bind(this));}}this.fireChange({value:V,valid:v,promise:P});};h.prototype._getResultForPromise=function(r){var v;if(r.length===0&&this._oContentFactory.getDataType()){v=this._oContentFactory.getDataType().parseValue("","string",[]);}else if(r.length===1){v=r[0].values[0];}return v;};function p(r){if(!this.bDelegateInitialized){this.awaitControlDelegate().then(function(){if(!this.bIsDestroyed){p.call(this,r);}}.bind(this));return;}var v=null;var A=null;var O=this.getValue();var s=this.getAdditionalValue();if(r.length===0&&O===null&&s===null){return;}v=this._getResultForPromise(r);if(r.length===0&&!s){A=s;}else if(r.length===1&&r[0].values.length>1){A=r[0].values[1];}this._vValue=v;this._vAdditionalValue=A;if(!n.call(this,v,O,true)){this.setProperty("value",v,true);}if(A!==s&&!q.call(this)){this.setProperty("additionalValue",A,true);}}h.prototype._getOperators=function(){return["EQ"];};function q(){var r=this.getBinding("additionalValue");if(r&&r.getBindingMode()===f.OneWay){return true;}return false;}return h;});