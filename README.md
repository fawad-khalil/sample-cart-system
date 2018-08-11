# sample-cart-system
A Node.js based starter project of shopping cart system

Please note that this a starter project, not a complete project and may contain some goofs as it is still under development. This project only gives an idea about how shopping cart API may work and does not implements complete functionality. Also this project does not include any sort of user interface. It's just an API.

# Technology Stack:
1. Node.js
2. ExpressJS
3. MongoDB 4.0
4. Redis
5. JWT
6. RSA encryption

# Setting-up the project:
1. Set up mongodb 4.0 using https://www.mongodb.com/download-center#community
2. Set up redis using https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04
3. git clone https://github.com/fawad-khalil/sample-cart-system
4. git pull origin master
5. cd <download-path>/sample-cart-system
6. Go to http://travistidwell.com/jsencrypt/demo/ and generate a key pair. Copy those keys to res/public.key and res/private.key respectively.
7. npm install
8. npm start

# Project Structure:
.

├── helper # helper JS files that contain helper functions such as wrapper to mongoose and redis etc.

├── src # source files of the app

	├── libs # libraries that exist globally such as connection to mongodb using mongoose, and redis etc.

	├── middlewares # global middlewares that would apply to all express routes

	├── modules # different modules of the app. Each subfolder represents a module

	├── modules

		├── module-name # a module
			├── controller # logics handling of the module
				├── helper.js # Use case wrapper of the module. Calls Mongoose and redis wrapper etc. in use cases
				├── module-name.js # Business logic wrapper of the module. Provides business logic to the use case in different 							scenarios
				
			├── middleware # middleware of the routes of the modules
			├── model
				├── schema.js # mongoose schema of the entity related to the module
				├── model.js # mongoose model of the entity related to the module

			├── route # routes related to the module
	
	├── routes
		├── index.js # all routes of modules in the app. Whenever a new module/route is created, it's route should 									be imported to this file to be added to the main app and exposed by the API

	├── app.js # contains main app object and initialization of the main app

├── res # global resources for the app
	├── config.json # configuration settings existing globally for the app such as address of mongodb server
	├── res.json # constant resources such as string constants, paths etc.