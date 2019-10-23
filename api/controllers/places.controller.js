const express = require('express');
const placeRoutes = express.Router();

let places = require('../../models/places.model');

// store route
placeRoutes.route('/add').post(function(req, res){
    let place = new place(req.body);
    place.save()
        .then(place => {
            res.status(200).json({'place': 'place in added successfully'});
        })
        .catch(err =>{
            res.status(400).send("unable to save to database");
        });
});

// get data (index) route
placeRoutes.route('/').get(function(req, res){
    places.find(function(err, places){
        if(err){
            console.log(err);
        }
        else {
            res.json(places);
        }
    });
});

// edit route
placeRoutes.route('/edit/:id').get(function(req, res){
    let id = req.params.id;
    places.findById(id, function(err, place){
        if(err){
            console.log(err);
        }
        else{
            res.json(place);
        }
    });
});

// update route
placeRoutes.route('/update/:id').post(function (req, res){
    places.findById(req.params.id, function(err, place){
        if(!place)
            res.status(404).send("data is not found");
        else {
            //place.name = req.body.place_name;

            place.save().then(place=> {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});

// delete route
placeRoutes.route('/delete/:id').get(function(req, res){
    places.findByIdAndRemove({_id: req.params.id}, function(err, place){
        if(err) res.json(err);
        else res.json("Successfully removed");
    });
});

module.exports = placeRoutes;