var mongoose = require('mongoose');
var productSubCategorySchema = require('./schema');
var productSubCategoryModelName = require('../../../../res/res.json').productSubCategory_model;

var productSubCategory = mongoose.model(productSubCategoryModelName, productSubCategorySchema);

module.exports = productSubCategory;