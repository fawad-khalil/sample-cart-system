var express = require('express');

var productCategoryLib = require('../controller/productCategory');
var routerMiddleware = require('../middleware/productCategory');

var router = express.Router();

routerMiddleware.buildMiddleware(router);

router.get('/', function(req, res) {
	productCategoryLib.getAll().then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	});
})

/**
 * Gets user by Id
 */
router.get('/:productCategoryId', (req, res) => {
	let productCategoryId = req.params.productCategoryId;
	productCategoryLib.getCategoryById(productCategoryId).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	});
});

router.post('/', function(req, res) {
	let newproductCategory = req.body.productCategory;

	productCategoryLib.saveNewCategory(newproductCategory).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	});
})

router.put('/:productCategoryId', function(req, res) {
	let updateInfo = {
		id: req.params.productCategoryId,
		newValues: req.body.productCategory
	};

	productCategoryLib.updateCategoryById(updateInfo).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	});
})

router.delete('/:productCategoryId', function(req, res) {
	let productCategoryId = req.params.productCategoryId;

	productCategoryLib.deleteCategoryById(productCategoryId).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	});
})

module.exports = { route: router, prefix: '/productCategory' };