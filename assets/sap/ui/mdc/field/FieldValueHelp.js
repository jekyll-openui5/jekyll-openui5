/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/mdc/field/FieldHelpBase','sap/ui/mdc/condition/Condition','sap/ui/mdc/condition/FilterOperatorUtil','sap/ui/mdc/enum/OutParameterMode','sap/ui/mdc/enum/ConditionValidated','sap/ui/mdc/condition/FilterConverter','sap/ui/base/ManagedObjectObserver','sap/ui/base/SyncPromise','sap/base/util/ObjectPath','sap/base/util/deepEqual','sap/base/util/merge','sap/ui/model/resource/ResourceModel','sap/ui/model/Context','sap/ui/Device','sap/m/library','sap/ui/core/library',"sap/ui/mdc/util/loadModules","sap/ui/events/KeyCodes"],function(F,C,a,O,b,c,M,S,d,e,m,R,f,D,g,h,l,K){"use strict";var k;var B;var V;var n;var o;var p;var q;var r;var I;var s=g.ButtonType;var t=h.OpenState;var u=F.extend("sap.ui.mdc.field.FieldValueHelp",{metadata:{library:"sap.ui.mdc",properties:{delegate:{type:"object",group:"Data",defaultValue:{name:"sap/ui/mdc/field/FieldValueHelpDelegate"}},filterFields:{type:"string",defaultValue:""},keyPath:{type:"string",defaultValue:""},descriptionPath:{type:"string",defaultValue:""},showConditionPanel:{type:"boolean",defaultValue:false},title:{type:"string",group:"Appearance",defaultValue:""},noDialog:{type:"boolean",group:"Appearance",defaultValue:false},caseSensitive:{type:"boolean",defaultValue:true},_enableOK:{type:"boolean",group:"Appearance",defaultValue:true,visibility:"hidden"}},aggregations:{content:{type:"sap.ui.mdc.field.FieldValueHelpContentWrapperBase",multiple:false},suggestContent:{type:"sap.ui.mdc.field.FieldValueHelpContentWrapperBase",multiple:false},dialogContent:{type:"sap.ui.mdc.field.FieldValueHelpContentWrapperBase",multiple:false},filterBar:{type:"sap.ui.mdc.filterbar.FilterBarBase",multiple:false},inParameters:{type:"sap.ui.mdc.field.InParameter",group:"Data",multiple:true},outParameters:{type:"sap.ui.mdc.field.OutParameter",group:"Data",multiple:true},_dialog:{type:"sap.m.Dialog",multiple:false,visibility:"hidden"},_filterBar:{type:"sap.ui.mdc.filterbar.FilterBarBase",multiple:false,visibility:"hidden"},collectiveSearchItems:{type:"sap.ui.core.Item",multiple:true,singularName:"collectiveSearchItem"}},defaultAggregation:"content",events:{dataRequested:{}}}});u._init=function(){F._init.apply(this,arguments);k=undefined;B=undefined;V=undefined;n=undefined;o=undefined;};u.prototype.init=function(){F.prototype.init.apply(this,arguments);this._oObserver=new M(v.bind(this));this._oObserver.observe(this,{properties:["filterValue","conditions","showConditionPanel","filterFields"],aggregations:["content","suggestContent","dialogContent","filterBar","_filterBar","inParameters","collectiveSearchItems"]});this.setBindingContext(null);this._oConditions={};};u.prototype.exit=function(){F.prototype.exit.apply(this,arguments);if(this._oManagedObjectModel){this._oManagedObjectModel.destroy();delete this._oManagedObjectModel;}this._oObserver.disconnect();this._oObserver=undefined;delete this._oConditions;if(this._iUpdateTimer){clearTimeout(this._iUpdateTimer);this._iUpdateTimer=null;}if(this._iFilterTimer){clearTimeout(this._iFilterTimer);this._iFilterTimer=null;}if(this._iSearchFieldTimer){clearTimeout(this._iSearchFieldTimer);this._iSearchFieldTimer=null;}if(this._oCollectiveSearchSelect){this._oCollectiveSearchSelect.destroy();delete this._oCollectiveSearchSelect;}if(this._oResourceBundleM){this._oResourceBundleM=null;}if(this._oResourceBundle){this._oResourceBundle=null;}};u.prototype.invalidate=function(i){if(i){var j=F1.call(this,true);var G1=F1.call(this,false);var H1=this.getAggregation("_dialog");if((j&&i===j)||(G1&&i===G1)){var I1=this.getAggregation("_popover");if(H1&&H1.isOpen()){var J1=H1.getContent()[0];J1.invalidate(i);}else if(I1&&I1.isOpen()){I1.invalidate(i);}return;}var K1=this._getFilterBar();if((H1&&i===H1)||(K1&&i===K1)){if(i.bOutput&&!this._bIsBeingDestroyed){var L1=this.getParent();if(L1){L1.invalidate(this);}}return;}}F.prototype.invalidate.apply(this,arguments);};u.prototype.connect=function(i){F.prototype.connect.apply(this,arguments);A1.call(this);r1.call(this,this.getShowConditionPanel());return this;};u.prototype.getIcon=function(){if(this.getNoDialog()){return"sap-icon://slim-arrow-down";}else{return"sap-icon://value-help";}};u.prototype._createPopover=function(){var i=F.prototype._createPopover.apply(this,arguments);var j=function(H1){this.fireSwitchToValueHelp();}.bind(this);if(i){i.addDelegate({onsapshow:j});var G1=F1.call(this,true);if(G1){S.resolve(G1.initialize(true)).then(function(){if(G1.enableShowAllItems()){l(["sap/m/Button","sap/m/Toolbar","sap/m/ToolbarSpacer"]).then(function(H1){var B=H1[0];var I1=H1[1];var J1=H1[2];var K1=B1.apply(this);var L1=new B(this.getId()+"-showAllItems",{text:K1.getText("INPUT_SUGGESTIONS_SHOW_ALL"),press:j});var M1=[new J1(this.getId()+"-Spacer")].concat(L1);var N1=new I1(this.getId()+"-TB",{content:M1,visible:!G1.getAllItemsShown()}).setModel(this._oFooterModel,"$config");i.setFooter(N1);}.bind(this));}}.bind(this));}i._getAllContent=function(){var H1=this.getParent();var I1=[];if(H1){var J1=z1.call(H1);if(J1){I1.push(J1);}}return I1;};if(this._bNavigate){this.navigate(this._iStep);}}return i;};u.prototype._handleAfterOpen=function(i){F.prototype._handleAfterOpen.apply(this,arguments);var j=F1.call(this,true);if(j){j.fieldHelpOpen(true);}};u.prototype.open=function(i){if(this.getNoDialog()&&!i){i=true;}A1.call(this);if(this._bOpenAfterPromise){this._bSuggestion=i;return;}var j=F1.call(this,i);var G1=function(){if(this._bOpenAfterPromise){delete this._bOpenAfterPromise;this.open(this._bSuggestion);delete this._bSuggestion;}}.bind(this);var H1=this._bOpen?this._callContentRequest(!!i,G1):this._fireOpen(!!i,G1);delete this._bOpen;if(!H1){this._bSuggestion=i;if(i){this._getPopover();}else{m1.call(this);}this._bOpenAfterPromise=true;return;}this._bOpenHandled=true;j=F1.call(this,i);if(j&&j.getFilterEnabled()&&!this._bNavigateRunning){this._bApplyFilter=false;if(!j.isSuspended()||i||this.getFilterValue()){this._bApplyFilter=true;}u1.call(this);}if(this._bUpdateFilterAfterClose){this._bUpdateFilterAfterClose=false;P.call(this,this.getFilterValue());}if(i){if(!j){this._bOpenIfContent=true;}else{j.fieldHelpOpen(i);if(!this.getFilterValue()&&!this._bNavigateRunning){e1.call(this,true);}F.prototype.open.apply(this,[i]);}}else{var I1=this.getAggregation("_popover");if(I1){if(I1.isOpen()){this.close();this._bSwitchToDialog=true;}I1.$().remove();}var J1=m1.call(this);if(J1){y1.call(this);E1.call(this,true);t1.call(this);J1.setFieldGroupIds(this._oField.getFieldGroupIds());var K1=J1.getContent()[0];K1.setShowTokenizer(this.getMaxConditions()!==1&&!!j);K1.setFormatOptions(this._getFormatOptions());K1.bindProperty("conditions",{path:"$help>/conditions"});if(j){j.fieldHelpOpen(false);L.call(this);}this._aOldConditions=this.getConditions();J1.open();this._bDialogOpen=true;}else{this._bOpen=true;}}this._bOpenHandled=false;return;};u.prototype.toggleOpen=function(i){if(this.getNoDialog()&&!i){i=true;}if(i){F.prototype.toggleOpen.apply(this,[i]);}else if(this._bOpen||this._bOpenIfContent||this._bOpenAfterPromise){delete this._bOpen;delete this._bSuggestion;delete this._bOpenIfContent;delete this._bOpenAfterPromise;}else{var j=m1.call(this);if(j){if(j.isOpen()){var G1=j.oPopup.getOpenState();if(G1!=="CLOSED"&&G1!=="CLOSING"){this.close();}else{this._bReopen=true;}}else{this.open(i);}}else{this.open(i);}}};u.prototype.close=function(){if(!this._bDialogOpen){F.prototype.close.apply(this,arguments);}else{var i=this.getAggregation("_dialog");if(i){this._bClosing=true;i.close();var j=i.getContent()[0];j.unbindProperty("conditions",true);if(j._oDefineConditionPanel){j._oDefineConditionPanel.cleanUp();}}this._bReopen=false;this._bSwitchToDialog=false;delete this._bOpen;delete this._bOpenAfterPromise;}};u.prototype.isOpen=function(i){var j=F.prototype.isOpen.apply(this,arguments);if(!j&&(!i||!this._bClosing)){var G1=this.getAggregation("_dialog");if(G1){j=G1.isOpen();}}return j;};u.prototype.getDomRef=function(){if(!this._bDialogOpen){return F.prototype.getDomRef.apply(this,arguments);}else{var i=this.getAggregation("_dialog");if(i){return i.getDomRef();}}};function _(){var i=this._getFilterBar();var j;if(i){j=i.getInternalConditions();}else{j=this._oConditions;}var G1=false;for(var H1 in j){if(j[H1].length>0){x1.call(this,H1);G1=true;}}if(G1){e1.call(this,true);}}u.prototype._handleAfterClose=function(i){var j=this.getAggregation("_dialog");var G1=!j||i.getSource()!==j;var H1=F1.call(this,G1);if(H1){if(!H1.getAsyncKeyText()){_.call(this);}H1.fieldHelpClose();}if(!this.isOpen()){this._bApplyFilter=false;}this._bNavigateRunning=false;F.prototype._handleAfterClose.apply(this,arguments);};function v(i){if(i.object==this){var j;if(i.name==="content"){l1.call(this,i.mutation,i.child,i.name);}if(i.name==="suggestContent"){l1.call(this,i.mutation,i.child,i.name);}if(i.name==="dialogContent"){l1.call(this,i.mutation,i.child,i.name);}if(i.name==="filterBar"){if(i.mutation==="insert"&&this.getAggregation("_filterBar")){this.destroyAggregation("_filterBar");delete this._oSearchField;}s1.call(this,i.mutation,i.child,false);}if(i.name==="_filterBar"){s1.call(this,i.mutation,i.child,true);}if(i.name==="conditions"){J.call(this,i.current);}if(i.name==="filterValue"){if(this._bClosing){this._bUpdateFilterAfterClose=true;}else{P.call(this,i.current);}}if(i.name==="showConditionPanel"){r1.call(this,i.current);}if(i.name==="filterFields"){j=this.getAggregation("_dialog");if(j){if(j.isOpen()){if(i.current){y1.call(this);}else if(this.getAggregation("_filterBar")){this.destroyAggregation("_filterBar");}}}}if(i.name==="inParameters"){Q.call(this,i.child,i.mutation);}if(i.name==="collectiveSearchItems"){E1.call(this,false);}}else if(i.object.isA("sap.ui.mdc.field.InParameter")){if(i.name==="value"){W.call(this,i.object.getHelpPath(),i.current,i.old,i.object.getUseConditions(),i.object.getInitialValueFilterEmpty());}if(i.name==="helpPath"){X.call(this,i.current,i.old,i.object.getValue(),i.object.getUseConditions(),i.object.getInitialValueFilterEmpty());}}}u.prototype.openByTyping=function(){if(!this._bDetermineSearchSupportedCalled&&!this.isOpen()&&!this._bOpen&&!this._bOpenIfContent&&!this._bOpenAfterPromise){if(!this.bDelegateInitialized&&!this.bDelegateLoading){this.initControlDelegate();}if(this.bDelegateInitialized){return w.call(this);}else{this._bDetermineSearchSupportedCalled=true;return this.awaitControlDelegate().then(function(){return w.call(this);}.bind(this));}}return!!this.getFilterFields();};function w(){this.fireOpen({suggestion:true});this._bDetermineSearchSupportedCalled=true;var i=this.getControlDelegate().determineSearchSupported(this.getPayload(),this);if(i instanceof Promise){return i.then(function(){return!!this.getFilterFields();}.bind(this));}else{return!!this.getFilterFields();}}u.prototype.isFocusInHelp=function(){if(!this.getNoDialog()){var i=this.getAggregation("_dialog");if((i&&i.isOpen())||(this._bDialogRequested&&this._bOpen)||(this._bOpenAfterPromise&&!this._bSuggestion)){return true;}}if(this._bFocusPopover){return true;}return false;};u.prototype.removeFocus=function(){var i=F1.call(this,true);if(i){i.removeFocus();}};u.prototype.navigate=function(i){var j=F1.call(this,true);var G1=this.getAggregation("_popover");A1.call(this);if(!G1||!G1.isOpen()){var H1=function(){this.navigate(i);}.bind(this);var I1=this._bNavigate?this._callContentRequest(true,H1):this._fireOpen(true,H1);if(!I1){j=F1.call(this,true);this._bNavigate=false;this._iStep=null;if(j){this._getPopover();}return;}}this._bNavigate=false;this._iStep=null;j=F1.call(this,true);if(j){G1=this._getPopover();this._bApplyFilter=true;this._bNavigateRunning=true;u1.call(this);e1.call(this,true);}if(!G1){this._bNavigate=true;this._iStep=i;return;}if(j){j.navigate(i,G1.isOpen());}};function x(i){var j=this._getPopover();var G1=i.getParameter("disableFocus");var H1=i.getParameter("key");var I1=i.getParameter("description");var J1=i.getParameter("inParameters");var K1=i.getParameter("outParameters");var L1=i.getParameter("leave");var M1=i.getParameter("itemId");var N1;if(L1){this.fireNavigate({key:undefined,value:undefined,condition:undefined,itemId:undefined,leaveFocus:L1});return;}if(H1===undefined&&!G1){this._bFocusPopover=true;}if(!j.isOpen()){this._bOpenHandled=true;this.open(true);this._bOpenHandled=false;}this._bNavigateRunning=false;if(H1===undefined){this._bFocusPopover=false;return;}if(J1){J1=Z.call(this,J1);}if(K1){K1=$.call(this,K1);}N1=this._createCondition(H1,I1,J1,K1);this.setProperty("conditions",[N1],true);this.fireNavigate({value:I1,key:H1,condition:N1,itemId:M1,leaveFocus:L1});}u.prototype._getTextOrKey=function(i,j,G1,H1,I1,J1,K1,L1,M1,N1,O1){var P1="";var Q1=F1.call(this,true);if(Q1){var R1=Q1.getListBinding();if(!R1){this.fireDataRequested();}if(G1&&!G1.getModel()){return null;}O1=O1||this.getCaseSensitive();var S1=this.oBindingContexts[undefined];var T1=this.getInParameters();var U1=false;if(G1&&f.hasChanged(S1,G1)){U1=true;}var V1=y.call(this,T1,U1,G1,S1,K1,L1);P1=S.resolve().then(function(){return A.call(this,V1);}.bind(this)).then(function(){return S.resolve().then(function(){if(G1&&!G1.getModel()){return null;}else if(N1){return Q1.getKeyAndText(M1,i,d1.call(this,H1,T1,false,V1,G1,true),d1.call(this,I1,this.getOutParameters(),true,undefined,undefined,true),O1);}else if(j){return Q1.getTextForKey(i,d1.call(this,H1,T1,false,V1,G1,true),d1.call(this,I1,this.getOutParameters(),true,undefined,undefined,true),J1,O1);}else{return Q1.getKeyForText(i,d1.call(this,undefined,T1,false,V1,G1,true),J1,O1);}}.bind(this)).then(function(P1){z.call(this,V1,U1);return E.call(this,P1);}.bind(this)).unwrap();}.bind(this)).unwrap();}return P1;};function y(j,G1,H1,I1,J1,K1){var L1=[];for(var i=0;i<j.length;i++){var M1=j[i];var N1=M1.getBinding("value");if(M1.getUseConditions()&&J1){var O1=this.getModel(K1);if(O1!==J1){L1.push(J1.bindProperty("/"+M1.getFieldPath()));}}else if(N1){var P1=N1.getPath();var Q1=N1.getContext();if(G1&&N1.isRelative()&&(Q1===I1||(!Q1&&I1))){if(H1.getProperty(P1)===undefined){var R1=N1.getModel();L1.push(R1.bindProperty(P1,H1));}}else if((!Q1&&N1.isRelative())||(Q1&&Q1.getProperty(P1)===undefined)||N1.getValue()===undefined||(Q1&&!e(M1.validateProperty("value",Q1.getProperty(P1)),M1.getValue()))){L1.push(N1);}}}return L1;}function z(j,G1){if(!G1){return;}for(var i=0;i<j.length;i++){j[i].destroy();}}function A(i){if(i.length===0){return null;}if(!this.bDelegateInitialized&&!this.bDelegateLoading){this.initControlDelegate();}if(this.bDelegateInitialized){return this.getControlDelegate().checkBindingsPending(this.getPayload(),i);}else{return this.awaitControlDelegate().then(function(){return this.getControlDelegate().checkBindingsPending(this.getPayload(),i);}.bind(this));}}function E(i){if(i&&typeof i==="object"){i=m({},i);if(i.inParameters){i.inParameters=Z.call(this,i.inParameters);}if(i.outParameters){i.outParameters=$.call(this,i.outParameters);}}return i;}u.prototype._isTextOrKeyRequestSupported=function(){var i=F1.call(this,true);return!!i;};u.prototype.isUsableForValidation=function(){var i=F1.call(this,true);return!!i;};function G(G1){var H1=G1.getParameter("selectedItems");var I1=G1.getParameter("itemPress");var J1;var K1=this.getConditions();var L1;var i=0;var j=0;var M1=false;var N1=this.getMaxConditions();var O1=this._getOperator();for(i=K1.length-1;i>=0;i--){L1=K1[i];L1.inParameters=b1.call(this,L1.inParameters);L1.outParameters=c1.call(this,L1.outParameters);if(L1.operator===O1.name&&L1.validated===b.Validated){M1=false;for(j=0;j<H1.length;j++){J1=H1[j];if(L1.values[0]===J1.key&&(!L1.inParameters||!J1.inParameters||e(L1.inParameters,J1.inParameters))&&(!L1.outParameters||!J1.outParameters||e(L1.outParameters,J1.outParameters))){M1=true;if(L1.values[1]!==J1.description&&J1.description){if(L1.values.length===1){L1.values.push(J1.description);}else{L1.values[1]=J1.description;}}break;}}if(!M1){K1.splice(i,1);}}}for(i=0;i<H1.length;i++){J1=H1[i];M1=false;for(j=0;j<K1.length;j++){L1=K1[j];if(L1.operator===O1.name&&L1.validated===b.Validated&&L1.values[0]===J1.key&&(!L1.inParameters||e(L1.inParameters,J1.inParameters))&&(!L1.outParameters||e(L1.outParameters,J1.outParameters))){M1=true;L1.inParameters=J1.inParameters;L1.outParameters=J1.outParameters;break;}}if(!M1){L1=this._createCondition(J1.key,J1.description,J1.inParameters,J1.outParameters);K1.push(L1);}}if(N1>0&&K1.length>N1){K1.splice(0,K1.length-N1);}for(i=0;i<K1.length;i++){L1=K1[i];if(L1.inParameters){L1.inParameters=Z.call(this,L1.inParameters);}else{delete L1.inParameters;}if(L1.outParameters){L1.outParameters=$.call(this,L1.outParameters);}else{delete L1.outParameters;}}if(this._bDialogOpen){this.setProperty("conditions",K1,true);}else{var P1=false;var Q1=false;if(this.getMaxConditions()===1||I1){this.close();Q1=true;}if(this.getMaxConditions()===1){P1=true;}this.setProperty("conditions",K1,true);this.fireSelect({conditions:K1,add:P1,close:Q1});}}function H(i){var j=i.getParameter("contentChange");var G1=i.getSource();var H1;if(G1.enableShowAllItems()){H1=this.getAggregation("_popover");var I1=H1&&H1.getFooter();if(I1){I1.setVisible(!G1.getAllItemsShown());}}if(j){H1=H1||this.getAggregation("_popover");var J1=this.getAggregation("_dialog");if(H1&&this._bOpenIfContent){G1=F1.call(this,true);if(G1){var K1=this._getField();if(K1){G1.fieldHelpOpen(true);H1.openBy(this._getControlForSuggestion());e1.call(this);}this._bOpenIfContent=false;}}else if(J1){G1=F1.call(this,false);if(G1){var L1=J1.getContent()[0];k1.call(this,L1,G1.getDialogContent());if(!this._bApplyFilter&&!this._bClosing&&(this.isOpen()||this._bOpen)&&!G1.isSuspended()){this._bApplyFilter=true;}}}}if(!G1||!G1.getAsyncKeyText()){this.fireDataUpdate();}}function J(j){var G1=false;for(var i=0;i<j.length;i++){var H1=j[i];if(!H1.validated){a.checkConditionValidated(H1);G1=true;}}if(G1){this.setConditions(j);}else{L.call(this);}}function L(){if(!this._oField){return;}N.call(this,F1.call(this,true));N.call(this,F1.call(this,false));}function N(j){if(j){var G1=this._getOperator();var H1=this.getConditions();var I1=[];for(var i=0;i<H1.length;i++){var J1=H1[i];if(J1.operator===G1.name&&J1.validated===b.Validated){I1.push({key:J1.values[0],description:J1.values[1],inParameters:b1.call(this,J1.inParameters),outParameters:c1.call(this,J1.outParameters)});}}if(!e(I1,j.getSelectedItems())){j.setSelectedItems(I1);}}}function P(i){var j=this.getFilterFields();if(!j){return;}var G1=v1.call(this,j);var H1=G1.length>0?G1[0].values[0]:"";if(i===H1){return;}x1.call(this,j);i=i.trim();if(i){this._bOwnFilterChange=false;var I1=C.createCondition("StartsWith",[i],undefined,undefined,b.NotValidated);w1.call(this,j,I1);}e1.call(this,true);}function Q(i,j){var G1=i.getHelpPath();var H1=false;if(j==="remove"){this._oObserver.unobserve(i);if(this._getField()&&this.isOpen()){H1=U.call(this,G1);}}else{this._oObserver.observe(i,{properties:true});if(this._getField()&&this.isOpen()){var I1=i.getValue();var J1=i.getUseConditions();var K1=i.getInitialValueFilterEmpty();H1=U.call(this,G1);H1=T.call(this,G1,I1,J1,K1)||H1;L.call(this);}}e1.call(this,true);}function T(j,G1,H1,I1){var J1;var K1=false;if(j&&(G1||(I1&&!H1))){if(H1){if(Array.isArray(G1)){for(var i=0;i<G1.length;i++){J1=m({},G1[i]);if(J1.inParameters){J1.inParameters=b1.call(this,J1.inParameters,true);}if(J1.outParameters){J1.outParameters=c1.call(this,J1.outParameters,false,true);}w1.call(this,j,J1);K1=true;}}}else{if(!G1&&I1){J1=C.createCondition("Empty",[]);J1.isEmpty=false;}else{J1=C.createItemCondition(G1);J1.validated=b.Validated;}w1.call(this,j,J1);K1=true;}}return K1;}function U(i){var j=false;if(i&&v1.call(this,i).length>0){x1.call(this,i);j=true;}return j;}function W(i,j,G1,H1,I1){if(this._bNoInOutFilterUpdate){return;}if(!this._iUpdateTimer){this._iUpdateTimer=setTimeout(function(){this._iUpdateTimer=undefined;this.fireDataUpdate();}.bind(this),0);}if(!this._getField()||!this.isOpen()){return;}var J1=false;J1=U.call(this,i);J1=T.call(this,i,j,H1,I1)||J1;L.call(this);e1.call(this,true);}function X(i,j,G1,H1,I1){if(!this._getField()||!this.isOpen()){return;}var J1=false;J1=U.call(this,j);J1=T.call(this,i,G1,H1,I1)||J1;e1.call(this,true);}function Y(){var j=this.getInParameters();var G1=false;for(var i=0;i<j.length;i++){var H1=j[i];var I1=H1.getHelpPath();var J1=H1.getValue();var K1=H1.getUseConditions();var L1=H1.getInitialValueFilterEmpty();G1=U.call(this,I1)||G1;G1=T.call(this,I1,J1,K1,L1)||G1;}if(G1||(this._bApplyFilter&&this._bPendingFilterUpdate)){this._bPendingFilterUpdate=false;e1.call(this,true);}}u.prototype.onFieldChange=function(){var G1=this.getOutParameters();A1.call(this);var H1=y.call(this,G1,false);S.resolve().then(function(){return A.call(this,H1);}.bind(this)).then(function(){if(this.bIsDestroyed){return;}var I1=this.getConditions();for(var i=0;i<I1.length;i++){var J1=I1[i];if(J1.outParameters){for(var K1 in J1.outParameters){for(var j=0;j<G1.length;j++){var L1=G1[j];var M1=L1.getValue();var N1=L1.getUseConditions();var O1=true;if(L1.getMode()===O.WhenEmpty){if(N1){O1=!M1||(Array.isArray(M1)&&M1.length===0);}else{O1=!M1;}}if(O1){if(N1){var P1;if(!L1.getHelpPath()){P1=C.createCondition("EQ",[L1.getFixedValue()],undefined,undefined,b.NotValidated);}else if(L1.getFieldPath()===K1){P1=C.createCondition("EQ",[J1.outParameters[K1]],undefined,undefined,b.Validated);}else{continue;}if(!M1){M1=[];}if(!Array.isArray(M1)){throw new Error("Value on OutParameter must be an array "+L1);}if(a.indexOfCondition(P1,M1)<0){P1.validated=b.Validated;M1.push(P1);L1.setValue(M1);}}else if(!L1.getHelpPath()){L1.setValue(L1.getFixedValue());}else if(L1.getFieldPath()===K1){L1.setValue(J1.outParameters[K1]);}}}}}}}.bind(this)).unwrap();};function Z(i){return a1.call(this,i,this.getInParameters());}function $(i){return a1.call(this,i,this.getOutParameters());}function a1(j,G1){if(!j||G1.length===0){return null;}var H1={};for(var i=0;i<G1.length;i++){var I1=G1[i];var J1=I1.getHelpPath();var K1=I1.getFieldPath();if(J1&&K1){for(var L1 in j){if(J1===L1){H1[K1]=j[L1];break;}}}else if(!J1&&K1&&I1.getFixedValue){H1[K1]=I1.getFixedValue();}}return H1;}function b1(i,j){return d1.call(this,i,this.getInParameters(),false,undefined,undefined,false,j);}function c1(i,j,G1){return d1.call(this,i,this.getOutParameters(),j,undefined,undefined,false,G1);}function d1(G1,H1,I1,J1,K1,L1,M1){var N1;var O1;var P1;var Q1;var i=0;var R1;if(H1.length>0){if(!G1){if(!I1){var S1=this.getBindingContext();for(i=0;i<H1.length;i++){O1=H1[i];P1=M1?"conditions/"+O1.getHelpPath():O1.getHelpPath();var T1=O1.getValue();var U1=O1.getUseConditions();var V1=O1.getInitialValueFilterEmpty();var j=0;if(J1||K1){var W1=O1.getBinding("value");var X1=false;if(W1||U1){Q1=O1.getFieldPath();for(j=0;j<J1.length;j++){if((W1&&W1.getPath()===J1[j].getPath())||(U1&&J1[j].getPath()==="/"+Q1)){T1=J1[j].getValue();X1=true;break;}}if(!X1&&!U1&&K1&&W1&&W1.isRelative()&&(!W1.getContext()||(W1.getContext()!==K1&&W1.getContext()===S1))){T1=K1.getProperty(W1.getPath());}}}if(P1){if(!N1){N1={};}if(L1){N1[P1]=[];if(U1){for(j=0;j<T1.length;j++){R1=m({},T1[j]);if(R1.inParameters){R1.inParameters=b1.call(this,R1.inParameters,true);}if(R1.outParameters){R1.outParameters=c1.call(this,R1.outParameters,false,true);}N1[P1].push(R1);}}else{if(!T1&&V1){R1=C.createCondition("Empty",[]);R1.isEmpty=false;}else if(T1){R1=C.createItemCondition(T1);R1.validated=b.Validated;}if(R1){N1[P1].push(R1);}}R1=undefined;}else{if(U1){if(T1&&T1.length>0){N1[P1]=T1[0].values[0];}}else{N1[P1]=T1;}}}}}}else{for(var Y1 in G1){for(i=0;i<H1.length;i++){O1=H1[i];P1=M1?"conditions/"+O1.getHelpPath():O1.getHelpPath();Q1=O1.getFieldPath();if(Q1&&(Q1===Y1||Q1==="conditions/"+Y1)&&P1){if(!N1){N1={};}if(L1){N1[P1]=[];R1=C.createItemCondition(G1[Y1]);R1.validated=b.Validated;N1[P1].push(R1);}else{N1[P1]=G1[Y1];}}}}}if(L1){var Z1=this._getTypesForConditions(N1);var $1=c.createFilters(N1,Z1);N1=$1;}}return N1;}function e1(i){if(i){if(!this._iFilterTimer){this._iFilterTimer=setTimeout(function(){this._iFilterTimer=undefined;e1.call(this);}.bind(this),0);}return;}else if(this._iFilterTimer){clearTimeout(this._iFilterTimer);this._iFilterTimer=undefined;}if((!this.isOpen()&&!this._bNavigateRunning&&!this._bOpen)||(this._bClosing&&!this._bSwitchToDialog)||!this._bApplyFilter){this._bPendingFilterUpdate=true;return;}if(this._bFilterWaitingForBinding){return;}var j=this.getInParameters();var G1=y.call(this,j,false);var H1=A.call(this,G1);if(H1 instanceof Promise){H1.then(function(){this._bFilterWaitingForBinding=false;e1.call(this,true);}.bind(this));this._bFilterWaitingForBinding=true;return;}var I1=this.getAggregation("_dialog");var J1=(!I1||!I1.isOpen())&&!(this._bClosing&&this._bSwitchToDialog);var K1=F1.call(this,J1);if(K1){var L1=this._getFilterBar();var M1;if(L1){M1=L1.getInternalConditions();}else{M1=this._oConditions;}var N1=this._getTypesForConditions(M1);var O1=c.createFilters(M1,N1,undefined,this.getCaseSensitive());var P1=[];var Q1=M1["$search"];var R1;if(O1){P1.push(O1);}if(Q1&&Q1.length>0){R1=Q1[0].values[0];}K1.applyFilters(P1,R1,L1);}}u.prototype._getTypesForConditions=function(j){var G1=this.getFilterBar();var H1=this.getInParameters();var I1;var J1;if(G1){I1=c.createConditionTypesMapFromFilterBar(j,G1);}else{I1={};for(J1 in j){I1[J1]={type:null};}}for(J1 in I1){if(!I1[J1].type){for(var i=0;i<H1.length;i++){var K1=H1[i];if(K1.getHelpPath()===J1){I1[J1].type=K1.getDataType();break;}}}}return I1;};u.prototype.getMaxConditions=function(){if(this._oField&&this._oField.getMaxConditionsForHelp){return this._oField.getMaxConditionsForHelp();}else if(this._oField&&this._oField.getMaxConditions){return this._oField.getMaxConditions();}else{return 1;}};u.prototype.getDisplay=function(){if(this._oField&&this._oField.getDisplay){return this._oField.getDisplay();}};u.prototype.getRequired=function(){if(this._oField&&this._oField.getRequired){return this._oField.getRequired();}else{return false;}};u.prototype.getDataType=function(){if(this._oField.getDataType){return this._oField.getDataType();}else{return"sap.ui.model.type.String";}};u.prototype._getFormatOptions=function(){if(this._oField&&this._oField._getFormatOptions){return this._oField._getFormatOptions();}else{return{};}};u.prototype._getKeyPath=function(){var i=this.getKeyPath();if(!i&&this._oField&&this._oField.getFieldPath&&this._oField.getFieldPath()){i=this._oField.getFieldPath();}return i;};u.prototype._getFilterBar=function(){var i=this.getFilterBar();if(!i){i=this.getAggregation("_filterBar");}return i;};u.prototype.clone=function(j,G1){var H1=[this.getContent(),this.getSuggestContent(),this.getDialogContent()];var I1=this.getFilterBar();var i=0;var J1;for(i=0;i<H1.length;i++){J1=H1[i];if(J1){J1.detachEvent("navigate",x,this);J1.detachEvent("selectionChange",G,this);J1.detachEvent("dataUpdate",H,this);}}if(I1){I1.detachEvent("search",t1,this);}var K1=F.prototype.clone.apply(this,arguments);for(i=0;i<H1.length;i++){J1=H1[i];if(J1){J1.attachEvent("navigate",x,this);J1.attachEvent("selectionChange",G,this);J1.attachEvent("dataUpdate",H,this);}}if(I1){I1.attachEvent("search",t1,this);}return K1;};function f1(){var i;if((!k||!B||!V||!n||!o||!p||!q||!r||!I)&&!this._bDialogRequested){k=sap.ui.require("sap/m/Dialog");B=sap.ui.require("sap/m/Button");V=sap.ui.require("sap/ui/mdc/field/ValueHelpPanel");n=sap.ui.require("sap/ui/mdc/field/DefineConditionPanel");o=sap.ui.require("sap/ui/model/base/ManagedObjectModel");p=sap.ui.require("sap/ui/mdc/filterbar/vh/FilterBar");q=sap.ui.require("sap/ui/mdc/FilterField");r=sap.ui.require("sap/ui/mdc/filterbar/vh/CollectiveSearchSelect");I=sap.ui.require("sap/ui/core/Item");if(!k||!B||!V||!n||!o||!p||!q||!r||!I){sap.ui.require(["sap/m/Dialog","sap/m/Button","sap/ui/mdc/field/ValueHelpPanel","sap/ui/mdc/field/DefineConditionPanel","sap/ui/model/base/ManagedObjectModel","sap/ui/mdc/filterbar/vh/FilterBar","sap/ui/mdc/FilterField","sap/ui/mdc/filterbar/vh/CollectiveSearchSelect","sap/ui/core/Item"],i1.bind(this));this._bDialogRequested=true;}}if(k&&B&&V&&n&&o&&p&&q&&r&&I&&!this._bDialogRequested){if(!this._oResourceBundle){this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");}var j=new B(this.getId()+"-ok",{text:this._oResourceBundle.getText("valuehelp.OK"),enabled:"{$help>/_enableOK}",type:s.Emphasized,press:n1.bind(this)});var G1=new B(this.getId()+"-cancel",{text:this._oResourceBundle.getText("valuehelp.CANCEL"),press:o1.bind(this)});this._oManagedObjectModel=new o(this);var H1=j1.call(this);i=new k(this.getId()+"-dialog",{contentHeight:g1(),contentWidth:h1(),horizontalScrolling:false,verticalScrolling:false,title:"{$help>/title}",stretch:D.system.phone,resizable:true,draggable:true,content:[H1],afterOpen:p1.bind(this),afterClose:q1.bind(this),buttons:[j,G1]}).setModel(this._oManagedObjectModel,"$help");i.isPopupAdaptationAllowed=function(){return false;};i.addStyleClass("sapMdcValueHelpTitle");this.setAggregation("_dialog",i,true);this.setModel(new R({bundleName:"sap/ui/mdc/messagebundle",async:false}),"$i18n");r1.call(this,this.getShowConditionPanel());}return i;}function g1(){if(D.system.desktop){return"700px";}if(D.system.tablet){return D.orientation.landscape?"600px":"600px";}}function h1(){if(D.system.desktop){return"1080px";}if(D.system.tablet){return D.orientation.landscape?"920px":"600px";}}function i1(i,j,G1,H1,I1,J1,K1,L1,M1){k=i;B=j;V=G1;n=H1;o=I1;p=J1;q=K1;r=L1;I=M1;this._bDialogRequested=false;if(!this._bIsBeingDestroyed){f1.call(this);if(this._bOpen){this.open();}}}function j1(){var i=F1.call(this,false);var j=this._getFilterBar();var G1=new V(this.getId()+"-VHP",{height:"100%",showFilterbar:!!j,formatOptions:this._getFormatOptions(),inputOK:"{$help>/_enableOK}"});G1.setModel(this._oManagedObjectModel,"$help");if(i){i.initialize(false);k1.call(this,G1,i.getDialogContent());}if(j){G1.setFilterbar(j);}return G1;}function k1(i,j){i.setTable(j);}function l1(i,j,G1){var H1=this.getAggregation("_popover");var I1=this.getAggregation("_dialog");if(i==="remove"){j.detachEvent("navigate",x,this);j.detachEvent("selectionChange",G,this);j.detachEvent("dataUpdate",H,this);j=undefined;}else{j.attachEvent("navigate",x,this);j.attachEvent("selectionChange",G,this);j.attachEvent("dataUpdate",H,this);L.call(this);}this.fireDataUpdate();if(this._bNavigate){this.navigate(this._iStep);}else if(H1){H1.invalidate();var J1=this.getFilterValue();if(J1){P.call(this,J1);}Y.call(this);if(j&&this._bOpenIfContent){j.initialize(true);var K1=this._getField();if(K1){j.fieldHelpOpen(true);H1.openBy(this._getControlForSuggestion());}this._bOpenIfContent=false;}}else if(j&&this._bOpenIfContent){this._bOpenIfContent=false;this.open(true);}if(I1&&G1!=="suggestContent"&&!(G1==="content"&&this.getDialogContent())){if(j){j.initialize(false);var L1=I1.getContent()[0];L1.setShowTokenizer(this.getMaxConditions()!==1);k1.call(this,L1,j.getDialogContent());if(I1.isOpen()||this._bOpen){j.fieldHelpOpen(false);}}}}function m1(){var i=this.getAggregation("_dialog");if(!i){i=f1.call(this);}return i;}function n1(i){this.close();var j=this.getConditions();j=C._removeEmptyConditions(j);j=C._removeInitialFlags(j);a.updateConditionsValues(j);this.setProperty("conditions",j,true);this._bOK=true;}function o1(i){this.close();this.setProperty("conditions",this._aOldConditions,true);}function p1(i){this._bSwitchToDialog=false;}function q1(i){this._bDialogOpen=false;this._aOldConditions=undefined;this._handleAfterClose(i);if(this._bOK){var j=this.getConditions();this.fireSelect({conditions:j,add:false,close:true});}this._bOK=undefined;this.setProperty("_enableOK",true,true);}function r1(i){var j=this.getAggregation("_dialog");if(j&&this._oField){var G1=j.getContent()[0];if(i){if(!G1._oDefineConditionPanel){var H1=new n(this.getId()+"-DCP",{label:"{$help>/title}"});G1.setDefineConditions(H1);}}else{G1.setDefineConditions();}}}function s1(i,j,G1){if(i==="remove"){j.detachEvent("search",t1,this);if(!G1){var H1=j.getBasicSearchField();if(H1&&H1._bCreadedByFVH){j.setBasicSearchField();}if(j.getCollectiveSearch&&j.getCollectiveSearch()){j.setCollectiveSearch();}}j=undefined;}else{j.attachEvent("search",t1,this);E1.call(this,false);}var I1=this.getAggregation("_dialog");if(I1){var J1=I1.getContent()[0];J1.setFilterbar(j);J1.setShowFilterbar(!!j);if(this.isOpen()){u1.call(this);if(!G1||i==="remove"){y1.call(this,i==="remove");}}}}function t1(i){var j=this._getFilterBar();if(j){var G1=this.getFilterFields();if(G1&&!this._bUpdateFilterAfterClose){var H1=v1.call(this,G1);var I1=H1.length>0?H1[0].values[0]:"";if(I1!==this.getFilterValue()){this.setProperty("filterValue",I1,true);}}if(this._bApplyFilter||(!this._bApplyFilter&&(i||j.getLiveMode()))){this._bApplyFilter=true;e1.call(this,true);}}}function u1(){var i=this._getFilterBar();if(i){i.setInternalConditions({});}P.call(this,this.getFilterValue());Y.call(this);}function v1(i){var j=this._getFilterBar();var G1;if(j){G1=j.getInternalConditions();}else{G1=this._oConditions;}return G1[i]||[];}function w1(i,j){var G1=this._getFilterBar();var H1;if(G1){H1=G1.getInternalConditions();}else{H1=this._oConditions;}if(!H1[i]){H1[i]=[];}H1[i].push(j);if(G1){G1.setInternalConditions(H1);}}function x1(i){var j=this._getFilterBar();var G1;if(j){G1=j.getInternalConditions();}else{G1=this._oConditions;}if(G1[i]&&G1[i].length>0){G1[i]=[];}if(j){G1=j.setInternalConditions(G1);}}function y1(i){if(i){if(!this._iSearchFieldTimer){this._iSearchFieldTimer=setTimeout(function(){this._iSearchFieldTimer=undefined;y1.call(this,false);}.bind(this),0);}return;}else if(this._iSearchFieldTimer){clearTimeout(this._iSearchFieldTimer);this._iSearchFieldTimer=null;}var j=this.getFilterFields();var G1=F1.call(this,false);if(j&&G1){var H1=this._getFilterBar();if(!H1){H1=new p(this.getId()+"-FB",{liveMode:!G1.isSuspended(),showGoButton:false});H1.setInternalConditions(this._oConditions);this._oConditions={};this.setAggregation("_filterBar",H1,true);}if(!H1.getBasicSearchField()){if(!this._oSearchField){this._oSearchField=new q(this.getId()+"-search",{conditions:"{$filters>/conditions/"+j+"}",placeholder:"{$i18n>filterbar.SEARCH}",label:"{$i18n>filterbar.SEARCH}",maxConditions:1,width:"50%"});this._oSearchField._bCreadedByFVH=true;}else{this._oSearchField.setConditions([]);}H1.setBasicSearchField(this._oSearchField);}}if(this._oSearchField&&!this._oSearchField.getParent()){this._oSearchField.destroy();delete this._oSearchField;}}function z1(){var i=F1.call(this,true);if(i){return i.getSuggestionContent();}}function A1(){var i=this._oField?this._oField.getBindingContext():null;this.setBindingContext(i);var j=this._getFormatOptions();if(j.conditionModel&&this.getModel(j.conditionModelName)!==j.conditionModel){this.setModel(j.conditionModel,j.conditionModelName);}}function B1(){if(!this._oResourceBundleM){this._oResourceBundleM=sap.ui.getCore().getLibraryResourceBundle("sap.m");}return this._oResourceBundleM;}u.prototype.getScrollDelegate=function(){var i=this.getAggregation("_dialog");if(i&&(i.isOpen()||i.oPopup.getOpenState()===t.OPENING)){var j=F1.call(this,false);var G1=j&&j.getDialogContent();if(G1&&G1.getScrollDelegate){return G1.getScrollDelegate();}else{return undefined;}}else{return F.prototype.getScrollDelegate.apply(this,arguments);}};u.prototype._fireOpen=function(i){if(!this._bOpenHandled){return F.prototype._fireOpen.apply(this,arguments);}return true;};u.prototype.getRoleDescription=function(i){if(!i||i===1){return null;}else if(!F1.call(this,false)&&this.getShowConditionPanel()&&!this.getNoDialog()){return null;}else{var j=B1.apply(this);return j.getText("MULTICOMBOBOX_ARIA_ROLE_DESCRIPTION");}};u.prototype.getAriaHasPopup=function(){if(this.getNoDialog()){return"listbox";}else if(this.getShowConditionPanel()){return"dialog";}else{return"listbox";}};u.prototype.getValueHelpEnabled=function(){if(this.getNoDialog()){return false;}else{return true;}};u.prototype._getContenRequestProperties=function(i){var j={};var G1=this.getCollectiveSearchItems();if(G1.length>0){var H1=this.getAggregation("_dialog");if(H1&&H1.isOpen()&&this._oCollectiveSearchSelect){var I1=this._oCollectiveSearchSelect.getSelectedItemKey();j.collectiveSearchKey=I1;}else{j.collectiveSearchKey=G1[0].getKey();}}return j;};function C1(){if(!this._oCollectiveSearchSelect){var i=new I(this.getId()+"-collSearchItem",{key:"{$help>key}",text:"{$help>text}",enabled:"{$help>enabled}",textDirection:"{$help>textDirection}"});this._oCollectiveSearchSelect=new r(this.getId()+"-collSearch",{title:"{$i18n>COL_SEARCH_SEL_TITLE}",items:{path:"$help>/collectiveSearchItems",template:i},select:D1.bind(this)}).setModel(this._oManagedObjectModel,"$help");}return this._oCollectiveSearchSelect;}function D1(i){var j=function(){e1.call(this,true);}.bind(this);this.setProperty("filterValue","",true);var G1=this._callContentRequest(false,j);if(G1){j();}}function E1(i){var j=this.getAggregation("_dialog");var G1=this._getFilterBar();if(j&&G1){var H1=this.getCollectiveSearchItems();if(H1.length<=1){if(G1.getCollectiveSearch&&G1.getCollectiveSearch()){G1.setCollectiveSearch();}}else{if(G1.getCollectiveSearch&&!G1.getCollectiveSearch()){G1.setCollectiveSearch(C1.call(this));}if(i&&this._oCollectiveSearchSelect){this._oCollectiveSearchSelect.setSelectedItemKey(H1[0].getKey());}}}}function F1(i){var j;if(i){j=this.getSuggestContent();}else{j=this.getDialogContent();}if(!j){j=this.getContent();}return j;}return u;});