/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/base/security/encodeCSS"],function(l,e){"use strict";var A=l.AvatarSize;var a=l.AvatarType;var b={apiVersion:2};b.render=function(r,o){var i=o.getInitials(),s=o._getActualDisplayType(),I=o._getImageFallbackType(),d=o.getDisplaySize(),D=o.getDisplayShape(),c=o.getImageFitType(),C=o.getCustomDisplaySize(),f=o.getCustomFontSize(),S=o.getSrc(),g="sapFAvatar",t=o.getTooltip_AsString(),L=o.getAriaLabelledBy(),h=o.getAriaDescribedBy(),B=o.hasListeners("press")?o._getBadge():null,j=o._getDefaultTooltip();r.openStart("span",o);r.class(g);r.class("sapFAvatarColor"+o._getActualBackgroundColor());r.class(g+d);r.class(g+s);r.class(g+D);if(o.hasListeners("press")){r.class("sapMPointer");r.class(g+"Focusable");r.attr("role","button");r.attr("tabindex",0);}else{r.attr("role","img");}if(o.getShowBorder()){r.class("sapFAvatarBorder");}if(d===A.Custom){r.style("width",C);r.style("height",C);r.style("font-size",f);}if(t){r.attr("title",t);r.attr("aria-label",t);}else if(i){r.attr("aria-label",j+" "+i);}else{r.attr("aria-label",j);}if(L&&L.length>0){r.attr("aria-labelledby",L.join(" "));}if(h&&h.length>0){r.attr("aria-describedby",h.join(" "));}r.openEnd();if(s===a.Icon||I===a.Icon){r.renderControl(o._getIcon().addStyleClass(g+"TypeIcon"));}else if(s===a.Initials||I===a.Initials){r.openStart("span");r.class(g+"InitialsHolder");r.openEnd();r.text(i);r.close("span");}if(s===a.Image){r.openStart("span");r.class(g+"ImageHolder");r.class(g+s+c);r.style("background-image","url('"+e(S)+"')");r.openEnd();r.close("span");}if(B){r.openStart("div");r.class(g+"BadgeIconActiveArea");if(C){r.style("font-size",C);}r.openEnd();r.openStart("span");r.class(g+"BadgeIcon");r.openEnd();r.renderControl(B);r.close("span");r.close("div");}r.close("span");};return b;},true);