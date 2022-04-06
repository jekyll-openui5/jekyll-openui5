/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/support/techinfo/moduleTreeHelper","sap/ui/Device","sap/ui/Global","sap/ui/VersionInfo","sap/ui/core/format/DateFormat","sap/ui/model/resource/ResourceModel","sap/ui/model/json/JSONModel","sap/ui/thirdparty/URI","sap/m/MessageBox","sap/m/MessageToast","sap/ui/core/support/Support","sap/ui/model/ValidateException","sap/m/library","sap/ui/util/Storage","sap/ui/core/syncStyleClass","sap/base/Log","sap/ui/core/Fragment","sap/ui/thirdparty/jquery"],function(m,D,G,V,a,R,J,U,M,b,S,c,d,e,s,L,F,q){"use strict";return{_MIN_UI5VERSION_SUPPORT_ASSISTANT:"1.47",_MIN_EXPAND_LEVEL_DEBUG_MODULES:3,_SUPPORT_ASSISTANT_POPOVER_ID:"technicalInfoDialogAssistantPopover",_DEBUG_MODULES_ID:"TechnicalInfoDialogDebugModules",_TECHNICAL_INFO_DIALOG_ID:"technicalInfoDialog",_LOCAL_STORAGE_KEYS:{STANDARD_URL:"sap-ui-standard-bootstrap-URL",CUSTOM_URL:"sap-ui-custom-bootstrap-URL",LOCATION:"sap-ui-selected-location",OPEN_IN_NEW_WINDOW:"sap-ui-open-sa-in-new-window"},_storage:new e(e.Type.local),_treeHelper:m,open:function(C){if(this._pOpenDialog){return;}this._oModuleSystemInfo=C()||{};this._loadAndInitialize().then(function(){this._oDialog.open();this._bIsBeingClosed=false;}.bind(this));},close:function(){if(!this._pDestroyDialog){this._bIsBeingClosed=true;this._pDestroyDialog=Promise.all([Promise.resolve(this._pAssistantPopover).then(function(){if(this._oAssistantPopover){this._oAssistantPopover.destroy();this._oAssistantPopover=null;}this._pAssistantPopover=null;}.bind(this)),Promise.resolve(this._pDebugPopover).then(function(){if(this._oDebugPopover){this._oDebugPopover.destroy();this._oDebugPopover=null;}this._pDebugPopover=null;}.bind(this))]).then(function(){this._oDialog.close();this._oDialog.destroy();this._oDialog=null;this._pOpenDialog=null;this._pDestroyDialog=null;}.bind(this));}return this._pDestroyDialog;},onShowHelp:function(){d.URLHelper.redirect("https://ui5.sap.com/#/topic/616a3ef07f554e20a3adf749c11f64e9.html#loio616a3ef07f554e20a3adf749c11f64e9",true);},onShowVersion:function(){d.URLHelper.redirect(sap.ui.resource("","sap-ui-version.json"),true);},onCopyTechnicalInfoToClipboard:function(){var o=this._oDialog.getModel("view"),v=o.getProperty("/ProductName")+": "+o.getProperty("/ProductVersion")+" "+this._getControl("versionBuiltAt",this._TECHNICAL_INFO_DIALOG_ID).getText(),f="OpenUI5 Version: "+o.getProperty("/OpenUI5ProductVersion")+" "+this._getControl("versionOpenUI5BuiltAt",this._TECHNICAL_INFO_DIALOG_ID).getText(),g=v+"\r\n"+(o.getProperty("/OpenUI5ProductVersion")?f+"\r\n":"")+this._getText("TechInfo.UserAgent.Label")+": "+o.getProperty("/UserAgent")+"\r\n"+this._getText("TechInfo.AppUrl.Label")+": "+o.getProperty("/ApplicationURL")+"\r\n";this._copyToClipboard(g,"TechInfo.CopyToClipboard");},onConfigureDebugModulesCopyToClipboard:function(){var o=this._oDialog.getModel("view"),t=o.getProperty("/DebugModules")[0],f="sap-ui-debug="+this._treeHelper.toDebugInfo(t);this._copyToClipboard(f,"TechInfo.DebugModulesCopyToClipboard");},onDebugSources:function(E){var f=E.getParameter("selected");this._confirmReload(function(){this._reloadWithParameter("sap-ui-debug",f);}.bind(this),function(){var o=this._oDialog.getModel("view");o.setProperty("/DebugMode",!o.getProperty("/DebugMode"));}.bind(this));},onConfigureDebugModules:function(){var o=this._oDialog.getModel("view"),t;if(this._oDebugPopover&&this._oDebugPopover.isOpen()){return;}t=this._treeHelper.toTreeModel(this._oModuleSystemInfo);o.setProperty("/DebugModules",[t.tree]);this._updateTreeInfos();this._loadDebugPopover().then(function(){if(this._bIsBeingClosed){return;}var C=this._getControl("customDebugValue",this._DEBUG_MODULES_ID);try{this._validateCustomDebugValue(C.getValue());}catch(E){this._showError(C,E.message);return;}this._getControl("tree",this._DEBUG_MODULES_ID).expandToLevel(Math.max(this._MIN_EXPAND_LEVEL_DEBUG_MODULES,t.depth));this._oDebugPopover.open();}.bind(this));},onConfigureDebugModulesConfirm:function(){this._confirmReload(function(){var o=this._oDialog.getModel("view");this._reloadWithParameter("sap-ui-debug",o.getProperty("/CustomDebugMode"));}.bind(this));},onConfigureDebugModulesClose:function(){this.onConfigureDebugModulesReset();this._oDebugPopover.close();},onConfigureDebugModuleSelect:function(E){var o=this._oDialog.getModel("view"),l=E.getParameter("listItem"),C=l.getItemNodeContext(),n=C.context.getPath(),f=o.getProperty(n),g=this._getControl("customDebugValue",this._DEBUG_MODULES_ID);this._resetValueState(g);this._treeHelper.recursiveSelect(f,l.getSelected());this._updateTreeInfos();},onChangeCustomDebugMode:function(){var o=this._oDialog.getModel("view"),C=this._getControl("customDebugValue",this._DEBUG_MODULES_ID),t;try{this._validateCustomDebugValue(C.getValue());}catch(E){this._showError(C,E.message);return;}if(o.getProperty("/CustomDebugMode")==="true"){o.setProperty("/CustomDebugMode",true);}if(o.getProperty("/CustomDebugMode")==="false"){o.setProperty("/CustomDebugMode",false);}window["sap-ui-debug"]=o.getProperty("/CustomDebugMode");t=this._treeHelper.toTreeModel(this._oModuleSystemInfo);o.setProperty("/DebugModules",[t.tree]);this._getControl("tree",this._DEBUG_MODULES_ID).expandToLevel(Math.max(this._MIN_EXPAND_LEVEL_DEBUG_MODULES,t.depth));this._updateTreeInfos();},onConfigureDebugModulesReset:function(){var o=this._oDialog.getModel("view"),t=o.getProperty("/DebugModules")[0];this._treeHelper.recursiveSelect(t,false);this._updateTreeInfos();},onOpenDiagnostics:function(){var o=S.getStub();if(o.getType()!=S.StubType.APPLICATION){return;}o.openSupportTool();this.close();},onOpenTestRecorderInIFrame:function(){this.close();sap.ui.require(["sap/ui/testrecorder/Bootstrap"],function(B){B.init(["true"]);},function(E){L.error("Could not load module 'sap/ui/testrecorder/Bootstrap'! Details: "+E);});},onOpenAssistant:function(){var o=this._oDialog.getModel("view"),f=o.getProperty("/SelectedLocation"),g=o.getProperty("/StandardBootstrapURL"),C=o.getProperty("/CustomBootstrapURL"),h=[],B;o.getProperty("/SupportAssistantPopoverURLs").forEach(function(i){h.push(i.Value);});if(h.indexOf(g)===-1&&f==="standard"){f="custom";C=g;o.setProperty("/SelectedLocation",f);this._storage.put(this._LOCAL_STORAGE_KEYS.STANDARD_URL,h[0]);o.setProperty("/StandardBootstrapURL",this._storage.get(this._LOCAL_STORAGE_KEYS.STANDARD_URL));}if(f==="standard"){B=g;}else if(C){if(!C.match(/\/$/)){C+="/";}this._storage.put(this._LOCAL_STORAGE_KEYS.CUSTOM_URL,C);o.setProperty("/CustomBootstrapURL",this._storage.get(this._LOCAL_STORAGE_KEYS.CUSTOM_URL));B=C;}this._startAssistant(B);},onSelectBootstrapOption:function(E){var k=E.getSource().getId().split("--").pop();this._setActiveLocations(k);},onChangeStandardBootstrapURL:function(E){var v=E.getParameter("selectedItem").getKey(),C=E.getSource();this._storage.put(this._LOCAL_STORAGE_KEYS.STANDARD_URL,v);this._resetValueState(C);this._pingUrl(v,C).then(function f(){C.setValueState("Success");},function g(){var f=this._getText("TechInfo.SupportAssistantConfigPopup.NotAvailableAtTheMoment");this._showError(C,f);L.error("Support Assistant could not be loaded from the URL you entered");});},onLiveChangeCustomBootstrapURL:function(E){var v=E.getParameter("value"),C=E.getSource();this._storage.put(this._LOCAL_STORAGE_KEYS.CUSTOM_URL,v);try{this._validateValue(C.getValue());this._resetValueState(C);}catch(o){this._showError(C,o.message);}},onChangeOpenInNewWindow:function(E){var f=E.getParameter("selected");this._storage.put(this._LOCAL_STORAGE_KEYS.OPEN_IN_NEW_WINDOW,f);},onConfigureAssistantBootstrap:function(E){if(this._oAssistantPopover&&this._oAssistantPopover.isOpen()){return;}this._loadAssistantPopover().then(function(){if(this._bIsBeingClosed){return;}var C=this._getControl("standardBootstrapURL",this._SUPPORT_ASSISTANT_POPOVER_ID).getItems()[0];if(this._isVersionBiggerThanMinSupported()){var A=sap.ui.getCore().getConfiguration().getVersion().toString();C.setText(C.getText().replace("[[version]]",A));C.setEnabled(true);}else{C.setText(C.getText().replace("[[version]]","not supported"));C.setEnabled(false);}var o=this._oDialog.getModel("view"),f=o.getProperty("/SelectedLocation");this._setActiveLocations(f);var g=this._getControl("supportAssistantSettingsButton",this._TECHNICAL_INFO_DIALOG_ID);this._oAssistantPopover.openBy(g);}.bind(this));},_getText:function(k,p){return sap.ui.getCore().getLibraryResourceBundle().getText(k,p);},_validateValue:function(v){var r=/^https?:\/\/(www\.)?([-a-zA-Z0-9.%_+~#=]{2,})([-a-zA-Z0-9@:%_+.~#?&/=]*)\/sap\/ui\/support\/?$/,A=window.location.protocol;if(v&&!v.match(r)){throw new c(this._getText("TechInfo.SupportAssistantConfigPopup.URLValidationMessage"));}if(v&&A==="https:"&&!v.match(A)){throw new c(this._getText("TechInfo.SupportAssistantConfigPopup.ProtocolError"));}return true;},_validateCustomDebugValue:function(v){var r=/^(true|false|x|X)$|^(([a-zA-Z*[\]{}()+?.\\^$|]+\/?)+(,([a-zA-Z*[\]{}()+?.\\^$|]+\/?)+)*)$/;if(v&&!v.match(r)){throw new c(this._getText("TechInfo.DebugModulesConfigPopup.ModeValidationMessage"));}return true;},_convertBuildDate:function(f){var o=a.getInstance({pattern:"yyyyMMdd-HHmmss"});return o.parse(f);},_getContentDensityClass:function(){if(!this._sContentDensityClass){if(!D.support.touch){this._sContentDensityClass="sapUiSizeCompact";}else{this._sContentDensityClass="sapUiSizeCozy";}}return this._sContentDensityClass;},_startAssistant:function(B){var o=this._oDialog.getModel("view"),f={support:"true",window:o.getProperty("/OpenSupportAssistantInNewWindow")};this._loadAssistant(B,f);},_loadAssistant:function(u,o){this._pingUrl(u).then(function g(){this.close();var f=[o.support];sap.ui.getCore().loadLibrary("sap.ui.support",{async:true,url:u}).then(function(){if(o.window){f.push("window");}if(f[0].toLowerCase()==="true"||f[0].toLowerCase()==="silent"){sap.ui.require(["sap/ui/support/Bootstrap"],function(B){B.initSupportRules(f);});}});},function h(j,f){var g=this._getText("TechInfo.SupportAssistantConfigPopup.SupportAssistantNotFound");if(j.status===0){g+=this._getText("TechInfo.SupportAssistantConfigPopup.ErrorTryingToGetRecourse");}else if(j.status===404){g+=this._getText("TechInfo.SupportAssistantConfigPopup.ErrorNotFound");}else if(j.status===500){g+=this._getText("TechInfo.SupportAssistantConfigPopup.InternalServerError");}else if(f==='parsererror'){g+=this._getText("TechInfo.SupportAssistantConfigPopup.ErrorOnJsonParse");}else if(f==='timeout'){g+=this._getText("TechInfo.SupportAssistantConfigPopup.ErrorOnTimeout");}else if(f==='abort'){g+=this._getText("TechInfo.SupportAssistantConfigPopup.ErrorWhenAborted");}else{g+=this._getText("TechInfo.SupportAssistantConfigPopup.UncaughtError")+j.responseText;}this._sErrorMessage=g;this.onConfigureAssistantBootstrap();L.error("Support Assistant could not be loaded from the URL you entered");});},_loadAndInitialize:function(){this._pOpenDialog=Promise.all([sap.ui.getCore().loadLibraries(["sap.ui.core","sap.ui.layout","sap.m"]),this._loadVersionInfo(),this._pDestroyDialog]).then(function(){return F.load({id:this._TECHNICAL_INFO_DIALOG_ID,name:"sap.ui.core.support.techinfo.TechnicalInfo",controller:this});}.bind(this)).then(function(o){this._oDialog=o;return this._initialize();}.bind(this)).then(function(){this._oDialog.open();this._bIsBeingClosed=false;}.bind(this));return this._pOpenDialog;},_initialize:function(){var i=new R({bundleName:"sap.ui.core.messagebundle"});this._oDialog.setModel(i,"i18n");this._oDialog.setModel(this._createViewModel(),"view");this._oDialog.addStyleClass(this._getContentDensityClass());},_loadVersionInfo:function(){return V.load().catch(function(f){L.error("failed to load global version info",f);return{name:"",version:""};}).then(function(v){this._oVersionInfo=v;}.bind(this));},_createViewModel:function(){var f=new U(sap.ui.require.toUrl(""),window.location.origin+window.location.pathname)+"/sap/ui/support/",g="standard",h=false;this._saveLocalStorageDefault(this._LOCAL_STORAGE_KEYS.STANDARD_URL,f);this._saveLocalStorageDefault(this._LOCAL_STORAGE_KEYS.LOCATION,g);this._saveLocalStorageDefault(this._LOCAL_STORAGE_KEYS.OPEN_IN_NEW_WINDOW,h);var v=new J({"ProductName":"SAPUI5","StandardBootstrapURL":this._storage.get(this._LOCAL_STORAGE_KEYS.STANDARD_URL),"CustomBootstrapURL":this._storage.get(this._LOCAL_STORAGE_KEYS.CUSTOM_URL),"OpenSupportAssistantInNewWindow":this._storage.get(this._LOCAL_STORAGE_KEYS.OPEN_IN_NEW_WINDOW),"SelectedLocation":this._storage.get(this._LOCAL_STORAGE_KEYS.LOCATION),"OpenUI5ProductVersion":null,"OpenUI5ProductTimestamp":null,"DebugModuleSelectionCount":0});v.setProperty("/ProductName",this._oVersionInfo.name);v.setProperty("/ProductVersion",this._oVersionInfo.version);try{v.setProperty("/ProductTimestamp",this._generateLocalizedBuildDate(this._oVersionInfo.buildTimestamp));}catch(E){L.error("failed to parse build timestamp from global version info");}if(!/openui5/i.test(this._oVersionInfo.name)){v.setProperty("/OpenUI5ProductVersion",G.version);try{v.setProperty("/OpenUI5ProductTimestamp",this._generateLocalizedBuildDate(G.buildinfo.buildtime));}catch(E){L.error("failed to parse OpenUI5 build timestamp from global version info");}}var A;try{A=this._getText("TechInfo.SupportAssistantConfigPopup.AppVersionOption",this._oVersionInfo.version);}catch(E){A="Application";}var i=[{"DisplayName":A,"Value":f},{"DisplayName":"OpenUI5 CDN","Value":"https://openui5.hana.ondemand.com/resources/sap/ui/support/"},{"DisplayName":"OpenUI5 (Nightly)","Value":"https://openui5nightly.hana.ondemand.com/resources/sap/ui/support/"},{"DisplayName":"OpenUI5 (Beta)","Value":"https://openui5beta.hana.ondemand.com/resources/sap/ui/support/"},{"DisplayName":"SAPUI5 CDN","Value":"https://sapui5.hana.ondemand.com/resources/sap/ui/support/"}];var j=this._getText("TechInfo.DebugModulesConfigPopup.SelectionCounter",v.DebugModuleSelectionCount);v.setProperty("/DebugModulesTitle",j);v.setProperty("/SupportAssistantPopoverURLs",i);v.setProperty("/ApplicationURL",document.location.href);v.setProperty("/UserAgent",navigator.userAgent);v.setProperty("/DebugMode",sap.ui.getCore().getConfiguration().getDebug());if(!this._isVersionBiggerThanMinSupported()){v.setProperty("/StandardBootstrapURL",i[2].Value);this._storage.put(this._LOCAL_STORAGE_KEYS.STANDARD_URL,i[2].Value);}v.setSizeLimit(100000);return v;},_saveLocalStorageDefault:function(p,f){if(!this._storage.get(p)){this._storage.put(p,f);}},_isVersionBiggerThanMinSupported:function(){var v=sap.ui.getCore().getConfiguration().getVersion();if(v&&v.compareTo(this._MIN_UI5VERSION_SUPPORT_ASSISTANT)>=0){return true;}return false;},_generateLocalizedBuildDate:function(B){var o=a.getDateInstance({pattern:"dd.MM.yyyy HH:mm:ss"}),f=o.format(this._convertBuildDate(B));return this._getText("TechInfo.VersionBuildTime.Text",f);},_setActiveLocations:function(v){var o=this._oDialog.getModel("view"),r=this._getControl("standard",this._SUPPORT_ASSISTANT_POPOVER_ID),f=this._getControl("custom",this._SUPPORT_ASSISTANT_POPOVER_ID),C=this._getControl("customBootstrapURL",this._SUPPORT_ASSISTANT_POPOVER_ID),g=this._getControl("standardBootstrapURL",this._SUPPORT_ASSISTANT_POPOVER_ID),h;this._resetValueState(C);this._resetValueState(g);if(v==="standard"){h=true;o.setProperty("/StandardBootstrapURL",this._storage.get(this._LOCAL_STORAGE_KEYS.STANDARD_URL));g.setSelectedKey(o.getProperty("/StandardBootstrapURL"));}else{h=false;}g.setEnabled(h);r.setSelected(h);C.setEnabled(!h);f.setSelected(!h);this._storage.put(this._LOCAL_STORAGE_KEYS.LOCATION,v);o.setProperty("/SelectedLocation",this._storage.get(this._LOCAL_STORAGE_KEYS.LOCATION));},_confirmReload:function(C,f){M.confirm(this._getText("TechInfo.DebugSources.ConfirmMessage"),{title:this._getText("TechInfo.DebugSources.ConfirmTitle"),onClose:function(A){if(A===M.Action.OK){C();}else if(f){f();}}});},_onAssistantPopoverOpened:function(){var o=this._oDialog.getModel("view"),f=o.getProperty("/SelectedLocation"),C;if(f==="custom"){C=this._getControl("customBootstrapURL",this._SUPPORT_ASSISTANT_POPOVER_ID);var v=C.getValue();try{this._validateValue(v);}catch(E){this._showError(C,E.message);if(this._sErrorMessage){this._sErrorMessage=null;}return;}}else{C=this._getControl("standardBootstrapURL",this._SUPPORT_ASSISTANT_POPOVER_ID);}if(this._sErrorMessage){this._showError(C,this._sErrorMessage);this._sErrorMessage=null;}},_showError:function(C,f){C.setValueStateText(f);C.setValueState("Error");C.openValueStateMessage();},_resetValueState:function(C){C.setValueState("None");C.closeValueStateMessage();},_pingUrl:function(u){return q.ajax({type:"HEAD",async:true,context:this,url:u+"Bootstrap.js"});},_getControl:function(C,f){if(f){return sap.ui.getCore().byId(f+"--"+C);}return sap.ui.getCore().byId(C);},_reloadWithParameter:function(p,v){var f=window.location.search,u=p+"="+v;if(f&&f!=="?"){var r=new RegExp("(?:^|\\?|&)"+p+"=[^&]+");if(f.match(r)){f=f.replace(r,u);}else{f+="&"+u;}}else{f="?"+u;}window.location.search=f;},_copyToClipboard:function(f,C){var $=q("<textarea>");try{q("body").append($);$.val(f).trigger("select");document.execCommand("copy");$.remove();b.show(this._getText(C+".Success"));}catch(E){b.show(this._getText(C+".Error"));}},_updateTreeInfos:function(){var o=this._oDialog.getModel("view"),t=o.getProperty("/DebugModules")[0],f;o.setProperty("/CustomDebugMode",this._treeHelper.toDebugInfo(t));o.setProperty("/DebugModuleSelectionCount",this._treeHelper.getSelectionCount(t));f=o.getProperty("/DebugModuleSelectionCount").toString();o.setProperty("/DebugModulesTitle",this._getText("TechInfo.DebugModulesConfigPopup.SelectionCounter",f));},_loadDebugPopover:function(){if(!this._pDebugPopover){this._pDebugPopover=F.load({id:this._DEBUG_MODULES_ID,name:"sap.ui.core.support.techinfo.TechnicalInfoDebugDialog",controller:this}).then(function(o){this._oDebugPopover=o;this._oDialog.addDependent(this._oDebugPopover);s(this._getContentDensityClass(),this._oDialog,this._oDebugPopover);}.bind(this));}return this._pDebugPopover;},_loadAssistantPopover:function(){if(!this._pAssistantPopover){this._pAssistantPopover=F.load({id:this._SUPPORT_ASSISTANT_POPOVER_ID,name:"sap.ui.core.support.techinfo.TechnicalInfoAssistantPopover",controller:this}).then(function(A){this._oAssistantPopover=A;this._oAssistantPopover.attachAfterOpen(this._onAssistantPopoverOpened,this);this._oDialog.addDependent(this._oAssistantPopover);s(this._getContentDensityClass(),this._oDialog,this._oAssistantPopover);var C=this._getControl("customBootstrapURL",this._SUPPORT_ASSISTANT_POPOVER_ID);sap.ui.getCore().getMessageManager().registerObject(C,true);}.bind(this));}return this._pAssistantPopover;}};});
