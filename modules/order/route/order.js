let express = require('express');

/* local product packages */
let orderLib = require('../controller/order');
let routerMiddleware = require('../middleware/order');

/* data variables */
let router = express.Router();

routerMiddleware.buildMiddleware(router);

/* Get the list of the orders of user */
router.get('/', function(req, res) {

	orderLib.getAllOrders().then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	})
})

/* Get the summary/invoice of the order */
router.get('/:orderId', function(req, res) {
	let orderId = req.params.orderId;

	orderLib.getOrderById(orderId).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	})
})

/* Get the orders of a user */
router.get('/user/', function(req, res) {
	// TODO 4: Set the locals property in middleware using the token in headers of request
	let userId = req.locals.userId;

	orderLib.getByUserId(userId).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	})
})

router.get('/cart', function(req, res) {
	// TODO 4: Set the locals property in middleware using the token in headers of request
	let userId = req.locals.userId;

	orderLib.getUserCart(userId).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	})
})

/* Update the quantity of product in the cart of user */
router.put('/:orderId', function(req, res) {
	let updateInfo = {
		id: req.params.orderId,
		newValues: req.body.orderUpdateInfo
	}

	orderLib.updateOrder(updateInfo).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error)
	})
})

/* Delete one or more products from cart */
router.delete('/', function(req, res) {
	let orderIds = req.body.orderIds;

	orderLib.deleteOrder(orderIds).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	})
})

/* Empty user's cart */
router.delete('/user', function(req, res) {
	// TODO 4: Set the locals property in middleware using the token in headers of request
	let userId = req.locals.userId;

	orderLib.deleteUserOrder(userId).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	})
})


module.exports = {route: router, prefix: '/order'};