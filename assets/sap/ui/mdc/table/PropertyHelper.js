/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../util/PropertyHelper","sap/ui/core/Core","sap/m/table/Util"],function(P,C,T){"use strict";var a=P.extend("sap.ui.mdc.table.PropertyHelper",{constructor:function(p,e,o,E){var A=["filterable","sortable","groupable","key","unit","text","exportSettings","propertyInfos","visualSettings"];P.call(this,p,e,o,A,E);}});function i(o){return!!(o&&o.isA&&o.isA("sap.ui.mdc.table.Column"));}function g(w){if(w.indexOf("em")>0){return Math.round(parseFloat(w));}if(w.indexOf("px")>0){return Math.round(parseInt(w)/16);}return"";}a.prototype.prepareProperty=function(p){P.prototype.prepareProperty.apply(this,arguments);p.isAggregatable=function(){return false;};};a.prototype.getColumnExportSettings=function(o,s){if(!i(o)){return null;}var p=this.getProperty(o.getDataProperty());if(!p){return null;}s=s===true;var d=[];var e;var E=p.getExportSettings();var f;var h=[];var A;var j;var k;var l;if(p.isComplex()){e=p.getReferencedProperties();if(!s&&E){f=c(o,p,E,s);e.forEach(function(p){h.push(p.getPath());});f.property=h;d.push(f);}else{e.forEach(function(p,I){var m=p.getExportSettings(),n=c(o,p,m,s);n.property=p.getPath();if(I>0){n.columnId=o.getId()+"-additionalProperty"+I;}if(m||n.property){d.push(n);}},this);}}else if(!s&&E){f=c(o,p,E,s);f.property=p.getPath();d.push(f);}else{f=c(o,p,E,s);f.property=p.getPath();if(f.property){d.push(f);}A=s&&E&&E.unitProperty?E.unitProperty:null;if(A){j=b(this,A);k=j.getExportSettings();l=c(o,j,k,s);l.property=j.getPath();l.columnId=o.getId()+"-additionalProperty";if(k||l.property){d.push(l);}}}return d;};function b(p,s){var o=p.getProperty(s);if(!o){o=p.getProperties().find(function(o){return s===o.getPath();});}if(o.isComplex()){throw new Error("The 'unitProperty' points to a complex property");}return o;}function c(o,p,e,s){var E=Object.assign({columnId:o.getId(),label:p.getLabel(),width:g(o.getWidth()),textAlign:o.getHAlign(),type:"String"},e);if(s){E.displayUnit=false;}return E;}a.prototype.setColumnWidth=function(m){var p=m.getDataProperty();var o=this.getProperty(p);if(!o){return;}var d=o.getVisualSettings(p);if(d&&d.widthCalculation===null){return;}var w=this._calcColumnWidth(o)+1;m._updateColumnWidth(w+"rem");};a.prototype._calcColumnWidth=function(p,w){var W=0;var l=0;var m=p.getVisualSettings()?p.getVisualSettings().widthCalculation:{};w=Object.assign({minWidth:2,maxWidth:19,defaultWidth:8,gap:0,includeLabel:true,excludeProperties:[],verticalArrangement:false},m,w||{});var M=Math.max(1,w.minWidth);var d=Math.max(M,w.maxWidth);if(p.isComplex()){var r=p.getReferencedProperties().filter(function(e){return![].concat(w.excludeProperties).includes(e.getName());});r.forEach(function(R){var f=this._calcColumnWidth(R,{includeLabel:false});if(w.verticalArrangement||r.length==1){W=Math.max(f,W);}else{W=W+f+0.5;}},this);}else{var t=p.getTypeConfig();var o=t.typeInstance;if(o){W=T.calcTypeWidth(o,w);}if(p.getUnitProperty()){W+=2.5;}}W+=w.gap;if(w.includeLabel){var L=p.getLabel()||"";l=T.calcHeaderWidth(L,W,d,M);}W=Math.max(M,W,l);W=Math.min(W,d);W=Math.round(W*100)/100;return W;};return a;});