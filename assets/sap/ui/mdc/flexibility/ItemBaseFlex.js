/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/Base","sap/ui/mdc/p13n/Engine","sap/base/Log"],function(F,E,L){"use strict";var I={_bSupressFlickering:true,beforeAddItem:function(D,d,c,p){return D.addItem.call(D,d,c,p);},afterRemoveItem:function(D,i,c,p){return D.removeItem.call(D,i,c,p);},findItem:function(m,d,n){return Promise.resolve();},beforeApply:function(c,C,i){return;},afterApply:function(c,C,i){return;},determineAggregation:function(m,c){var d;return Promise.resolve().then(m.getControlMetadata.bind(m,c)).then(function(M){d=M.getDefaultAggregation().name;return m.getAggregation(c,d);}).then(function(D){return{name:d,items:D};});},_getExistingAggregationItem:function(c,p,C){var m=p.modifier;return this.determineAggregation(m,C).then(function(a){var e,A=a.items;if(A){e=this.findItem(m,A,c.name);}return e;}.bind(this));},_getDelegate:function(d){return new Promise(function(r,R){sap.ui.require([d],r,R);});},_getOperationText:function(i){return i?"reverted ":"applied ";},_getChangeTypeText:function(a){return a?"add":"remove";},_delayInvalidate:function(c){if(c&&c.isInvalidateSuppressed&&!c.isInvalidateSuppressed()){c.iSuppressInvalidate=1;E.getInstance().waitForChanges(c).then(function(){c.iSuppressInvalidate=0;c.invalidate();});}},_applyAdd:function(c,C,p,i){this.beforeApply(c.getChangeType(),C,i);if(this._bSupressFlickering){this._delayInvalidate(C);}var m=p.modifier,o=i?c.getRevertData():c.getContent();var d=o.name;var a;var D;var A;var b=this.determineAggregation(m,C).then(function(r){A=r;D=A.items;a=o.index>-1?o.index:D.length;return this._getExistingAggregationItem(o,p,C);}.bind(this)).then(function(e){if(e){return e;}else{return m.getProperty(C,"delegate").then(function(f){return this._getDelegate(f.name);}.bind(this)).then(function(f){return this.beforeAddItem(f,d,C,p,o);}.bind(this)).then(function(r){return r;});}}.bind(this)).then(function(e){if(!e){throw new Error("No item in"+A.name+"  created. Change to "+this._getChangeTypeText(!i)+"cannot be "+this._getOperationText(i)+"at this moment");}if(D.indexOf(e)<0){m.insertAggregation(C,A.name,e,a);}else{L.warning("The specified change is already existing - change appliance ignored");}return e;}.bind(this)).then(function(){if(i){c.resetRevertData();}else{c.setRevertData({name:o.name,index:a});}this.afterApply(c.getChangeType(),C,i);}.bind(this));return b;},_applyRemove:function(c,C,p,i){this.beforeApply(c.getChangeType(),C,i);if(this._bSupressFlickering){this._delayInvalidate(C);}var m=p.modifier,o=i?c.getRevertData():c.getContent();var a;var b;var d;var e=this.determineAggregation(m,C).then(function(D){a=D;return this._getExistingAggregationItem(o,p,C);}.bind(this)).then(function(r){d=r;if(!d){if(i){throw new Error("No item found in "+a.name+". Change to "+this._getChangeTypeText(i)+"cannot be "+this._getOperationText(i)+"at this moment");}else{L.warning("The specified change is already existing - change appliance ignored");}return-1;}return m.findIndexInParentAggregation(d);}.bind(this)).then(function(f){b=f;return m.removeAggregation(C,a.name,d);}).then(function(){return m.getProperty(C,"delegate").then(function(D){return this._getDelegate(D.name);}.bind(this)).then(function(D){return this.afterRemoveItem(D,d,C,p).then(function(f){if(f&&d){m.destroy(d);}this.afterApply(c.getChangeType(),C,i);}.bind(this));}.bind(this));}.bind(this)).then(function(){if(i){c.resetRevertData();}else{c.setRevertData({name:o.name,index:b});}});return e;},_applyMove:function(c,C,p,i){this.beforeApply(c.getChangeType(),C,i);if(this._bSupressFlickering){this._delayInvalidate(C);}var m=p.modifier;var o=i?c.getRevertData():c.getContent();var a;var A;var O;var b=this.determineAggregation(m,C).then(function(r){A=r;return this._getExistingAggregationItem(o,p,C);}.bind(this)).then(function(r){a=r;}).then(function(){if(!a){throw new Error("No corresponding item in "+A.name+" found. Change to move item cannot be "+this._getOperationText(i)+"at this moment");}return m.findIndexInParentAggregation(a);}.bind(this)).then(function(r){O=r;if(C.moveColumn){return C.moveColumn(a,o.index);}else{return m.removeAggregation(C,A.name,a).then(function(){return m.insertAggregation(C,A.name,a,o.index);});}}).then(function(){if(i){c.resetRevertData();}else{c.setRevertData({name:o.name,index:O});}this.afterApply(c.getChangeType(),C,i);}.bind(this));return b;},_removeIndexFromChange:function(c){delete c.getContent().index;},createChangeHandler:function(a,c,r){return{"changeHandler":{applyChange:function(C,o,p){return a(C,o,p);},completeChangeContent:function(C,m,p){c(C,m,p);},revertChange:function(C,o,p){return r(C,o,p,true);}},"layers":{"USER":true}};},createAddChangeHandler:function(){var a=this._applyAdd.bind(this);var c=function(){};var r=this._applyRemove.bind(this);return this.createChangeHandler(a,c,r);},createRemoveChangeHandler:function(){var a=this._applyRemove.bind(this);var c=this._removeIndexFromChange.bind(this);var r=this._applyAdd.bind(this);return this.createChangeHandler(a,c,r);},createMoveChangeHandler:function(){var a=this._applyMove.bind(this);var c=function(){};var r=a;return this.createChangeHandler(a,c,r);}};return I;});