/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/ClientPropertyBinding",
	"sap/base/util/deepEqual",
	"sap/base/util/deepClone"
], function (
	JSONModel,
	ClientPropertyBinding,
	deepEqual,
	deepClone
) {
	"use strict";

	/**
	 * Creates a new ObservableModel object.
	 *
	 * @class
	 *
	 * Extends the JSONModel to provide easy to use change event.
	 *
	 * @extends sap.ui.model.json.JSONModel
	 *
	 * @author SAP SE
	 * @version 1.96.7
	 * @constructor
	 * @private
	 * @alias sap.ui.integration.model.ObservableModel
	 */
	var ObservableModel = JSONModel.extend("sap.ui.integration.model.ObservableModel", {
		constructor: function (oData, bObserve) {
			JSONModel.apply(this, arguments);

			this._observedBinding = new ClientPropertyBinding(this, "/", this.getContext("/"));
			this._observedBinding.attachChange(this._handleChange.bind(this));

			this._fireChangeBound = this._fireChange.bind(this);
		}
	});

	/**
	 * @inheritdoc
	 */
	ObservableModel.prototype.destroy = function () {
		this._observedBinding.destroy();
		this._observedBinding = null;

		clearTimeout(this._iFireChangeCallId);
	};

	/**
	 * Handles the change event coming from <code>ClientPropertyBinding</code> change.
	 */
	ObservableModel.prototype._handleChange = function () {
		this._scheduleFireChange();
	};

	/**
	 * Schedule the firing of <code>change</code> event.
	 * This prevents multiple firing of the change event when there are multiple changes in the same tick.
	 * @private
	 */
	ObservableModel.prototype._scheduleFireChange = function () {
		if (this._iFireChangeCallId) {
			clearTimeout(this._iFireChangeCallId);
		}

		this._iFireChangeCallId = setTimeout(this._fireChangeBound, 0);
	};

	/**
	 * Fire the <code>change</code> event.
	 * @private
	 */
	ObservableModel.prototype._fireChange = function () {
		this.fireEvent("change");
	};

	return ObservableModel;
});
