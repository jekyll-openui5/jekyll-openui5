sap.ui.define(["sap/ui/webc/common/thirdparty/base/asset-registries/Themes","sap/ui/webc/common/thirdparty/theme-base/generated/themes/sap_fiori_3/parameters-bundle.css","./sap_fiori_3/parameters-bundle.css"],function(e,r,o){"use strict";function t(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var i=t(r);e.registerThemePropertiesLoader("@ui5/webcomponents-theme-base","sap_fiori_3",()=>i);e.registerThemePropertiesLoader("@ui5/webcomponents","sap_fiori_3",()=>o);var s=".ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none}:host{height:var(--_ui5_group_header_list_item_height);background:var(--ui5-group-header-listitem-background-color);border-bottom:1px solid var(--sapList_TableGroupHeaderBorderColor);color:var(--sapList_TableGroupHeaderTextColor)}.ui5-li-root.ui5-ghli-root{padding-top:.5rem;color:currentColor;font-size:var(--sapFontHeader6Size);font-weight:400;line-height:2rem}.ui5-ghli-title{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:700}";return s});