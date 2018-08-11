var mongoose = require('mongoose');
var productCategorySchema = require('./schema');
var productCategoryModelName = require('../../../res/res.json').productCategory_model;

var productCategory = mongoose.model(productCategoryModelName, productCategorySchema);

module.exports = productCategory;