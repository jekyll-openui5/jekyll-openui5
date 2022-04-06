/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.ui.webc.main.ColorPicker.
sap.ui.define([
	"sap/ui/webc/common/WebComponent",
	"./library",
	"./thirdparty/ColorPicker"
], function(WebComponent, library) {
	"use strict";

	/**
	 * Constructor for a new <code>ColorPicker</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @extends sap.ui.webc.common.WebComponent
	 * @class
	 *
	 * <h3>Overview</h3> The ColorPicker allows users to choose any color and provides different input options for selecting colors.
	 *
	 * <h3>Usage</h3>
	 *
	 * <h4>When to use:</h4 Use the color picker if: <ul>
	 * <li> users need to select any color freely.</li>
	 * </ul>
	 *
	 * <h4>When not to use:</h4>
	 * <ul>
	 *     <li> Users need to select one color from a predefined set of colors. Use the ColorPalette component instead.</li>
	 * </ul>
	 *
	 * @author SAP SE
	 * @version 1.96.7
	 *
	 * @constructor
	 * @public
	 * @since 1.92.0
	 * @experimental Since 1.92.0 This control is experimental and its API might change significantly.
	 * @alias sap.ui.webc.main.ColorPicker
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var ColorPicker = WebComponent.extend("sap.ui.webc.main.ColorPicker", {
		metadata: {
			library: "sap.ui.webc.main",
			tag: "ui5-color-picker-ui5",
			properties: {

				/**
				 * Defines the currently selected color of the component. <br>
				 * <br>
				 * <b>Note</b>: use HEX, RGB, RGBA, HSV formats or a CSS color name when modifying this property.
				 */
				color: {
					type: "string"
				}
			},
			events: {

				/**
				 * Fired when the the selected color is changed
				 */
				change: {
					parameters: {}
				}
			}
		}
	});

	return ColorPicker;
});