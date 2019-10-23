const express = require('express');
const userRoutes = express.Router();

let users = require('../../models/users.model');

// store route
userRoutes.route('/add').post(function(req, res){
    let user = new user(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user in added successfully'});
        })
        .catch(err =>{
            res.status(400).send("unable to save to database");
        });
});

// get data (index) route
userRoutes.route('/').get(function(req, res){
    users.find(function(err, users){
        if(err){
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
});

// edit route
userRoutes.route('/edit/:id').get(function(req, res){
    let id = req.params.id;
    users.findById(id, function(err, user){
        if(err){
            console.log(err);
        }
        else{
            res.json(user);
        }
    });
});

// update route
userRoutes.route('/update/:id').post(function (req, res){
    users.findById(req.params.id, function(err, user){
        if(!user)
            res.status(404).send("data is not found");
        else {
            //user.name = req.body.user_name;

            user.save().then(user=> {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});

// delete route
userRoutes.route('/delete/:id').get(function(req, res){
    users.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if(err) res.json(err);
        else res.json("Successfully removed");
    });
});

module.exports = userRoutes;