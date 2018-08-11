let ProductCategory = require('../model/model');
let mongooseHelper = require('../../../../helper/mongooseHelper');

/**
 * Get all Product Categories
 */
let getAll = () => {
	let ProductCategoryPromise = mongooseHelper.findBulk(ProductCategory, {}, 'ProductCategory');

	return ProductCategoryPromise.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	});
};

/**
 * Updates Product Category by id. updateInfo should contain 'id' and 'newValues'
 * 
 * @param {*} updateInfo 
 */
let updateCategoryById = (updateInfo) => {

	let updatePromise = mongooseHelper.updateDocumentById(ProductCategory, updateInfo.id, updateInfo.newValues, 'ProductCategory');

	return updatePromise.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	});
};

/**
 * Finds a Product Category with Id
 * 
 * @param {string} id 
 */
let getCategoryById = (id) => {
	let getPromise = mongooseHelper.findOneById(ProductCategory, id, 'ProductCategory');

	return getPromise.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	});
};

/**
 * Saves a new Product Category.
 * 
 * @param {*} newProductCategory 
 */
let saveNewCategory = (newProductCategory) => {
	let productCategory = new ProductCategory(newProductCategory);

	let savePromise = mongooseHelper.insertDocument(productCategory, 'ProductCategory');

	return savePromise.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	});
};

/**
 * Deletes a Product Category by Id
 * 
 * @param {string} id 
 */
let deleteCategoryById = (id) => {
	let deletePromise = mongooseHelper.deleteDocumentById(ProductCategory, id, 'ProductCategory');

	return deletePromise.then((response) => {
		return response;
	}).catch((error) => {
		return error;
	});
};


module.exports = {
	getAll: getAll,
	updateCategoryById: updateCategoryById,
	getCategoryById: getCategoryById,
	saveNewCategory: saveNewCategory,
	deleteCategoryById: deleteCategoryById
}