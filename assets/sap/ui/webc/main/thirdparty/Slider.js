sap.ui.define(["sap/ui/webc/common/thirdparty/base/types/Float","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/base/Keys","./SliderBase","./generated/templates/SliderTemplate.lit","./generated/i18n/i18n-defaults"],function(t,e,i,s,a,n){"use strict";function l(t){return t&&typeof t==="object"&&"default"in t?t["default"]:t}var r=l(t);const u={tag:"ui5-slider",languageAware:true,managedSlots:true,properties:{value:{type:r,defaultValue:0}}};class o extends s{static get metadata(){return u}static get template(){return a}constructor(){super();this._stateStorage.value=null;this._setInitialValue("value",null);this.i18nBundle=e.getI18nBundle("@ui5/webcomponents")}onBeforeRendering(){if(!this.isCurrentStateOutdated()){return}this.notResized=true;this.syncUIAndState("value");this._updateHandleAndProgress(this.value)}_onmousedown(t){if(this.disabled||this.step===0){return}const e=this.handleDownBase(t);this._valueOnInteractionStart=this.value;if(this._getInitialValue("value")===null){this._setInitialValue("value",this.value)}if(!this._isHandlePressed(this.constructor.getPageXValueFromEvent(t))){this._updateHandleAndProgress(e);this.updateValue("value",e)}}_onfocusin(t){if(this._getInitialValue("value")===null){this._setInitialValue("value",this.value)}if(this.showTooltip){this._tooltipVisibility=s.TOOLTIP_VISIBILITY.VISIBLE}}_onfocusout(t){if(this._isFocusing()){this._preventFocusOut();return}this._setInitialValue("value",null);if(this.showTooltip){this._tooltipVisibility=s.TOOLTIP_VISIBILITY.HIDDEN}}_handleMove(t){t.preventDefault();if(this.disabled||this._effectiveStep===0){return}const e=this.constructor.getValueFromInteraction(t,this._effectiveStep,this._effectiveMin,this._effectiveMax,this.getBoundingClientRect(),this.directionStart);this._updateHandleAndProgress(e);this.updateValue("value",e)}_handleUp(t){if(this._valueOnInteractionStart!==this.value){this.fireEvent("change")}this.handleUpBase();this._valueOnInteractionStart=null}_isHandlePressed(t){const e=this._sliderHandle.getBoundingClientRect();return t>=e.left&&t<=e.right}_updateHandleAndProgress(t){const e=this._effectiveMax;const i=this._effectiveMin;this._progressPercentage=(t-i)/(e-i);this._handlePositionFromStart=this._progressPercentage*100}_handleActionKeyPress(t){const e=this._effectiveMin;const s=this._effectiveMax;const a=this.value;const n=i.isEscape(t)?this._getInitialValue("value"):this.constructor.clipValue(this._handleActionKeyPressBase(t,"value")+a,e,s);if(n!==a){this._updateHandleAndProgress(n);this.updateValue("value",n)}}get styles(){return{progress:{transform:`scaleX(${this._progressPercentage})`,"transform-origin":`${this.directionStart} top`},handle:{[this.directionStart]:`${this._handlePositionFromStart}%`},tickmarks:{background:`${this._tickmarks}`},label:{width:`${this._labelWidth}%`},labelContainer:{width:`100%`,[this.directionStart]:`-${this._labelWidth/2}%`},tooltip:{visibility:`${this._tooltipVisibility}`}}}get _sliderHandle(){return this.shadowRoot.querySelector(".ui5-slider-handle")}get labelItems(){return this._labelItems}get tooltipValue(){const t=this.constructor._getDecimalPrecisionOfNumber(this._effectiveStep);return this.value.toFixed(t)}get _ariaDisabled(){return this.disabled||undefined}get _ariaLabelledByText(){return this.i18nBundle.getText(n.SLIDER_ARIA_DESCRIPTION)}static async onDefine(){await e.fetchI18nBundle("@ui5/webcomponents")}}o.define();return o});