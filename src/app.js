/**
 * app.js
 *
 * API for ethereum blockchain crawler
 */

/**************************
	Imports
**************************/
// General packages
var bodyParser = require('body-parser'),
	http = require('http'),
	express = require('express');

// Internal imports
var config = require('./config.js'),
	routes = require('./routes.js');

setup_servers();

/**************************
	Functions
**************************/

/**
 * setup_servers
 *
 * @desc - main function that sets up the node.js server
 */
function setup_servers() {
	var api = express();

	// Config allowed headers
	var auth_config = function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token');
		next();
	};

	// Config with any third party dependancies
	var basic_config = function() {
		api.use(bodyParser.json());
		api.use(bodyParser.urlencoded({
  			extended: true
		}));
	};

	basic_config();
	api.use(auth_config);
	routes_config(api);
	api.listen(config.secrets.port);

};

/**
 * routes_config
 *
 * @desc - define all of the node.js routes in the webserver
 * @param app - express app
 */
function routes_config(app) {

  //Given an email address, send a verification email with a hash.
  // The hash is generated and stored locally.
	app.post('/send_email', routes.send_email);

  // Find a provided hash in the local LevelDB. If it exists, register
  //  the email on the Ethereum blockchain.
  app.get('/validate_email/:hash', routes.validate_email);

  // Generate a new pair of keys if a key was provided. Otherwise, Generate
  // a new keychain and return it.
  app.post('/get_keys', routes.get_keys);

  // Get latest block for testing purposes
  app.get('/block', routes.block);

};
