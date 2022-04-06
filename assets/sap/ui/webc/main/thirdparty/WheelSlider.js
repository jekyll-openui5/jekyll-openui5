sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/Device","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/util/getEffectiveContentDensity","sap/ui/webc/common/thirdparty/icons/navigation-up-arrow","sap/ui/webc/common/thirdparty/icons/navigation-down-arrow","sap/ui/webc/common/thirdparty/base/delegate/ScrollEnablement","./generated/templates/WheelSliderTemplate.lit","./Button","./generated/themes/WheelSlider.css"],function(e,t,i,s,n,l,r,h,o,c,a){"use strict";function d(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var u=d(e);var m=d(t);var _=d(n);var p=d(h);const f={tag:"ui5-wheelslider",properties:{disabled:{type:Boolean},value:{type:String,defaultValue:"0"},label:{type:String,defaultValue:""},expanded:{type:Boolean},_items:{type:String,multiple:true,compareValues:true},_itemsToShow:{type:Object,multiple:true},cyclic:{type:Boolean}},slots:{},events:{expand:{},collapse:{},select:{detail:{value:{type:String}}}}};const g=32;const y=46;class w extends u{static get metadata(){return f}static get render(){return m}static get styles(){return a}static get template(){return o}constructor(){super();this._currentElementIndex=0;this._itemsToShow=[];this._scroller=new p(this);this._scroller.attachEvent("scroll",this._updateScrolling.bind(this));this._scroller.attachEvent("mouseup",this._handleScrollTouchEnd.bind(this));this._scroller.attachEvent("touchend",this._handleScrollTouchEnd.bind(this))}onBeforeRendering(){if(!this.expanded&&this.cyclic){const e=this._currentElementIndex%this._items.length;this._currentElementIndex=this._timesMultipliedOnCyclic()/2*this._items.length+e}if(!this.value){this.value=this._items[0]}this._buildItemsToShow()}static get dependencies(){return[c]}onAfterRendering(){if(!this._scroller.scrollContainer){this._scroller.scrollContainer=this.shadowRoot.querySelector(`#${this._id}--wrapper`)}if(!this.expanded){this._scroller.scrollTo(0,0)}if(this.expanded){const e=this.shadowRoot.querySelectorAll(".ui5-wheelslider-item");for(let t=0;t<e.length;t++){if(e[t].textContent===this.value){this._selectElementByIndex(Number(e[t].dataset.itemIndex)+this._getCurrentRepetition()*this._items.length);return true}}this._selectElement(e[0])}}get classes(){return{root:{"ui5-wheelslider-root":true,"ui5-phone":i.isPhone()}}}expandSlider(){this.expanded=true;this.fireEvent("expand",{})}collapseSlider(){this.expanded=false;this.fireEvent("collapse",{})}get _itemCellHeight(){const e=_(document.body)==="compact"?g:y;if(this.shadowRoot.querySelectorAll(".ui5-wheelslider-item").length){const t=getComputedStyle(this.shadowRoot.querySelector(".ui5-wheelslider-item"));const i=t.getPropertyValue("--_ui5_wheelslider_item_height");const s=i.replace("px","");return Number(s)||e}return e}_updateScrolling(){const e=this._itemCellHeight,t=this._scroller.scrollContainer.scrollTop;let i;if(!t){return}i=Math.round(t/e);if(this.value===this._itemsToShow[i].value){return}if(this.cyclic){const e=this._handleArrayBorderReached(i);if(i!==e){i=e}}this.value=this._itemsToShow[i].value;this._currentElementIndex=i}_handleScrollTouchEnd(){if(this.expanded){this._selectElementByIndex(this._currentElementIndex)}}_selectElement(e){if(e&&this._items.indexOf(e.textContent)>-1){this._currentElementIndex=Number(e.dataset.itemIndex);this._selectElementByIndex(this._currentElementIndex)}}_getCurrentRepetition(){if(this._currentElementIndex){return Math.floor(this._currentElementIndex/this._items.length)}return 0}_selectElementByIndex(e){let t=e;const i=this._itemsToShow.length;const s=this._itemCellHeight;const n=s*t;if(this.cyclic){t=this._handleArrayBorderReached(t)}if(t<i&&t>-1){this._scroller.scrollTo(0,n,5,100);this._currentElementIndex=t;this.value=this._items[t-this._getCurrentRepetition()*this._items.length];this.fireEvent("select",{value:this.value})}}_timesMultipliedOnCyclic(){const e=70;const t=Math.round(e/this._items.length);const i=3;return Math.max(i,t)}_buildItemsToShow(){let e=this._items;if(this.cyclic){if(e.length<this._items.length*this._timesMultipliedOnCyclic()){for(let t=0;t<this._timesMultipliedOnCyclic();t++){e=e.concat(this._items)}}}this._itemsToShow=e.map(e=>({value:e,selected:e===this.value}))}_handleArrayBorderReached(e){const t=this._itemsToShow.length;const i=7;let s=e;if(i>s){s+=this._items.length*2}else if(s>t-i){s-=this._items.length*2}return s}_handleWheel(e){if(!e){return}e.stopPropagation();e.preventDefault();if(e.timeStamp===this._prevWheelTimestamp||!this.expanded){return}if(e.deltaY>0){this._itemUp()}else if(e.deltaY<0){this._itemDown()}this._prevWheelTimestamp=e.timeStamp}_onclick(e){if(!e.target.classList.contains("ui5-wheelslider-item")){return}if(this.expanded){this.value=e.target.textContent;this._selectElement(e.target);this.fireEvent("select",{value:this.value})}else{this.expanded=true}}_onArrowDown(e){e.preventDefault();this._itemDown()}_onArrowUp(e){e.preventDefault();this._itemUp()}_itemDown(){const e=this._currentElementIndex+1;this._selectElementByIndex(e)}_itemUp(){const e=this._currentElementIndex-1;this._selectElementByIndex(e)}_onkeydown(e){if(!this.expanded){return}if(s.isUp(e)){this._onArrowUp(e)}if(s.isDown(e)){this._onArrowDown(e)}if(s.isPageDown(e)){this._selectLimitCell(e,false)}if(s.isPageUp(e)){this._selectLimitCell(e,true)}}_selectLimitCell(e,t){e.preventDefault();const i=this.cyclic?this._items.length:0;if(t){this._selectElementByIndex(this._items.length-1+i)}else{this._selectElementByIndex(i)}}}w.define();return w});