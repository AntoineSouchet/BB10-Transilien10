/**
 * @module common/request
 */
'use strict';

var http = require('http');
var https = require('https');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');
var util = require('util');

var properties = require('../configuration/properties');
var logger = require('../common/loggers.js');
var stringutil = require('../common/string.js');
var arrayutil = require('../common/arrays.js');
var StringWriter = stringutil.StringWriter;

// Config in an object for testing reasons.
var config = {
	serverUrl : url.parse(properties.get('connections.server.url')),
	userAgent : properties.get('connections.agent.user-agent'),
	readTimeout : properties.get('connections.agent.sync.timeout.read', 30000),

	ssl : null
}

if (config.serverUrl.protocol === 'https:') {
	config.ssl = {};
	
	config.ssl.pfxPath            = properties.get('connections.server.https.pfx');
	config.ssl.keyPath            = properties.get('connections.server.https.key');
	config.ssl.passphrase         = properties.get('connections.server.https.passphrase');
	config.ssl.certPath           = properties.get('connections.server.https.cert');
	config.ssl.caPath             = properties.get('connections.server.https.ca');
	config.ssl.rejectUnauthorized = properties.getAsBoolean('connections.server.https.rejectUnauthorized', true);
	config.ssl.ciphers            = properties.get('connections.server.https.ciphers');
	config.ssl.secureProtocol     = properties.get('connections.server.https.secureProtocol');

	
	if (!config.ssl.rejectUnauthorized) {
		logger.warn('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
		logger.warn('!!!! Connections agent configured to !!!!');
		logger.warn('!!!!      accept all server ssl      !!!!');
		logger.warn('!!!!          certificates           !!!!');
		logger.warn('!!!!  DO NOT USE THIS IN PRODUCTION  !!!!');
		logger.warn('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	}
	if (config.ssl.pfxPath) {
		try{
			config.ssl.pfx = fs.readFileSync(config.ssl.pfxPath);
		}catch(e){
			logger.error('Could not read pkcs12 file from filesystem at "' + config.ssl.pfxPath + '"');
			logger.error('Please verify it is a valid PCKS12 file.')
			process.exit(1);
		}
	} else if (config.ssl.keyPath && config.ssl.certPath) {
		try{
			config.ssl.key = fs.readFileSync(config.ssl.keyPath);
		}catch(e){
			logger.error('Could not read private key file from filesystem at "' + config.ssl.keyPath + '"');
			logger.error('Please verify it is a private key in PEM format.')
			process.exit(1);
		}
		try{
			config.ssl.cert = fs.readFileSync(config.ssl.certPath);
		}catch(e){
			logger.error('Could not read public certificate file from filesystem at "' + config.ssl.keyPath + '"');
			logger.error('Please verify it is a public certificate in PEM format.')
			process.exit(1);
		}
	} else if (config.ssl.keyPath) {
		logger.error('Missing "connections.server.https.cert" property.');
		process.exit(1);
	} else if (config.ssl.certPath) {
		logger.error('Missing "connections.server.https.key" property.');
		process.exit(1);
	} else {
		logger.error('No certificate / pkcs12 file specified, please provide the necessary files for https.');
		process.exit(1);
	}
	
	if(config.ssl.caPath){
		var cas = config.ssl.caPath.split(',');
		config.ssl.ca = [];
		
		cas.forEach(function(elem){
			try{
				config.ssl.ca.push(fs.readFileSync(elem));
			}catch(e){
				logger.error('Could not read public certificate file of CA from filesystem at "'+ elem +'"');
				process.exit(1);
			}
		});
	}
}

/**
 * Translate various low level error codes to the common error object of the
 * application ( useful for high level error handling ) The error codes will use
 * the follow prefixes :
 * <ul>
 * <li><code>ERROR_SSL_*</code> : SSL related errors ( bad certificates ... )</li>
 * <li><code>ERROR_CONNECTION_*</code> : Errors while trying to connect to
 * the server </li>
 * <li><code>ERROR_READ_*</code> : Errors while reading response from the
 * server</li>
 * </ul>
 * 
 * @param error
 */
function handleError(error, request, callback) {
    var serverUrl = url.parse(properties.get('connections.server.url'));

    // Trying to check various errors. Note that as nodejs often just send back
	// the raw error,
	// some detection may depend on the implementation, and thus can break on
	// later node.exe update.
	// SSL Errors
	if (error && error.message === 'CERT_HAS_EXPIRED') {
		var err = new Error('Could not trust server "'  + serverUrl.host +  '" certificate. Certificate has expired')
		err.code = 'ERROR_SSL_CERT_HAS_EXPIRED';
		err.origin = error;
	} else if (error && error.message === 'SELF_SIGNED_CERT_IN_CHAIN') {
		var err = new Error('Could not trust server "'  + serverUrl.host +  '" certificate.');
		err.code = 'ERROR_SSL_BAD_SERVER_CERTIFICATE';
		err.origin = error;
	} else if (error && error.message === 'mac verify failure') {
		var err = new Error( 'Could not open certificate. Did you specify a wrong password ?');
		err.code = 'ERROR_SSL_COULD_NOT_OPEN_CERT';
		err.origin = error;
	} else if (error && error.message === 'Hostname/IP doesn\'t match certificate\'s altnames') {
		var err = new Error( 'Could not initiate a secured connection: server "' + serverUrl.host + '" hostname/ip doesn\'t match the certificate\'s altnames.');
		err.code = 'ERROR_SSL_BAD_HOSTNAME';
		err.origin = error;
	}else if (error && stringutil.contains(error.message, 'handshake failure')) {
		var err = new Error( 'Could not initiate a secured connection: server "' + serverUrl.host + '" error while initializing secured connection. Please verify the agent certificates and configuration.' );
		err.code = 'ERROR_SSL_HANDSHAKE_FAIL';
		err.origin = error;
	}else if (error && stringutil.contains(error.message, 'unknown ca')) {
		var err = new Error( 'Could not initiate a secured connection: certificate\'s CA is not recognized by the agent. Please verify the agent certificates and configuration.' );
		err.code = 'ERROR_SSL_HANDSHAKE_FAIL';
		err.origin = error;
	} else if (error && stringutil.contains(error.message, 'GET_SERVER_HELLO:unknown protocol')) {
		var err = new Error(
				'Could not initiate a secured connection: server "' + serverUrl.host + '" do not seems to support https.');
		err.code = 'ERROR_SSL_SERVER_DOES_NOT_SUPPORT_SSL';
		err.origin = error;
	}

	// CONNECTION Errors
	else if (error && error.code === 'ENOTFOUND') {
		var err = new Error('Server "' + serverUrl.host + '" could not be resolved ( bad hostname ? ).');
		err.code = 'ERROR_CONNECTION_HOST_RESOLUTION';
		err.origin = error;
	}
	else if (error && error.code === 'ECONNREFUSED') {
		var err = new Error('Connection to server "' + serverUrl.host + '" was refused.');
		err.code = 'ERROR_CONNECTION_REFUSED';
		err.origin = error;
	} else if (error && error.code === 'ECONNRESET' && !request.isInTimeout) {
		var err = new Error('Connection to server "' + serverUrl.host + '"  was reset. Did you try to synchronize to an https server in http or client certificate is incorrect ( bad hostname / expired ) ?');
		err.code = 'ERROR_CONNECTION_RESET';
		err.origin = error;
	}

	// READ Errors
	else if (error && error.code === 'ECONNRESET' && request.isInTimeout) {
		var err = new Error(
				'Socket timeout while exchanging data with server "'  + serverUrl.host + '"');
		err.code = 'ERROR_READ_TIMEOUT';
	} else {
		var err = new Error('Unknown error, see "origin" property');
		err.code = 'ERROR_UNKNOWN';
		err.origin = error;
	}

	// if we got an error handler callback, we use it, if not 
	// we throw the error.
	if (callback) {
		callback(err);
	} else{
		throw err;
	}
}

function buildPath(path, params, autocontext) {
    var serverUrl = url.parse(properties.get('connections.server.url'));
	if (autocontext){
		path = serverUrl.path + path;
	}
	if (params) {
		path = path + '?' + qs.stringify(params);
	}
	if (! stringutil.startsWith(path,'/')){
		path = '/' + path;
	}
	return path;
}

/**
 * Creates a new HTTP/HTTPS request to the connections server.
 * 
 * @param {Object}
 *            options - Parameters of the request
 * @param {String}
 *            options.method - HTTP request method ( 'GET', 'POST', etc ... );
 * @param {String}
 *            options.path - Path of the request ( without hostname or port )
 * @param {Boolean}
 *            options.autocontext - Indicates if the request API should use the connection server context ( '/connections' ). Defaults to true.
 * @param {Object}
 *            options.params - Parameters of the request (
 *            ?param1=value&param2&value ) as a querystring object ( see
 *            http://nodejs.org/api/querystring.html )
 */
exports.request = function(options, callback) {
    var serverUrl = url.parse(properties.get('connections.server.url'));
	// Default HTTP method to GET
	// Default autocontext to true
	options = options ? options : {};
	options.method = options.method ? options.method : 'GET';
	options.autocontext = typeof options.autocontext !== 'undefined' ? options.autocontext : true;
	var reqOptions = {
		hostname : serverUrl.hostname,
		port : serverUrl.port,
		path : buildPath(options.path, options.params, options.autocontext ),
		headers : {
			'Content-type' : options.contentType ? options.contentType : 'application/json',
			'User-Agent' : config.userAgent,
			'If-None-Match' : options.etag
		},
		method : options.method
	}
	
	var request = null;

	if (config.ssl) {
		// see https://github.com/joyent/node/pull/4834#issuecomment-13981250
		util._extend(reqOptions, config.ssl);
		request = https.request(reqOptions);
	} else {
		request = http.request(reqOptions);
	}
	// Setting up timeout values ( inactivity )
	request.setTimeout(config.readTimeout, function() {
		request.isInTimeout = true;
		request.abort();
	})

	util._extend(request, {
		body     : addBody,
		asObject : asObject,
		asString : asString,
		toWriter : toWriter
	});

	return request;
}

/**
 * Helper method to execute a request, and returning the response without any other processing.
 * @param {Function} callback - callback of the method. First callback param is the error object, second is the response object.
 */
function execute(callback){
	var self = this;
	
	self.on('error', function(err){
		handleError(err, self, callback);
	})
	
	self.on('response', function(response){
		callback(null, response);
	});
}

/**
 * Helper method to retrieve a distant JSON resource, and parse it to javascript object.
 * @param {Function} callback - callback of the method. First callback param is the error object, second is the javascript object, third is the response object.
 */
function asObject(callback) {
	// The 'this' object here should be a ClientRequest context 
	// ( http://nodejs.org/api/http.html#http_class_http_clientrequest )
	var self = this;
	
	self.on('error', function(err){
		handleError(err, self, callback)
	})
	
	self.on('response', function(response) {
		var writer = new StringWriter();
		response.pipe(writer);
		writer.on('finish', function() {
			// If response is valid Json parse it, otherwise null it. 
			// Ugly but the other way to do it would be with regexp,
			// and that might be costly and/or unreadable.
			try {
				callback(null, writer.toObject(), response);
			} catch (err) {
				callback(null, null, response);
			}
		})
	});
	// Need this to indicate that the request needs to be send
	self.end();
}

/**
 * Helper method to retrieve a distant string resource. 
 * @param {Function} callback - callback of the method. First callback param is the error object, second is the string, third is the response object.
 */
function asString(callback) {
	var self = this;
	
	self.on('error', function(err){
		handleError(err, self, callback);
	})
	
	self.on('response', function(response) {
		var writer = new StringWriter();
		response.pipe(writer);
		writer.on('finish', function() {
			callback(null, writer.toString(), response);
		});
	});
	// Need this to indicate that the request needs to be send
	self.end();
}

/**
 * Helper method to retrieve a distant resource, and write it to a stream
 * @param {Object} stream - Writable stream to get the resource. 
 * @param {Function} callback - callback of the method. First callback param is the error object, second is the response object.
 */
function toWriter(stream, callback) {
	var self = this;
	
	self.on('error', function(err){
		handleError(err, self, callback);
	});
	
	self.on('response', function(response) {
		response.pipe(stream);
		stream.on('finish', function() {
			callback(null, response);
		});
	});
	// Need this to indicate that the request needs to be send
	self.end();
}

function addBody(body) {
	// If the body is a Buffer or a string, we pass it directly,
	// if it's a javascript object, we marshall it to json.
	// Anything else is ignored.
	if (Buffer.isBuffer(body) || typeof body === 'string') {
		this.write(body);

	} else if (typeof body === 'object') {
		this.write(JSON.stringify(body));
	}
	return this;
}

/**
 * Shortcut to create a POST request
 */
exports.post = function(options) {
	if (options === null) {
		return null;
	}
	options.method = 'POST';
	return exports.request(options);
}

/**
 * Shortcut to create a GET request
 */
exports.get = function(options) {
	if (options === null) {
		return null;
	}
	options.method = 'GET';
	return exports.request(options);
}

/**
 * For testing purpose
 */
exports._conf = config;
