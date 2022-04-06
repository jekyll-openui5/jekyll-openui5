/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Component","sap/ui/fl/Utils","sap/base/Log","sap/base/util/merge","sap/base/util/ObjectPath","sap/base/util/isEmptyObject","sap/ui/base/ManagedObjectObserver","sap/ui/thirdparty/hasher","sap/base/util/includes","sap/ui/fl/apply/_internal/controlVariants/Utils","sap/ui/fl/apply/_internal/flexState/controlVariants/VariantManagementState"],function(C,U,L,m,O,i,M,h,a,V,b){"use strict";var _={};function c(n,o){var A=[];return n.reduce(function(r,v){var l=o.getVariantManagementReference(v).variantManagementReference;if(l){if(a(A,l)){r.updateRequired=true;return r;}A.push(l);}if(l&&o.oData[l].currentVariant!==v){r.updateRequired=true;if(o.oData[l].currentVariant!==o.oData[l].defaultVariant){r.parameters.push(o.oData[l].currentVariant);}}else{r.parameters.push(v);}return r;},{updateRequired:false,parameters:[]});}function d(p,o){var r=O.get(["params",V.VARIANT_TECHNICAL_PARAMETER],p);if(r){var u=c(r,o);if(u.updateRequired){k.update({updateURL:!o._bDesignTimeMode,parameters:u.parameters,updateHashEntry:true,model:o});}}}function e(o,n){try{var u=o.getUShellService("URLParsing");if(u){var N=u.parseShellHash(n);d(N,o);}}catch(E){L.error(E.message);}var S=o.getUShellService("ShellNavigation");return S&&S.NavigationFilterStatus.Continue;}function f(o){var S=o.getUShellService("ShellNavigation");if(!_[o.sFlexReference]){_[o.sFlexReference]=e.bind(null,o);if(S){S.registerNavigationFilter(_[o.sFlexReference]);}}}function g(o){var S=o.getUShellService("ShellNavigation");if(S){S.unregisterNavigationFilter(_[o.sFlexReference]);delete _[o.sFlexReference];}}function s(p){var o=p.model;var u=o.getUShellService("URLParsing");var l=o.getUShellService("CrossApplicationNavigation");var P=u&&u.parseShellHash(h.getHash());if(P&&P.params){var t=U.getTechnicalParametersForComponent(o.oAppComponent);if(!t){L.warning("Component instance not provided, so technical parameters in component data and browser history remain unchanged");}if(p.parameters.length===0){delete P.params[V.VARIANT_TECHNICAL_PARAMETER];t&&delete t[V.VARIANT_TECHNICAL_PARAMETER];}else{P.params[V.VARIANT_TECHNICAL_PARAMETER]=p.parameters;t&&(t[V.VARIANT_TECHNICAL_PARAMETER]=p.parameters);}if(p.silent){h.changed.active=false;h.replaceHash(u.constructShellHash(P));h.changed.active=true;}else{l.toExternal({target:{semanticObject:P.semanticObject,action:P.action,context:P.contextRaw},params:P.params,appSpecificRoute:P.appSpecificRoute,writeHistory:false});}}}function j(p){var r={index:-1};var o=p.model;var u=o.getUShellService("URLParsing");var l=u&&u.parseShellHash(h.getHash()).params;if(l){r.parameters=[];if(o._bDesignTimeMode){l[V.VARIANT_TECHNICAL_PARAMETER]=k.getStoredHashParams(p);}if(Array.isArray(l[V.VARIANT_TECHNICAL_PARAMETER])){l[V.VARIANT_TECHNICAL_PARAMETER]=l[V.VARIANT_TECHNICAL_PARAMETER].map(decodeURIComponent);l[V.VARIANT_TECHNICAL_PARAMETER].some(function(P,I){var v=b.getVariant({vmReference:p.vmReference,vReference:P,reference:o.oChangePersistence.getComponentName()});if(v){r.index=I;return true;}});}}return m(r,l&&l[V.VARIANT_TECHNICAL_PARAMETER]&&{parameters:l[V.VARIANT_TECHNICAL_PARAMETER]});}var k={variantTechnicalParameterName:"sap-ui-fl-control-variant-id",initialize:function(p){var o=p.model;var u=o.getUShellService("URLParsing");var P=u&&u.parseShellHash(h.getHash());var l=P&&P.params&&P.params[V.VARIANT_TECHNICAL_PARAMETER];k.attachHandlers(p);k.update({model:o,parameters:l,updateHashEntry:Array.isArray(l)&&l.length>0});d(P,o);},updateVariantInURL:function(p){var u=k.removeURLParameterForVariantManagement(p);if(!u.parameters){return;}var P=u.parameters||[];var I=u.index;var l=p.newVReference===p.model.oData[p.vmReference].defaultVariant;if(!l){if(I===-1){P=P.concat([p.newVReference]);}else{P=P.slice(0,I).concat([p.newVReference],P.slice(I));}}if(!l||I>-1){k.update({parameters:P,updateURL:!p.model._bDesignTimeMode,updateHashEntry:true,model:p.model});}},removeURLParameterForVariantManagement:function(p){var v=j(p);if(v.index>-1){v.parameters.splice(v.index,1);}return v;},attachHandlers:function(p){function o(){return p.model._oVariantSwitchPromise.then(function(){p.model._oHashData.controlPropertyObservers.forEach(function(l){l.destroy();});g(p.model);p.model.resetMap(true).then(p.model.destroy.bind(p.model));p.model.oComponentDestroyObserver.unobserve(p.model.oAppComponent,{destroy:true});p.model.oComponentDestroyObserver.destroy();});}f(p.model);if(!p.model.oComponentDestroyObserver&&p.model.oAppComponent instanceof C){p.model.oComponentDestroyObserver=new M(o.bind(null));p.model.oComponentDestroyObserver.observe(p.model.oAppComponent,{destroy:true});}},registerControl:function(p){if(p.updateURL){p.model._oHashData.variantControlIds.push(p.vmReference);}},update:function(p){if(!p.model._oHashData){p.model._oHashData={hashParams:[],controlPropertyObservers:[],variantControlIds:[]};}if(!p||!Array.isArray(p.parameters)){L.info("Variant URL parameters could not be updated since invalid parameters were received");return;}if(p.updateURL){s(p);}if(p.updateHashEntry&&!i(p.model)){p.model._oHashData.hashParams=p.parameters;}},getStoredHashParams:function(p){return Array.prototype.slice.call(p.model._oHashData.hashParams);},handleModelContextChange:function(p){var l="modelContextChange";function n(E,P){var v=P.model.getVariantManagementReferenceForControl(E.getSource());var q=P.model._oHashData.variantControlIds;var I=q.indexOf(v);if(I>-1){q.slice(I).forEach(function(r){if(j({vmReference:r,model:p.model}).index===-1){P.model.switchToDefaultForVariantManagement(r);}});}}var o=new M(function(E){if(E.current===true&&E.old===false){E.object.attachEvent(l,{model:p.model},n);}else if(E.current===false&&E.old===true){E.object.detachEvent(l,n);}});o.observe(p.vmControl,{properties:["resetOnContextChange"]});p.model._oHashData.controlPropertyObservers.push(o);if(p.vmControl.getResetOnContextChange()!==false){p.vmControl.attachEvent(l,{model:p.model},n);}},clearAllVariantURLParameters:function(p){k.update({updateURL:true,parameters:[],updateHashEntry:false,model:p.model});}};return k;});