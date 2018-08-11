let validator = require('./validator');
let redisHelper = require('./redisHelper');
let jwtHelper = require('./jwtHelper');
let resources = require('../res/res.json');

let makeResponseObj = (code, message, data, sourceObj) => {
	sourceObj.code = code;
	sourceObj.message = message;
	if (code >= 200 && code < 300) {
		sourceObj.data = data;
	}
	else if (code >= 400 && code < 500) {
		sourceObj.error = data;
	}
	return sourceObj;
}

let fulfillPromise = (promise, successCode, successMessage, successData, successObj, errorCode, errorMessage, errorData, errorObj) => {

	return promise.then((result) => {
		if (!validator.nullUndefinedValidate(result)) {
			return makeResponseObj(errorCode, errorMessage, errorData, errorObj);
		}

		let docSuccess = makeResponseObj(successCode, successMessage, result, successObj);

		return docSuccess;
	}).catch((error) => {
		return makeResponseObj(errorCode, errorMessage, error, errorObj);
	})

}

let rejectPromise = function(code, message) {
	return Promise.reject(makeResponseObj(code, message, null, resources.fail_response_obj));
}

let storeToken = function (unsingedToken, redisValue) {
	var token = jwtHelper.sign(unsingedToken);

	redisHelper.setKeyForever(token, redisValue).then((redisResponse) => {
		if (validator.nullUndefinedValidator(redisResponse)) {
			redisValue.token = token;
			return redisValue;
		}
		else {
			return this.makeResponseObj(400, 'Failed to create new session. Retry!', null, resources.fail_response_obj)
		}
	}).catch((error) => {
		return error;
	});
}

module.exports = {
	makeResponseObj: makeResponseObj,
	fulfillPromise: fulfillPromise,
	rejectPromise: rejectPromise,
	storeToken: storeToken
}