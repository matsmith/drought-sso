/*global define*/
define("presentationService", ["baseService", "jquery"], function(Service, $) {
	"use strict";

	var serviceName = "presentation";

	/**
	* [DataTransformer] allows the transformation of data.
	* Works like a matrix translation function.
	* Where relationships are established by property key.
	*
	* [DataTransformer] is a constructor.
	*
	* @param {object}      configuration             [configuration object]
	*                      configuration.showFlat    [show development details]
	* @return {function}   dataTransformer           [the constructed function]
	*/
	function DataTransformer(configuration) {
		configuration = configuration || {};
		// Will represent the flat table or transition table.
		var flatAbstract;

		/**
		* [iterator] is a local utility.
		* Provides a common layer for iteration of objects and arrays.
		*
		* @param  {object}   obj      [object to be iterated over]
		* @param  {Function} callback [function to be fired on available data]
		* @return {undefined}
		*/
		function iterator (obj, callback) {
			if (Array.isArray(obj)) {
				obj.forEach(function (item, index) {
					callback(index, item);
				});
			} else if (typeof(obj) === 'object'){
				Object.keys(obj).forEach(function (key) {
					callback(key, obj[key]);
				});
			}
		}

		/**
		* [flatten] Recursively creates a flattened object.
		* The properties of the flat object are arrays of pointers.
		* These pointers are referencing rawData's properties.
		* Maintains pointers not copies.
		*
		* @param  {object} obj [the current object to be flattened]
		* @return {undefined}
		*/
		function flatten (obj) {
			iterator(obj, function (key, prop) {
				if (!flatAbstract[key]) {
					flatAbstract[key] = [];
				}
				flatAbstract[key].push(prop);
				flatten(prop);
			});
		}

		/**
		* [mutate] Applies the transformation matrix to the transition matrix, and as a result the raw object is updated.
		* @param  {object} mutations [
		*                            All of this object's keys must be represented in the flat object.
		*                            This object's methods are the functions to run against the properties of the transition table.
		*                            ]
		* @return {undefined}
		*/
		function mutate (mutations) {
			iterator(mutations, function (key, prop) {
				iterator(flatAbstract, function (flatKey, flatProp) {
					if (key === flatKey) {
						flatProp.forEach(function (group) {
							prop(group);
						});
					}
				});
			});
		}
		return function dataTransformer (rawData, transformations) {
			flatAbstract = {};
			flatten(rawData);
			if (configuration.showFlat) {
				console.log('flat object from DataTransformer()', flatAbstract);
			}
			mutate(transformations);
		};
	}

	var unpackProperties = new DataTransformer();

	function PresentationService(options) {
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get : "",
			post : ""
		};
		this.options = options;

		/**
			* Get presentation data with varied query parameters.
			* @param {obj}        Contains query parameters.
			*                     property names = query names
			*                     property values = query values
			* @returns {Promise}
		*/
		this.getBy = function(query) {
			if (typeof query !== 'object') {
				console.error('query must be object', query);
			}
			var queryParams = {
				q: Object.keys(query).join('-')
			};

			Object.keys(query).forEach(function (key) {
				queryParams[key] = query[key];
			});

			return this.validateEndpointResponse(this.get({}, queryParams).done(function(response){
				unpackProperties(response, {
					blocks: function (blockGroup) {
						blockGroup.forEach(function (block) {
							block.content = block.value || block.content;
							delete block.value;
							if (block.properties) {
								block.properties.forEach(function (property) {
									block[property.name] = property.value;
								});
								delete block.properties;
							}
						});
					}
				});
			}));
		};
	}

	PresentationService.serviceName = serviceName;
	PresentationService.prototype = Service.prototype;

	return PresentationService;
});
