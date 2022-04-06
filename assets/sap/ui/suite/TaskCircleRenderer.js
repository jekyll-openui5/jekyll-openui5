/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Core','./library'],function(C,l){"use strict";var T=l.TaskCircleColor;var a=function(){};a.render=function(r,c){var b=r;var m=c.getMinValue();var d=c.getMaxValue();var v=c.getValue();if(m<0){m=0;}if(d<0){d=1;}if(v<0){v=0;}var e=v.toString();var f=c.getColor();var s='sapUiTaskCircleColorGray';switch(f){case T.Red:s='sapUiTaskCircleColorRed';break;case T.Yellow:s='sapUiTaskCircleColorYellow';break;case T.Green:s='sapUiTaskCircleColorGreen';break;case T.Gray:s='sapUiTaskCircleColorGray';break;}if(v<m){m=v;}if(v>d){d=v;}var p=24;if(m>10){p=32;}if(m>100){p=46;}var g=62;var h=parseInt(Math.sqrt((v-m)/(d-m)*(g*g-p*p)+p*p));var i=(v+'').length;var j=h*0.55;if(i>1){j=h/i;}b.write("<div");b.writeControlData(c);b.writeAttribute('tabindex','0');if(c.getTooltip_AsString()){b.writeAttributeEscaped("title",c.getTooltip_AsString());}else{b.writeAttributeEscaped("title",e);}if(sap.ui.getCore().getConfiguration().getAccessibility()){b.writeAttribute('role','progressbar');b.writeAccessibilityState(c,{valuemin:m});b.writeAccessibilityState(c,{valuemax:d});b.writeAccessibilityState(c,{valuenow:v});}b.writeAttribute("class","sapUiTaskCircle "+s);b.addStyle("width",h+"px");b.addStyle("height",h+"px");b.addStyle("line-height",h+"px");b.addStyle("font-size",parseInt(j)+"px");b.addStyle("border-radius",h+"px");b.addStyle("-moz-border-radius",h+"px");b.writeClasses();b.writeStyles();b.write(">");b.write(v);b.write("</div>");};return a;},true);
