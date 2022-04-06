/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','../base/EventProvider','./Popup','./BusyIndicatorUtils','sap/ui/core/library',"sap/ui/performance/trace/FESR","sap/ui/performance/trace/Interaction","sap/base/Log","sap/base/assert","sap/base/util/now"],function(q,E,P,B,l,F,I,L,a,n){"use strict";var b=l.BusyIndicatorSize;var c=Object.assign(new E(),{oPopup:null,oDomRef:null,bOpenRequested:false,iDEFAULT_DELAY_MS:1000,sDOM_ID:"sapUiBusyIndicator"});c.M_EVENTS={Open:"Open",Close:"Close"};c._bShowIsDelayed=undefined;c._init=function(){var r=document.createElement("div");r.id=this.sDOM_ID;var o=document.createElement("div");this._oResBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core");var t=this._oResBundle.getText("BUSY_TEXT");delete this._oResBundle;o.className="sapUiBusy";o.setAttribute("tabindex","0");o.setAttribute("role","progressbar");o.setAttribute("alt","");o.setAttribute("title",t);r.appendChild(o);var d=B.getElement(b.Large);d.setAttribute("title",t);r.appendChild(d);this.oDomRef=r;this.oPopup=new P(r);this.oPopup.setModal(true,"sapUiBlyBusy");this.oPopup.setShadow(false);this.oPopup.attachOpened(function(e){this._onOpen(e);},this);};c._onOpen=function(e){var d=document.getElementById(c.sDOM_ID);d.style.height="100%";d.style.width="100%";var A=d.querySelector(".sapUiLocalBusyIndicator");A.className+=" sapUiLocalBusyIndicatorFade";if(d){d.focus();}this.fireOpen({$Busy:this.oPopup._$()});};c.show=function(d){L.debug("sap.ui.core.BusyIndicator.show (delay: "+d+") at "+new Date().getTime());a(d===undefined||(typeof d=="number"&&(d%1==0)),"iDelay must be empty or an integer");if(!document.body||!sap.ui.getCore().isInitialized()){if(c._bShowIsDelayed===undefined){sap.ui.getCore().attachInit(function(){if(c._bShowIsDelayed){c.show(d);}});}c._bShowIsDelayed=true;return;}if((d===undefined)||((d!=0)&&(parseInt(d)==0))||(parseInt(d)<0)){d=this.iDEFAULT_DELAY_MS;}if(F.getActive()){this._fDelayedStartTime=n()+d;}if(!this.oDomRef){this._init();}this.bOpenRequested=true;if(d===0){this._showNowIfRequested();}else{setTimeout(this["_showNowIfRequested"].bind(this),d);}};c._showNowIfRequested=function(){L.debug("sap.ui.core.BusyIndicator._showNowIfRequested (bOpenRequested: "+this.bOpenRequested+") at "+new Date().getTime());if(!this.bOpenRequested){return;}var o=(window.scrollX===undefined?window.pageXOffset:window.scrollX);var O=(window.scrollY===undefined?window.pageYOffset:window.scrollY);var s=o+" "+O;this.bOpenRequested=false;this.oPopup.open(0,P.Dock.LeftTop,P.Dock.LeftTop,document,s);};c.hide=function(){L.debug("sap.ui.core.BusyIndicator.hide at "+new Date().getTime());if(this._fDelayedStartTime){var f=n()-this._fDelayedStartTime;I.addBusyDuration((f>0)?f:0);delete this._fDelayedStartTime;}var d=c;if(c._bShowIsDelayed===true){c._bShowIsDelayed=false;}d.bOpenRequested=false;if(d.oDomRef){var A=d.oDomRef.querySelector(".sapUiLocalBusyIndicator");q(A).removeClass("sapUiLocalBusyIndicatorFade");this.fireClose({$Busy:this.oPopup._$()});d.oPopup.close(0);}};c.attachOpen=function(f,o){this.attachEvent(c.M_EVENTS.Open,f,o);return this;};c.detachOpen=function(f,o){this.detachEvent(c.M_EVENTS.Open,f,o);return this;};c.attachClose=function(f,o){this.attachEvent(c.M_EVENTS.Close,f,o);return this;};c.detachClose=function(f,o){this.detachEvent(c.M_EVENTS.Close,f,o);return this;};c.fireOpen=function(p){this.fireEvent(c.M_EVENTS.Open,p);};c.fireClose=function(p){this.fireEvent(c.M_EVENTS.Close,p);};return c;},true);
