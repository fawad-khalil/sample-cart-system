let mongooseHelper = require('../../../../helper/mongooseHelper');
let productLib = require('../../product/controller/product');
let userLib = require('../../user/controller/user');
let myUtils = require('../../../../helper/utils');
let resources = require('../../../../res/res.json');


let getAllUserOrders = (collectionObj, userId, collectionName) => {

	let userIdPath = resources.order_user_id_path;

	return mongooseHelper.findBulkByIdPath(collectionObj, userIdPath, userId, collectionName);

}

let getUserCart = (collectionObj, userId, condition, collectionName) => {

	let userIdPath = resources.order_user_id_path;

	return mongooseHelper.findBulkByIdPathConditional(collectionObj, userIdPath, userId, condition, collectionName);

}

let saveNewOrder = (collectionObj, productId, userId, orderInfo, isConfirmed, isShipped, collectionName) => {

	let productPromise = productLib.getProductById(productId);

	return productPromise.then((productObj) => {

		if (productObj.status) {

			let userPromise = userLib.getUserById(userId);

			return userPromise.then((userObj) => {

				if (userObj.status) {

					orderInfo.order_date = Date.now();
					orderInfo.is_shipped = isShipped;
					orderInfo.is_confirmed = isConfirmed;
					orderInfo.user = userObj.data;
					orderInfo.product = productObj.data;

					let newOrder = new collectionObj(orderInfo);

					let savePromise = mongooseHelper.insertDocument(newOrder, collectionName);

					return savePromise;
				}
				else {
					return Promise.reject(myUtils.makeResponseObj(400, resources.db_fetch_fail, null, resources.fail_response_obj));
				}
			}).catch((error) => {
				return error;
			})
		}

		else {
			return Promise.reject(myUtils.makeResponseObj(400, resources.db_fetch_fail, null, resources.fail_response_obj));
		}
	}).catch((error) => {
		return error;
	})
}

let isProductAdded = (collectionObj, isExistCondition) => {
	let cartProducts = mongooseHelper.findBulk(collectionObj, isExistCondition, 'Order');
	
	cartProducts.then((products) => {
		if (products.length > 0) {
			return true;
		}

		return false;
	});
}

let deleteUserOrder = (collectionObj, userId, condition, collectionName) => {
	let userIdPath = resources.order_user_id_path;

	return mongooseHelper.deleteMulitpleByIdPathConditional(collectionObj, userIdPath, userId, condition, collectionName);
}

module.exports = {
	getAllUserOrders: getAllUserOrders,
	saveNewOrder: saveNewOrder,
	getUserCart: getUserCart,
	deleteUserOrder: deleteUserOrder,
	isProductAdded: isProductAdded
}