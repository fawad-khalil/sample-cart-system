var mongoose = require('mongoose');

var activitySchema = require('./schema');
var activityModelName = require('../../../res/res.json').activity_model;

var activity = mongoose.model(activityModelName, activitySchema);

module.exports = activity;