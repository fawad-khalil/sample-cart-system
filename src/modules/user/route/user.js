/* npm modules */
let express = require('express');

/* local product packages */
let userLib = require('../controller/user');
let routerMiddleware = require('../middleware/user');

/* data variables */
let router = express.Router();

routerMiddleware.buildMiddleware(router);

/**
 * Gets users list.
 * */
router.get('/', function (req, res) {
	userLib.getAll().then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	});
});

/**
 * Gets user by Id
 */
router.get('/:userId', (req, res) => {
	let userId = req.params.userId;
	userLib.getUserById(userId).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	});
});

/**
 * Edits user information
 */
router.put('/:userId', function (req, res) {
	let updateInfo = {
		id: req.params.userId,
		newValues: req.body.user
	};

	userLib.updateUserById(updateInfo).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	});
});

// /**
//  * Saves a new user
//  */
// router.post('/', (req, res) => {
// 	let newUser = req.body.user;

// 	userLib.saveNewUser(newUser).then((response) => {
// 		res.status(response.code).json(response);
// 	}).catch((error) => {
// 		res.status(error.code).json(error);
// 	});
// });

/**
 * Deletes a user
 */
router.delete('/:userId', function (req, res) {
	let userId = req.params.userId;

	userLib.deleteUserById(userId).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	});
});

/**
 * Logon new User
 */
router.post('/logon', function(req, res) {
	let userCredentials = req.body.userCredentials;

	userLib.logonUser(userCredentials).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	})
});

/**
 * Login User
 */
router.post('/login', function (req, res) {
	let userCredentials = req.body.userCredentials;

	userLib.loginUser(userCredentials).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	});
});

/**
 * Authenticates session
 */
router.get('/session', function (req, res) {
	let sessionToken = req.headers.token;

	userLib.verifySession(sessionToken).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	});
});

/**
 * Logout User
 */
router.delete('/logout', function (req, res) {
	let sessionToken = req.headers.token;

	userLib.logoutUser(sessionToken).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	});
});

module.exports = { route: router, prefix: '/user' };
