let Place = require('../models/places.model');
let Food = require('../models/foods.model');
// create new place
exports.new = function (req, res) {
    let place = new Place(req.body);
    // TODO: Check for dulicate place names and throw error
    place.Name = req.body.Name;

    place.save(function (err, doc) {
        if (err) {
            res.status(400).send("Unable to save place to database: " + err);
        }
        else {
            res.status(200).json({ 'place': 'Place [' + place.Name + '] added successfully' });
        }
    });
};

// get all places
exports.index = function (req, res) {
    Place.find(function (err, places) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(places);
        }
    });
};

// get individual place
exports.view = function (req, res) {
    let id = req.params.id;
    Place.findById(id, function (err, place) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(place);
        }
    });
};

// update place
exports.update = function (req, res) {
    Place.findById(req.params.id, function (err, place) {
        if (!place)
            res.status(404).send("data is not found");
        else {
            place.Name = req.body.Name;

            // TODO: Implement SelectList component and use data to update food preferences

            // NOTE: No need to update the "IsActive" field here just yet.

            place.save().then(place => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
};

// delete place
exports.delete = function (req, res) {
    Place.findById({ _id: req.params.id }, function (err, place) {
        if (err) res.json(err);
        else {
            place.IsActive = false;
            place.save().then(place => {
                res.json("Successfully removed");
            })
        }
    });
};

async function viewPlaceFoods(req, res) {
    const placeId = req.params.placeId;
    Place.findById(placeId)
        .then(place => {
            res.json(place.FoodsServed);
        })
        .catch(err => res.status(400).json(err));
}

function addPlaceFood(req, res) {
    const placeId = req.params.placeId;
    const foodId = req.params.foodId;

    Food.findById(foodId)
        .then(food => {
            if (!food) {
                res.status(404).json("No food found for id: [" + foodId + "]");
            }
            else {
                Place.findById(placeId)
                    .then(place => {
                        place.FoodsServed = place.FoodsServed || [];
                        if (!place.FoodsServed.id(foodId)) {
                            place.FoodsServed.push(food);
                            place.save().then(() => {
                                res.status(201).json("Food preference for [" + food.Name + "] added to place [" + place.Name + "]");
                            });
                        } else {
                            res.status(409).json("Food preference for [" + food.Name + "] already exists on place [" + place.Name + "]");
                        }
                    });
            }
        })
        .catch(err => res.json(err));

}

function removePlaceFood(req, res) {
    const placeId = req.params.placeId;
    const foodId = req.params.foodId;
    Place.findById(placeId)
        .then(place => {
            place.FoodsServed.id(foodId).remove();
            place.save().then(
                () => res.json("Food [" + foodId + "] successfully removed from [" + place.Name + "]")
            );
        })
        .catch(err => res.status(400).json(err));
}

function viewPlaceGroups(req, res) {

}

exports.registerRoutes = function () {
    // returns an array of objects describing the paths and verb-actions
    // provided by this controller.
    return [
        {
            'path': '/places/:placeId/foods',
            'actions': [
                {
                    'verb': 'get',
                    'action': viewPlaceFoods,
                    'permission': 'view:places'
                },
                {
                    'verb': 'post',
                    'action': addPlaceFood,
                    'permission': 'edit:places'
                },
            ]
        },
        {
            'path': '/places/:placeId/foods/:foodId',
            'actions': [
                {
                    'verb': 'post',
                    'action': addPlaceFood,
                    'permission': 'edit:places'
                },
                {
                    'verb': 'delete',
                    'action': removePlaceFood,
                    'permission': 'edit:places'
                },

            ]
        },
    ]
}
