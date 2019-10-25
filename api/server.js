/* 
 * SUMMARY: This file acts as the entry point for our API server.
 *
 * For now, the server setup parameters will live in ./server-config.js
 */

// body-parser helps parse incoming requests into JSON for easier digestion
const bodyParser = require('body-parser');
// we'll keep some of the API server's parameters in server-config.js
const serverConfig = require('./server-config');
const PORT = serverConfig.Port;
// cors layer for express
const cors = require('cors');
// mongoose acts as a data modeller for mongodb
const mongoose = require('mongoose');
// we'll keep some of the DB configuration in it's own file.  At least until we implement a repository pattern.  mwuhahaha
const dbConfig = require('./db-config.js');
// We use express as our http server
const express = require('express');
const app = express();
 
// Let's get started.  We're going to need to initialize our database connection through mongoose:
mongoose.Promise = global.Promise;
// mongoose.set('debug', function(coll, method, query, doc){
//     console.log('Mongoose called - [Collection: ' + coll + '] - [Method: ' + method + '] - [Query: ' + query + '] - [Document: ' + doc + ']');
// });
mongoose.connect(dbConfig.DB, {useUnifiedTopology: true, useNewUrlParser: true });
var db = mongoose.connection;
if(!db){
    console.log("Error connecting to db");
} else {
    console.log("Db connected successfully");
}

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up our http server
// Create our API mappings
let router = require ('./routes/routes');
app.use('/', router);

// Start listening for API requests
app.listen(serverConfig.Port, function(){
    console.log('Esqueet API server is running on Port:',serverConfig.Port);
});