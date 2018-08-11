var mongoose = require('mongoose');

var orderSchema = require('./schema');
var orderModelName = require('../../../res/res.json').order_model;

var order = mongoose.model(orderModelName, orderSchema);

module.exports = order;