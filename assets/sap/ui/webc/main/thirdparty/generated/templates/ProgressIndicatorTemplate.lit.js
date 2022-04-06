sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const i=(i,n,s)=>e.html`<div class="ui5-progress-indicator-root ${e.classMap(i.classes.root)}" dir="${e.ifDefined(i.effectiveDir)}" role="progressbar" aria-valuemin="0" aria-valuenow="${e.ifDefined(i.validatedValue)}" aria-valuemax="100" aria-valuetext="${e.ifDefined(i.valueStateText)}" aria-disabled="${e.ifDefined(i._ariaDisabled)}"><div class="ui5-progress-indicator-bar" style="${e.styleMap(i.styles.bar)}">${!i.showValueInRemainingBar?a(i,n,s):undefined}</div><div class="ui5-progress-indicator-remaining-bar">${i.showValueInRemainingBar?r(i,n,s):undefined}</div></div>`;const a=(i,a,r)=>e.html`${i.showIcon?n(i,a,r):undefined}${!i.hideValue?s(i):undefined}`;const n=(i,a,n)=>e.html`<${e.scopeTag("ui5-icon",a,n)} name="${e.ifDefined(i.valueStateIcon)}" class="ui5-progress-indicator-icon"></${e.scopeTag("ui5-icon",a,n)}>`;const s=(i,a,n)=>e.html`<span class="ui5-progress-indicator-value">${e.ifDefined(i.validatedValue)}%</span>`;const r=(i,a,n)=>e.html`${i.showIcon?d(i,a,n):undefined}${!i.hideValue?o(i):undefined}`;const d=(i,a,n)=>e.html`<${e.scopeTag("ui5-icon",a,n)} name="${e.ifDefined(i.valueStateIcon)}" class="ui5-progress-indicator-icon"></${e.scopeTag("ui5-icon",a,n)}>`;const o=(i,a,n)=>e.html`<span class="ui5-progress-indicator-value">${e.ifDefined(i.validatedValue)}%</span>`;return i});