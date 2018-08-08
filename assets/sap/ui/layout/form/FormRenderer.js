/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/layout/library'],function(q,l){"use strict";var F={};F.render=function(r,f){var a=r;var L=f.getLayout();var A={role:"form"};a.write("<div");a.writeControlData(f);a.addClass("sapUiForm");a.addClass("sapUiFormLblColon");a.writeAttribute("data-sap-ui-customfastnavgroup","true");var c=l.form.FormHelper.addFormClass();if(c){a.addClass(c);}if(f.getEditable()){a.addClass("sapUiFormEdit");a.addClass("sapUiFormEdit-CTX");}else{A.readonly="";}if(f.getWidth()){a.addStyle("width",f.getWidth());}if(f.getTooltip_AsString()){a.writeAttributeEscaped('title',f.getTooltip_AsString());}a.writeClasses();a.writeStyles();var t=f.getTitle();var T=f.getToolbar();if(T){if(!f.getAriaLabelledBy()||f.getAriaLabelledBy().length==0){A["labelledby"]=T.getId();}}else if(t){var i="";if(typeof t=="string"){i=f.getId()+"--title";}else{i=t.getId();}A["labelledby"]={value:i,append:true};}a.writeAccessibilityState(f,A);a.write(">");if(L){a.renderControl(L);}else{q.sap.log.warning("Form \""+f.getId()+"\" - Layout missing!","Renderer","Form");}a.write("</div>");};return F;},true);
