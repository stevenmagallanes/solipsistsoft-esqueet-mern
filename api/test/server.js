var assert = require('assert');
var faker = require('faker');
var httpMocks = require('node-mocks-http');


describe('User Controller', function() {
    var UserModel, mongoose, dbConfig, userController, fakeUser;
    before(function(){
        UserModel = require('../models/users.model');
        mongoose = require('mongoose');
        dbConfig = require('../db-config');
        userController = require('../controllers/users.controller');
        mongoose.connect(dbConfig.DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then(done);
        fakeUser = {
            FirstName: faker.name.firstName,
            LastName: faker.name.lastName,
            Password: faker.internet.password(faker.random() * 15)
        };
        fakeUser.UserName = faker.internet.email(fakeUser.firstName, fakeUser.lastName);

    })
    describe('#create', function() {
        var testUser;
        it('new user should respond status:200', function(){
            var req = httpMocks.createRequest({
                method: 'POST',
                url: '/users/',
                body: fakeUser
            });
            var res = httpMocks.createResponse();

            userController.new(req, res);

            expect(res.statusCode).toBe(200);

        });
  });
});