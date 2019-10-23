/* 
 * SUMMARY: This file acts as the entry point for our API server.
 *
 * For now, the server setup parameters will live in ./server-config.js
 */

 // We use express as our http server
const express = require('express');
const app = express();
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

// Entity controllers handle the API routing
const userController = require('./controllers/users.controller');
const placeController = require('./controllers/places.controller');
const foodController = require('./controllers/foods.controller');

// Let's get started.  We're going to need to initialize our database connection through mongoose:
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.DB, {useNewUrlParser: true }).then(
    () => {console.log('Database is connected')},
    err => { console.log('Can not connect to the database.'+err)}
);

// Set up our http server
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Create our API mappings
app.use('/user', userController);
app.use('/place', placeController);
app.use('/food', foodController);

// Start listening for API requests
app.listen(serverConfig.Port, function(){
    console.log('Server is running on Port:',serverConfig.Port);
});