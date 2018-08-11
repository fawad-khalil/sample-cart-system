var mongoose = require('mongoose');
var userSchema = require('./schema');
var userModelName = require('../../../res/res.json').user_model;

var user = mongoose.model(userModelName, userSchema);

module.exports = user;