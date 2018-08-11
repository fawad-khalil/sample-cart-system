/* npm modules */
let express = require('express');

/* local product packages */
let productLib = require('../controller/product');
let routerMiddleware = require('../middleware/product');

/* data variables */
let router = express.Router();

routerMiddleware.buildMiddleware(router);

/**
 * Get the list of products 
 */
router.get('/', (req, res) => {
	productLib.getAllProducts().then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	})
})

/**
 * Edit the details of a product 
 */
router.put('/:productId', (req, res) => {
	let updateInfo = {
		id: req.params.productId,
		newValues: req.body.productUpdateInfo
	}

	productLib.updateProduct(updateInfo).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	})
})

/** 
 * Add a product to the list of products 
 */
router.post('/', (req, res) => {
	let product = req.body.product;

	productLib.saveNewProduct(product).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	})
})

/** 
 * Delete a product
 */
router.delete('/:productId', (req, res) => {
	let productId = req.params.productId;

	productLib.deleteProduct(productId).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	})
})

/** 
 * Get the details of a product 
 */
router.get('/:productId', (req, res) => {
	let productId = req.params.productId;

	productLib.getProductById(productId).then((response) => {
		res.status(response.code).json(response);
	}).catch((error) => {
		res.status(error.code).json(error);
	})
})

module.exports = {route: router, prefix: '/product'};