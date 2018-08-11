let User = require('../model/model');
let mongooseHelper = require('../../../../helper/mongooseHelper');
let userHelper = require('./helper');

/**
 * Get all users
 */
let getAll = () => {
	let usersPromise = mongooseHelper.findBulk(User, {}, 'User');

	return usersPromise.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	});
};

/**
 * Updates User by id. updateInfo should contain 'id' and 'newValues'
 * 
 * @param {*} updateInfo 
 */
let updateUserById = (updateInfo) => {

	let updatePromise = mongooseHelper.updateDocumentById(User, updateInfo.id, updateInfo.newValues, 'User');

	return updatePromise.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	});
};

/**
 * Finds a User with Id
 * 
 * @param {string} id 
 */
let getUserById = (id) => {
	let getPromise = mongooseHelper.findOneById(User, id, 'User');

	return getPromise.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	});
};

/**
 * Saves a new User.
 * 
 * @param {*} newUser 
 */
let saveNewUser = (newUser) => {
	let user = new User(newUser);

	let savePromise = mongooseHelper.insertDocument(user, 'User');

	return savePromise.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	});
};

/**
 * Deletes a user by Id
 * 
 * @param {string} id 
 */
let deleteUserById = (id) => {
	let deletePromise = mongooseHelper.deleteDocumentById(User, id, 'User');

	return deletePromise.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	});
};

/**
 * Logons new user.
 * 
 * @param {*} userCredentials
 */
let logonUser = (userCredentials) => {
	var saveUser = saveNewUser(userCredentials);

	return saveUser.then((saveResponse) => {

		if (saveResponse.status) {
			var loginCredentials = {
				userName: userCredentials.userName,
				password: userCredentials.password
			}

			var login = loginUser(loginCredentials);

			return login.then((loginResponse) => {
				return loginResponse;
			}).catch((error) => {
				return error;
			})
		}
	}).catch((error) => {
		return error;
	})
}

/**
 * Logins user.
 * 
 * @param {*} userCredentials 
 */
let loginUser = (userCredentials, isRemember) => {

	let createSession = userHelper.createUserSession(userCredentials, isRemember);

	return createSession.then((sessionResponse) => {
		return sessionResponse;
	}).catch((error) => {
		return error;
	})

};

let logoutUser = (sessionToken) => {
	let logoutUser = userHelper.deleteSession(sessionToken);

	return logoutUser.then((logoutResponse) => {
		return logoutResponse;
	}).catch((error) => {
		return error;
	})
}

module.exports = {
	deleteUserById: deleteUserById,
	saveNewUser: saveNewUser,
	getUserById: getUserById,
	updateUserById: updateUserById,
	getAll: getAll,
	logonUser: logonUser,
	loginUser: loginUser,
	verifySession: verifySession,
	logoutUser: logoutUser
}

