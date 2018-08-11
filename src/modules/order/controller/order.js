const Order = require('../model/model');
const { ObjectId } = require('mongodb');
const mongooseHelper = require('../../../../helper/mongooseHelper');
const myUtils = require('../../../../helper/utils');
const orderHelper = require('./helper');
const resources = require('../../../../res/res.json');


let getByUserId = (userId) => {
	let userOrders = orderHelper.getAllUserOrders(Order, userId, 'Orders');

	return userOrders;
}

let getOrderById = (id) => {

	let order = mongooseHelper.findOneById(Order, id, 'Orders');

	return order
}

let getUserCart = (userId) => {
	let condition = {'isConfirmed': false}

	let order = orderHelper.getUserCart(Order, userId, condition, 'Orders');

	return order;
}

// TODO: write functions to add product to cart of user
// TODO: write functions to checkout cart

let updateOrder = (updateInfoObj) => {
	let updatePromise = mongooseHelper.updateDocumentById(Order, updateInfoObj.id, updateInfoObj.newValues, 'Order');

	return updatePromise.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	})
}

let deleteOrder = (orderIds) => {
	// Never allow delete of a confirmed order

	let query = { 'is_confirmed': false };

	let deletePromise = mongooseHelper.deleteMultipleDocumentByIdConditional(Order, orderIds, query, 'Order');

	return deletePromise;
}

module.exports = {
	getByUserId: getByUserId,
	getOrderById: getOrderById,
	getUserCart: getUserCart,
	updateOrder: updateOrder,
	deleteOrder: deleteOrder
};