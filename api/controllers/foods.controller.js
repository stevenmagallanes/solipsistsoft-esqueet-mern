let Food = require('../models/foods.model');

// create new food
exports.new = function(req, res){
    let food = new Food(req.body);
    
    food.Name = req.body.Name;
    // TODO: Check for dulicate food names and throw error

    food.IsActive = true; // Default to active state
    food.save((err, doc) => {
        if(err){
            res.status(400).send("Unable to save food to database: " + err);
        }
        else
        {
            res.status(200).json({'food': 'Food [' + doc.Name + '] added successfully'});
        }
    });
};

// get all foods
exports.index = function(req, res){
    Food.find({IsActive: true}, function(err, foods){
        if(err){
            console.log(err);
        }
        else {
            res.json(foods);
        }
    });
};

// get individual food
exports.view = function(req, res){
    let id = req.params.id;
    Food.findById(id, function(err, food){
        if(err){
            console.log(err);
        }
        else{
            res.json(food);
        }
    });
};

// update food
exports.update = function (req, res){
    Food.findById(req.params.id, function(err, food){
        if(!food)
            res.status(404).send("data is not found");
        else {
            food.Name = req.body.Name;

            food.save(err => {
                if(err) res.status(400).send("Unable to save food to database: " + err);
                else res.json('Update complete');
            });
        }
    });
};

// delete food
exports.delete = function(req, res){
    Food.findById({_id: req.params.id}, function(err, food){
        if(err) res.json(err);
        else {
            food.IsActive = false;
            food.save().then(food=> {
                res.json("Successfully removed");
            })
        }
    });
};

