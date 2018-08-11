var mongoose = require('mongoose');
var productSchema = require('./schema');
var productModelName = require('../../../res/res.json').product_model;

var product = mongoose.model(productModelName, productSchema);

module.exports = product;