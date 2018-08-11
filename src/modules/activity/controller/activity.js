let Activity = require('../model/model');
let mongooseHelper = require('../../../../helper/mongooseHelper.js');

let getAllActivities = () => {
	let allActivities = mongooseHelper.findBulkDocument(Activity, {}, null, 'Activities');

	return allActivities.then((response) => {
		return response;

	}).catch((error) => {
		return error;
	})
}

let getActivityById = (id) => {

	let activity = mongooseHelper.findSingleDocument(Activity, { id: id }, null, 'Activities');

	return activity.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	})
}

let saveNewActivity = (activityObj) => {
	activityObj.time = Date.now();
	
	let newActivity = new Activity(activityObj);

	let savePromise = mongooseHelper.insertDocument(newActivity, 'Activity');

	return savePromise.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	})
}

let updateActivity = (updateInfoObj) => {
	let updatePromise = mongooseHelper.updateDocument(Activity, updateInfoObj, 'Activity');

	return updatePromise.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	})
}

let deleteActivity = (productId) => {
	let deletePromise = mongooseHelper.deleteDocument(Activity, { id: productId }, 'Activity');

	return deletePromise.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	})
}

module.exports = {
	getAllActivities: getAllActivities,
	getActivityById: getActivityById,
	saveNewActivity: saveNewActivity,
	updateActivity: updateActivity,
	deleteActivity: deleteActivity
};