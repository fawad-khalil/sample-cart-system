var mongoose = require('mongoose');
var productCategorySchema = require('../../productCategory/model/schema');
var Schema = mongoose.Schema;

var productSubCategorySchema = new Schema({
	name: String,
	description: String,
	productCategory: productCategorySchema
});

module.exports = productSubCategorySchema;