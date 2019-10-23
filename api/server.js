const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serverConfig = require('./server-config');
const PORT = serverConfig.Port;
const cors = require('cors');
const mongoose = require('mongoose');
const dbConfig = require('./db-config.js');
const userController = require('./controllers/users.controller');
const placeController = require('./controllers/places.controller');
const foodController = require('./controllers/foods.controller');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.DB, {useNewUrlParser: true }).then(
    () => {console.log('Database is connected')},
    err => { console.log('Can not connect to the database.'+err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/user', userController);
app.use('/place', placeController);
app.use('/food', foodController);

app.listen(serverConfig.Port, function(){
    console.log('Server is running on Port:',serverConfig.Port);
});