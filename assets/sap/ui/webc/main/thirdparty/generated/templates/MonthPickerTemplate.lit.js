sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const i=(i,t,s)=>e.html`<div class="ui5-mp-root" role="grid" aria-readonly="false" aria-multiselectable="false" @keydown=${i._onkeydown} @keyup=${i._onkeyup} @click=${i._selectMonth} @focusin=${i._onfocusin}>${e.repeat(i._months,(e,i)=>e._id||i,(e,i)=>a(e))}</div>`;const a=(i,a,s,d,n)=>e.html`<div class="ui5-mp-quarter">${e.repeat(i,(e,i)=>e._id||i,(e,i)=>t(e))}</div>`;const t=(i,a,t,s,d)=>e.html`<div data-sap-timestamp=${e.ifDefined(i.timestamp)} tabindex=${e.ifDefined(i._tabIndex)} ?data-sap-focus-ref="${i.focusRef}" class="${e.ifDefined(i.classes)}" role="gridcell" aria-selected="${e.ifDefined(i.ariaSelected)}">${e.ifDefined(i.name)}</div>`;return i});