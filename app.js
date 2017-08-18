'use strict';
// Hush Restful API 
// File: app.js
// This file contains the application code for the Hush Restful API
// It is commented to guide you through the code.
// Feel free to change whatever you need to, at your own risk.

// dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
// We will use dotenv here, to move the values within the .env file into a process.env file for execution within app.js.
const dotenv = require('dotenv');
dotenv.load();

// Required Libraries For Hush Restful API. These are mandatory to interact with the RPC-JSON server.
// The Bitcoin library is the most important dependency. Without it, this script will not function or communicate with the RPC-JSON server.
//
const changeCase = require('change-case');
const commands = require('./commands');
const bitcoin = require('bitcoin');
const _ = require('underscore');
const Hapi = require('hapi');
const e = module.exports;
e.ENV = process.env.NODE_ENV || 'production';

// We will require Hapi Server to manage multiple port connections and API routes.
// Below, you can change the port number for RPC-JSON, if you have changed it from the default configuration.
const thePort = parseInt(process.env.APP_PORT) || 8232;
const theIP = process.env.APP_IP;
//var server      = new Hapi.Server(+port, '0.0.0.0', { cors: true });
const server = new Hapi.Server();

server.connection({
    'host': theIP,
    'port': thePort
});

// Here we will create a new RISE Client, that will help Hapi Server process API routes and API server information.
const bitclient = new bitcoin.Client({
    host: process.env.RISE_HOST,
    port: process.env.RISE_PORT,
    user: process.env.RISE_USER,
    pass: process.env.RISE_PASS,
    timeout: 30000
});

function arrayifyArgsFromQuery(query) {
    let args = [];
    let newargs = [];

    if (query.args) {
        args = query.args.split(",");
    }

    args.forEach((arg) => {
        const number_as_float = parseFloat(arg);

        if (isNaN(number_as_float)) {
            newargs.push(arg);
        } else {
            newargs.push(number_as_float);
        }
    });

    return newargs;
}

function handleResponseThunk(req, res) {
  var ip = req.info.remoteAddress;
  console.log('Incoming request: ' + ip);
  return (err, data) => {
        if (err) {
            return res({
                code: 500,
                error: err
            });
        } else {
            return res(data);
        }
	}
}

// If JSON API response is an array, this handles the response.
_.each(commands, (value, cmd) => {
    const config = {
        handler: function (req, res) {
            let args = arrayifyArgsFromQuery(req.query);
            const handler = handleResponseThunk(req, res);

            args.push(handler);
            bitclient[cmd].apply(bitclient, args);

            // Return the response from the Hush server
            return res;
        }
    };

    server.route({
        method: 'GET',
        path: '/aos/' + changeCase.snakeCase(cmd),
        config: config
    });
});

// This function will start your Hush API server. 
server.start((err) => {
    if (err)
        throw err;

    console.log('Hush API server started at: ' + server.info.uri);
});

