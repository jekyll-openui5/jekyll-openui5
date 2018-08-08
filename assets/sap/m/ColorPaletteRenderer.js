/*
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/Device'],function(D){"use strict";var C={};var l=sap.ui.getCore().getLibraryResourceBundle("sap.m");C.render=function(r,c){r.write("<div");r.writeControlData(c);r.addClass("sapMColorPalette");r.writeClasses();r.writeAttribute("tabIndex","0");r.write(">");if(c._getShowDefaultColorButton()){this.renderDefaultColorButton(r,c);this.renderSeparator(r);}this.renderSwatches(r,c);if(c._getShowMoreColorsButton()){this.renderSeparator(r);this.renderMoreColorsButton(r,c);if(D.system.phone){this.renderSeparator(r);}}r.write("</div>");};C.renderSwatches=function(r,c){var s=c.getColors();r.write("<div");r.addClass("sapMColorPaletteContent");r.writeClasses();r.writeAccessibilityState(c,{"role":"region","label":l.getText("COLOR_PALETTE_SWATCH_CONTAINER_TITLE")});r.write(">");s.forEach(function(a,i){this.renderSquare(r,c,a,i);},this);r.write("</div>");};C.renderSquare=function(r,c,s,i){var n=c._ColorsHelper.getNamedColor(s),a=l.getText("COLOR_PALETTE_PREDEFINED_COLOR",[i+1,n||l.getText("COLOR_PALETTE_PREDEFINED_COLOR_CUSTOM")]);r.write("<div");r.addClass("sapMColorPaletteSquare");r.writeClasses();r.writeAttribute("data-sap-ui-color",s);r.writeAttribute("tabindex","-1");r.writeAttribute("title",a);r.writeAccessibilityState(c,{"role":"button","label":a});r.write(">");r.write("<div");r.addStyle("background-color",s);r.writeStyles();r.write("></div>");r.write("</div>");};C.renderSeparator=function(r){r.write("<div");r.addClass("sapMColorPaletteSeparator");r.writeClasses();r.write(">");r.write("<hr/>");r.write("</div>");};C.renderDefaultColorButton=function(r,c){r.renderControl(c._getDefaultColorButton());};C.renderMoreColorsButton=function(r,c){r.renderControl(c._getMoreColorsButton());};return C;},true);