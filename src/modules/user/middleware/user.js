let buildMiddleware = function(router) {
	router.get('/', function(req, res, next) {
		next();
	})
}

module.exports = {
	buildMiddleware: buildMiddleware
};
