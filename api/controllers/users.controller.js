/*
* API Controller for User entity.
* NOTES - Since I'm using an "IsActive" flag to keep my entities around, 
* I'm having trouble deciding on whether or not I should be allowing my API
* to actually delete records or just mark them as IsActive.  And while doing so
* should they be only pulling active records here from the API?
*/

const User = require('../models/users.model');
const Food = require('../models/foods.model');


// create new user
exports.new = function (req, res) {
    let user = new User(req.body);

    user.UserName = req.body.UserName;

    user.FirstName = req.body.FirstName;
    user.LastName = req.body.LastName;

    // TODO: Implement SelectList component and use data to update food preferences

    user.IsActive = true;   // default to active status

    user.save(function (err) {
        if (err) {
            res.status(409).send("unable to save to database:" + err);
        }
        else {
            res.status(200).json({ 'user': 'user in added successfully' });
        }
    });
};

// get all users
exports.index = function (req, res) {
    User.find()
        .then((users) => {
            res.json({
                status: "success",
                message: "Users retrieved successfully",
                data: users
            });
        })
        .catch(err => res.status(400).json(err));
};

// get individual user
exports.view = function (req, res) {
    let id = req.params.id;
    User.findOne({ AuthenticationTokenId: id })
        .then((user) => {
            res.json(user);
        })
        .catch(err => res.status(400).json(err));
};

// update user
exports.update = function (req, res) {
    const id = req.params.id;
    User.find({ AuthenticationTokenId: id })
        .then(user => {
            if (!user)
                res.status(404).send("data is not found");
            else {
                if (!req.body.UserName)
                    res.status(400).send('Cannot update [UserName] to undefined');

                user.UserName = req.body.UserName;

                // TODO: Update password with hash + salt

                user.FirstName = req.body.FirstName;
                user.LastName = req.body.LastName;

                // TODO: Implement SelectList component and use data to update food preferences

                // NOTE: No need to update the "IsActive" field here just yet.

                user.save()
                    .then(user => {
                        res.json('Update complete');
                    })
                    .catch(err => {
                        res.status(400).send("unable to update the database: " + err);
                    });
            }
        })
        .catch(err => res.status(400).json(err));
};

// partial update user
exports.updatePartial = function (req, res) {
    const id = req.params.id;
    User.find({ AuthenticationTokenId: id })
        .then(user => {
            if (!user)
                res.status(404).send("data is not found");
            else {
                if (req.body.UserName)
                    user.UserName = req.body.UserName;
                // TODO: Check for dulicate user names and throw error

                // TODO: Update password with hash + salt

                if (req.body.FirstName)
                    user.FirstName = req.body.FirstName;
                if (req.body.LastName)
                    user.LastName = req.body.LastName;

                // TODO: Implement SelectList component and use data to update food preferences

                // NOTE: No need to update the "IsActive" field here just yet.

                user.save()
                    .then(user => {
                        res.json('Update complete');
                    })
                    .catch(err => res.status(400).send("unable to update the database: " + err));
            }
        })
        .catch(err => res.status(400).json(err));
};

// delete user
exports.delete = function (req, res) {
    const id = req.params.id;
    User.find({ AuthenticationTokenId: id })
        .then(user => {
            user.IsActive = false;
            user.save()
                .then(user => {
                    res.json("Successfully removed");
                })
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
};

async function viewUserFoods(req, res) {
    const userId = req.params.userId;
    User.find({ AuthenticationTokenId: userId })
        .then(user => {
            res.json(user.FoodPreferences);
        })
        .catch(err => res.status(400).json(err));
}

function addUserFood(req, res) {
    const userId = req.params.userId;
    const foodId = req.params.foodId;

    Food.findById(foodId)
        .then(food => {
            if (!food) {
                res.status(404).json("No food found for id: [" + foodId + "]");
            }
            else {
                User.findOne({ AuthenticationTokenId: userId })
                    .then(user => {
                        user.FoodPreferences = user.FoodPreferences || [];
                        if (!user.FoodPreferences.id(foodId)) {
                            user.FoodPreferences.push(food);
                            user.save().then(() => {
                                res.status(201).json("Food preference for [" + food.Name + "] added to user [" + user.UserName + "]");
                            });
                        } else {
                            res.status(409).json("Food preference for [" + food.Name + "] already exists on user [" + user.UserName + "]");
                        }
                    });
            }
        })
        .catch(err => res.json(err));

}

function removeUserFood(req, res) {
    const userId = req.params.userId;
    const foodId = req.params.foodId;
    User.findOne({ AuthenticationTokenId: userId })
        .then(user => {
            user.FoodPreferences.id(foodId).remove();
            user.save().then(
                () => res.json("Food successfully removed")
            );
        })
        .catch(err => res.status(400).json(err));
}

function viewUserGroups(req, res) {

}

exports.registerRoutes = function () {
    // returns an array of objects describing the paths and verb-actions
    // provided by this controller.
    return [
        {
            'path': '/users/:userId/foods',
            'actions': [
                {
                    'verb': 'get',
                    'action': viewUserFoods,
                    'permission': 'edit:selfPreferences'
                },
                {
                    'verb': 'post',
                    'action': addUserFood,
                    'permission': 'edit:selfPreferences'
                },
            ]
        },
        {
            'path': '/users/:userId/foods/:foodId',
            'actions': [
                {
                    'verb': 'post',
                    'action': addUserFood,
                    'permission': 'edit:selfPreferences'
                },
                {
                    'verb': 'delete',
                    'action': removeUserFood,
                    'permission': 'edit:selfPreferences'
                },

            ]
        },
        {
            'path': '/users/:userId/groups',
            'actions': [
                {
                    'verb': 'get',
                    'action': viewUserGroups,
                    'permission': 'edit:selfPreferences'
                }
            ]
        }
    ]
}