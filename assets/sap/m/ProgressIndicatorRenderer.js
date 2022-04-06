/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library"],function(c){"use strict";var V=c.ValueState;var P={apiVersion:2};P.render=function(r,C){var p=C.getPercentValue(),w=C.getWidth(),h=C.getHeight(),a=C._getCSSClassByPercentValue(p),t=C.getDisplayValue(),s=C.getShowValue(),S=C.getState(),T=C.getTextDirection().toLowerCase(),b=C.getId(),e=C.getEnabled();r.openStart("div",C);r.class("sapMPI");r.style("width",w);a.forEach(function(d){r.class(d);});r.style("height",h);if(C.getEnabled()){r.attr('tabindex','-1');}else{r.class("sapMPIBarDisabled");}if(C.getDisplayOnly()){r.class("sapMPIDisplayOnly");}r.accessibilityState(C,{role:"progressbar",valuemin:0,valuenow:p,valuemax:100,valuetext:C._getAriaValueText({sText:t,fPercent:p})});if(C.getTooltip_AsString()){r.attr("title",C.getTooltip_AsString());}r.openEnd();r.openStart("div",b+"-bar");r.class("sapMPIBar");if(e){switch(S){case V.Warning:r.class("sapMPIBarCritical");break;case V.Error:r.class("sapMPIBarNegative");break;case V.Success:r.class("sapMPIBarPositive");break;case V.Information:r.class("sapMPIBarInformation");break;default:r.class("sapMPIBarNeutral");break;}}else{r.class("sapMPIBarNeutral");}r.style("flex-basis",p+"%");r.openEnd();P._renderDisplayText(r,T,"Left",b);if(s){r.text(t);}r.close("span");r.close("div");r.openStart("div",b+"-remainingBar");r.class("sapMPIBarRemaining");r.openEnd();P._renderDisplayText(r,T,"Right",b);if(s){r.text(t);}r.close("span");r.close("div");r.close("div");};P._renderDisplayText=function(r,t,T,C){r.openStart("span",C+"-text"+T);r.class("sapMPIText");r.class("sapMPIText"+T);if(t!=="inherit"){r.attr("dir",t);}r.openEnd();};return P;},true);
