/* 
 * SUMMARY: This file acts as the entry point for our API server.
 *
 * For now, the server setup parameters will live in ./server-config.js
 */

// body-parser helps parse incoming requests into JSON for easier digestion
// TODO: Move logger into separate file
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });

const bodyParser = require('body-parser');
// we'll keep some of the API server's parameters in server-config.js
const serverConfig = require('./server-config');
const PORT = process.env.PORT || serverConfig.Port;
// cors layer for express
const cors = require('cors');
// mongoose acts as a data modeller for mongodb
const mongoose = require('mongoose');
// we'll keep some of the DB configuration in it's own file.  At least until we implement a repository pattern.  mwuhahaha
const dbConfig = require('./db-config.js');
// We use express as our http server
const express = require('express');
const app = express();
// for authorization, we're going to need to use jwt and jwks-rsa
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
 
// Let's get started.  We're going to need to initialize our database connection through mongoose:
mongoose.Promise = global.Promise;
// mongoose.set('debug', function(coll, method, query, doc){
//     console.log('Mongoose called - [Collection: ' + coll + '] - [Method: ' + method + '] - [Query: ' + query + '] - [Document: ' + doc + ']');
// });
mongoose.connect(dbConfig.DB, {useUnifiedTopology: true, useNewUrlParser: true })
    .then(function(){
        logger.add('Db connected successfully');
    })
    .catch(function(err){
        logger.error("Error connecting to db:" + err);
    });

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Authorization check via auth0
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://stevenmagallanes.auth0.com/.well-known/jwks.json'
  }),
  audience: 'com.solipsistsoft.esqueet.api',
  issuer: 'https://stevenmagallanes.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});

// Set up our http server
// Create our API mappings
let router = require ('./routes/routes');
app.use('/', router);

// Start listening for API requests
app.listen(serverConfig.Port, function(){
    console.log('Esqueet API server is running on Port:',serverConfig.Port);
});