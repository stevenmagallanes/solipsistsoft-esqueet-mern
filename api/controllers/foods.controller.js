const express = require('express');
const foodRoutes = express.Router();

let foods = require('../../models/foods.model');

// store route
foodRoutes.route('/add').post(function(req, res){
    let food = new food(req.body);
    food.save()
        .then(food => {
            res.status(200).json({'food': 'food in added successfully'});
        })
        .catch(err =>{
            res.status(400).send("unable to save to database");
        });
});

// get data (index) route
foodRoutes.route('/').get(function(req, res){
    foods.find(function(err, foods){
        if(err){
            console.log(err);
        }
        else {
            res.json(foods);
        }
    });
});

// edit route
foodRoutes.route('/edit/:id').get(function(req, res){
    let id = req.params.id;
    foods.findById(id, function(err, food){
        if(err){
            console.log(err);
        }
        else{
            res.json(food);
        }
    });
});

// update route
foodRoutes.route('/update/:id').post(function (req, res){
    foods.findById(req.params.id, function(err, food){
        if(!food)
            res.status(404).send("data is not found");
        else {
            food.name = req.body.food_name;

            food.save().then(food=> {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});

// delete route
foodRoutes.route('/delete/:id').get(function(req, res){
    foods.findByIdAndRemove({_id: req.params.id}, function(err, food){
        if(err) res.json(err);
        else res.json("Successfully removed");
    });
});

module.exports = foodRoutes;