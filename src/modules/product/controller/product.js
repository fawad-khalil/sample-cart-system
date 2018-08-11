let Product = require('../model/model');
let mongooseHelper = require('../../../../helper/mongooseHelper');

let getAllProducts = () => {
	let allProducts = mongooseHelper.findBulk(Product, {}, 'Products');

	return allProducts.then((response) => {
		return response;

	}).catch((error) => {
		return error;
	})
}

let getProductById = (id) => {

	let product = mongooseHelper.findOneById(Product, id, 'Products');

	return product.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	})
}

let saveNewProduct = (productObj) => {
	productObj.purchase_date = Date.now();
	let newProduct = new Product(productObj);

	let savePromise = mongooseHelper.insertDocument(newProduct, 'Product');

	return savePromise.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	})
}

let updateProduct = (updateInfoObj) => {
	let updatePromise = mongooseHelper.updateDocument(Product, updateInfoObj.id, updateInfoObj.newValues, 'Product');

	return updatePromise.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	})
}

let deleteProduct = (productId) => {
	let deletePromise = mongooseHelper.deleteDocument(Product, productId, 'Product');

	return deletePromise.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	})
}

module.exports = {
	getAllProducts: getAllProducts,
	getProductById: getProductById,
	saveNewProduct: saveNewProduct,
	updateProduct: updateProduct,
	deleteProduct: deleteProduct
};