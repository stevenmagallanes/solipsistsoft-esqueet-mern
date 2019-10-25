let Place = require('../models/places.model');

// create new place
exports.new = function(req, res){
    let place = new Place(req.body);
    // TODO: Check for dulicate place names and throw error
    place.Name = req.body.Name;

    place.save(function(err, doc){
        if(err){
            res.status(400).send("Unable to save place to database: " + err);
        }
        else
        {
            res.status(200).json({'place': 'Place [' + place.Name + '] added successfully'});
        }
    });
};

// get all places
exports.index = function(req, res){
    Place.find(function(err, places){
        if(err){
            console.log(err);
        }
        else {
            res.json(places);
        }
    });
};

// get individual place
exports.view = function(req, res){
    let id = req.params.id;
    Place.findById(id, function(err, place){
        if(err){
            console.log(err);
        }
        else{
            res.json(place);
        }
    });
};

// update place
exports.update = function (req, res){
    Place.findById(req.params.id, function(err, place){
        if(!place)
            res.status(404).send("data is not found");
        else {
            place.Name = req.body.Name;

            // TODO: Implement SelectList component and use data to update food preferences

            // NOTE: No need to update the "IsActive" field here just yet.

            place.save().then(place=> {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send("unable to update the database");
            });
        }
    });
};

// delete place
exports.delete = function(req, res){
    Place.findById({_id: req.params.id}, function(err, place){
        if(err) res.json(err);
        else {
            place.IsActive = false;
            place.save().then(place=> {
                res.json("Successfully removed");
            })
        }
    });
};


