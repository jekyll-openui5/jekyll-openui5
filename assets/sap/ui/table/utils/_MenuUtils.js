/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/unified/Menu","sap/ui/unified/MenuItem","sap/ui/core/Popup"],function(D,M,a,P){"use strict";P.setInitialZIndex(10);function o(c,r){var R=r.getRowBindingContext();var f=c.getFilterProperty();var F=R.getProperty(f);if(F!=null&&typeof F!=="string"){F=F.toString();}if(this.getEnableCustomFilter()){this.fireCustomFilter({column:c,value:F});}else{this.filter(c,F);}}var b={TableUtils:null,openContextMenu:function(t,e,E){if(!t||!e){return false;}var c=b.TableUtils.getCell(t,e);var C=c?c[0]:null;var d=b.TableUtils.getCellInfo(C);var i=d.columnIndex;var r=d.rowIndex;var f=true;if(d.isOfType(b.TableUtils.CELLTYPE.COLUMNHEADER)){var g=C.querySelector(".sapUiTableColDropDown")!==null;if(D.system.desktop||g){b._removeColumnHeaderCellMenu(t);f=t.fireColumnSelect({column:t.getColumns()[i]});if(f){return b._openColumnContextMenu(t,C);}else{return true;}}else{return b._applyColumnHeaderCellMenu(t,C);}}else if(d.isOfType(b.TableUtils.CELLTYPE.ANYCONTENTCELL)){var R=b.TableUtils.getRowColCell(t,r,i,i>=0);var h=R.row;var j;var k=t.getBindingInfo("rows");if(k){j=h.getBindingContext(k.model);}if(i>=0){f=t.fireCellContextmenu({rowIndex:h.getIndex(),columnIndex:i,columnId:R.column.getId(),cellControl:R.cell,rowBindingContext:j,cellDomRef:C});}if(f){var l=t.getContextMenu();if(l&&k){l.setBindingContext(j,k.model);}f=t.fireBeforeOpenContextMenu({rowIndex:h.getIndex(),columnIndex:R.column?i:null,contextMenu:l});}if(f){return b._openContentCellContextMenu(t,C,E);}else{return true;}}return false;},_openColumnContextMenu:function(t,c){var C=b.TableUtils.getCellInfo(c);var d=t.getColumns();var e=d[C.columnIndex];for(var i=0;i<d.length;i++){if(d[i]!==e){b._closeColumnContextMenu(t,i);}}b._closeContentCellContextMenu(t);var s=c.getAttribute("colspan");if(s&&s!=="1"){return false;}return e._openMenu(c);},_closeColumnContextMenu:function(t,c){t.getColumns()[c]._closeMenu();},_openContentCellContextMenu:function(t,c,e){var C=b.TableUtils.getCellInfo(c);if(C.rowIndex>=b.TableUtils.getNonEmptyRowCount(t)){return false;}if(b.hasCustomContextMenu(t)){return b._openCustomContentCellContextMenu(t,c,e);}else{return b._openDefaultContentCellContextMenu(t,c,e);}},_openCustomContentCellContextMenu:function(t,c,e){var C=b.TableUtils.getCellInfo(c);var r=t.getRows()[C.rowIndex];if(r.isGroupHeader()||r.isSummary()){return false;}var d=t.getContextMenu();var f=t.getColumns();for(var i=0;i<f.length;i++){b._closeColumnContextMenu(t,i);}b._closeDefaultContentCellContextMenu(t);if(e){d.openAsContextMenu(e,c);}else if(typeof d.openBy==="function"){d.openBy(c);}else{d.open(null,c,P.Dock.BeginTop,P.Dock.BeginBottom,c);}return true;},_openDefaultContentCellContextMenu:function(t,c,e){var C=b.TableUtils.getCellInfo(c);var r=C.rowIndex;var R=t.getRows()[r];var d=C.columnIndex;var f=t.getColumns();var g=f[d];if(!t._oCellContextMenu){t._oCellContextMenu=new M(t.getId()+"-cellcontextmenu");}var s=t._oCellContextMenu.getId()+"-cellfilter";var h=sap.ui.getCore().byId(s);if(t.getEnableCellFilter()&&g&&g.isFilterableByMenu()&&!R.isGroupHeader()){if(!h){h=new a({id:s,text:b.TableUtils.getResourceText("TBL_FILTER")});h._onSelect=o.bind(t,g,R);h.attachSelect(h._onSelect);}else{h.detachSelect(h._onSelect);h._onSelect=o.bind(t,g,R);h.attachSelect(h._onSelect);}t._oCellContextMenu.insertItem(h,0);}else{t._oCellContextMenu.removeItem(h);}b.TableUtils.Hook.call(t,b.TableUtils.Hook.Keys.Table.OpenMenu,C,t._oCellContextMenu);if(t._oCellContextMenu.getItems().length===0){return false;}for(var i=0;i<f.length;i++){b._closeColumnContextMenu(t,i);}b._closeCustomContentCellContextMenu(t);if(e){t._oCellContextMenu.openAsContextMenu(e,c);}else{t._oCellContextMenu.open(null,c,P.Dock.BeginTop,P.Dock.BeginBottom,c);}return true;},_closeContentCellContextMenu:function(t){b._closeCustomContentCellContextMenu(t);b._closeDefaultContentCellContextMenu(t);},_closeCustomContentCellContextMenu:function(t){var c=t.getContextMenu();var C=c?c.bOpen:false;if(C){c.close();}},_closeDefaultContentCellContextMenu:function(t){var d=t._oCellContextMenu;var c=d?d.bOpen:false;if(c){d.close();}},cleanupDefaultContentCellContextMenu:function(t){if(!t||!t._oCellContextMenu){return;}var c=t._oCellContextMenu.getId()+"-cellfilter";var C=sap.ui.getCore().byId(c);t._oCellContextMenu.removeAllItems();t._oCellContextMenu.destroy();t._oCellContextMenu=null;if(C){C.destroy();}},_applyColumnHeaderCellMenu:function(t,c){var C=b.TableUtils.getCellInfo(c);var d=t.getColumns()[C.columnIndex];var s=c.getAttribute("colspan");var e=c.querySelector(".sapUiTableCellInner");var f=c.querySelector(".sapUiTableCellTouchMenu")!==null;if(s&&s!=="1"||f||(!d.getResizable()&&!d._menuHasItems())){return false;}var g=document.createElement("div");b._removeColumnHeaderCellMenu(t);e.style.display="none";if(d._menuHasItems()){var h;h=document.createElement("div");h.classList.add("sapUiTableColDropDown");h.textContent="";g.appendChild(h);}if(d.getResizable()){var i;i=document.createElement("div");i.classList.add("sapUiTableColResizer");i.textContent="";g.appendChild(i);}g.classList.add("sapUiTableCellTouchMenu");c.appendChild(g);var j=function(){b._removeColumnHeaderCellMenu(t);c.removeEventListener("focusout",j);};c.addEventListener("focusout",j);return true;},_removeColumnHeaderCellMenu:function(t){var c=t&&t.$().find(".sapUiTableCHT .sapUiTableCellTouchMenu");if(c.length){c.parent().find(".sapUiTableCellInner").show();c.remove();}},hasCustomContextMenu:function(t){return t!=null&&t.getContextMenu()!=null;}};return b;},true);
