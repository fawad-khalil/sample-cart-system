let buildMiddleware = function(router) {
	router.get('/', function(req, res, next) {
		next();
	})

	router.post('/', function(req, res, next) {
		next();
	})

	router.delete('/', function(req, res, next) {
		next();
	})
}

module.exports = {
	buildMiddleware: buildMiddleware
};