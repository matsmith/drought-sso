define([
    'ember',
    'coachingQuestionnaire/scripts/models/questionnaire-model',
    'coachingQuestionnaire/scripts/utils/errors/not-implemented-error',
    'coachingQuestionnaire/scripts/utils/company-config'
], function(
    Ember,
    QuestionnaireModel,
    NotImplementedError,
    CompanyConfig
  ) {
    'use strict';

    return Ember.Object.extend({
      debugLogging: false,
      availableProduct: function(productName) {
        var _this, debugLogging;
        _this = this;
        debugLogging = this.get('debugLogging');

        if (debugLogging) {
          console.log("/availableProduct Start, Product:", productName);
        }

        return this._getAvailableProduct(productName)
          .then(function(availableProductJSON) {
            var productListJSON, productJSON, questionnaire;
            productListJSON = availableProductJSON.availableProductResponse &&
                availableProductJSON.availableProductResponse.product;
            if (_this.doesExist(productListJSON) && productListJSON.length > 0) {
              productJSON = _this._getLatestProductEnrollment(productListJSON);
              questionnaire = QuestionnaireModel.create({
                id: productJSON.name,
                shortName: CompanyConfig.find("ProductRenaming", productName + "ShortName") || "",
                longName: CompanyConfig.find("ProductRenaming", productName + "LongName") || "",
                status: productJSON.questionnaire.status.statusCode,
                retakeAvailable: productJSON.retakeAvailable,
                productEnrollmentId: productJSON.productEnrollmentId,
                productComponentType: productJSON.questionnaire.componentType,
                upgradePathApplicable: (productJSON.matchedSurveyProductStatus !== "NOT_APPLICABLE"),
                upgradePathQuestionnaireStarted: (productJSON.matchedSurveyProductStatus === "QUESTIONNAIRE_STARTED"),
                upgradePathQuestionnaireFinished: (productJSON.matchedSurveyProductStatus === "QUESTIONNAIRE_FINISHED"),
                upgradePathRetakeAvailable: (productJSON.matchedSurveyProductStatus === "RETAKE_AVAILABLE"),
                upgradePathCombinedProduct: (productJSON.matchedSurveyProductStatus === "COMBINED_PRODUCTS")
              });

              if (debugLogging) {
                console.log("/availableProduct Complete, Product:", productName);
              }

              return questionnaire;
            }
            return null;
          });
      },

      /**
       * The product array in the availableProductResponse can contain
       * previously completed products. This method will return the latest
       * enrolled product that the user should be taking. If no product is
       * marked as "latest" the last product in the list is returned.
       * @param {object[]} products
       * @returns {object|null}
       * @private
       */
      _getLatestProductEnrollment: function(products) {
        for(var idx in products) {
          if(typeof(products[idx]) === "object" && products[idx].latestProductEnrollment) {
            return products[idx];
          }
        }
        return products.length > 0 ? products[products.length - 1] : null;
      },

      // Abstract protected methods

      _getAvailableProduct: function(productName) {
        throw NotImplementedError.create({
          className: this.constructor.toString(),
          methodName: "_getAvailableProduct"
        });
      }
    });
  }
);
