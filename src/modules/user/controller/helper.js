let User = require('../model/model');
let myUtils = require('../../../../helper/utils');
let resources = require('../../../../res/res.json');
let redisHelper = require('../../../../helper/redisHelper');
let mongooseHelper = require('../../../../helper/mongooseHelper');
let validator = require('../../../../helper/validator');

let verifyUserPassword = (obtainedPassword, userName) => {
	let fetchUser = mongooseHelper.findOneAndSelect(User, { 'user_name': userName },
		{ 'first_name': 1, 'last_name': 1, 'user_name': 1, 'password': 1 }, 'User');

	return fetchUser.then((fetchUserResponse) => {
		if (fetchUserResponse.password === obtainedPassword) {
			return myUtils.makeResponseObj(200, 'User verified.', fetchUserResponse, resources.success_response_obj);
		}

		else {
			return myUtils.makeResponseObj(400, 'User not verified.', null, resources.fail_response_obj)
		}
	}).catch((error) => {
		return myUtils.makeResponseObj(400, 'User not verified.', error, resources.fail_response_obj)
	})
}

let createUserSession = (userCredentials, isRemember) => {
	let userPassword = userCredentials.password;
	delete userCredentials.password;

	let verifyUser = verifyUserPassword(userPassword, userCredentials.userName);

	return verifyUser.then((verifyResponse) => {

		if (verifyResponse.status) {
			
			verifyResponse.data.isRemember = isRemember;

			let storeTokenPromise = myUtils.storeToken(userCredentials, verifyResponse.data);

			return storeTokenPromise.then((storeTokenResponse) => {
				return storeTokenResponse;
			}).catch((error) => {
				return error;
			})
		}
		else {
			return verifyResponse;
		}
	}).catch((error) => {
		return error;
	})
}

let verifySession = (sessionToken) => {
	var fetchKey = redisHelper.getValue(sessionToken);

	return fetchKey.then((fetchResponse) => {
		if (validator.nullUndefinedValidator(fetchResponse)) {
			return myUtils.makeResponseObj(200, 'Session verified.', fetchResponse, resources.success_response_obj);
		}
		
	}).catch((error) => {
		return myUtils.makeResponseObj(400, 'Session not verified.', error, resources.fail_response_obj);
	})
}

let deleteSession = (sessionToken) => {
	var deleteKey = redisHelper.deleteKey(sessionToken);

	return deleteKey.then((deleteResponse) => {
		return myUtils.makeResponseObj(200, 'User logged out.', null, resources.success_response_obj);
	}).catch((error) => {
		return myUtils.makeResponseObj(400, 'Error occured. Retrying may help if error was unexpected.', error, resources.fail_response_obj);
	})
}

module.exports = {
	createUserSession: createUserSession,
	verifySession: verifySession,
	deleteSession: deleteSession
}