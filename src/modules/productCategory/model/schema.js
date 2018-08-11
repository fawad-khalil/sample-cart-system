var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productCategorySchema = new Schema({
	name: String,
	description: String
});

module.exports = productCategorySchema;