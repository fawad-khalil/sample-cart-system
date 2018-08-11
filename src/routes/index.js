// let activityRouter = require('../modules/activity/route/activity');
let productCategoryRouter = require('../modules/productCategory/route/productCategory');
let orderRouter = require('../modules/order/route/order');
let productRouter = require('../modules/product/route/product');
// let requestLogRouter = require('../modules/requestLog/route/requestLog');
let userRouter = require('../modules/user/route/user');

let routes = {
	// activityRouter: activityRouter,
	productCategoryRouter: productCategoryRouter,
	orderRouter: orderRouter,
	productRouter: productRouter,
	// requestLogRouter: requestLogRouter,
	userRouter: userRouter
}

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = routes;
