 /*
 * API Controller for User entity.
 * NOTES - Since I'm using an "IsActive" flag to keep my entities around, 
 * I'm having trouble deciding on whether or not I should be allowing my API
 * to actually delete records or just mark them as IsActive.  And while doing so
 * should they be only pulling active records here from the API?
 */ 

let User = require('../models/users.model');

// create new user
exports.new = function(req, res){
    let user = new User(req.body);

    user.UserName = req.body.UserName;
    // TODO: Check for dulicate user names and throw error

    // TODO: Update password with hash + salt

    user.FirstName = req.body.FirstName;
    user.LastName = req.body.LastName;
    
    // TODO: Implement SelectList component and use data to update food preferences

    user.IsActive = true;   // default to active status

    user.save(function(err){
        if(err){
            res.status(400).send("unable to save to database:"+err);
        }
        else{
            res.status(200).json({'user': 'user in added successfully'});
        }
    });
};

// get all users
exports.index = function(req, res){
    User.get(function(err, users){
        if(err){
            console.log(err);
        }
        else {            
            res.json({
                status: "success",
                message: "Users retrieved successfully",
                data: users
            });
        }
    });
};

// get individual user
exports.view = function(req, res){
    let id = req.params.id;
    User.find({ AuthenticationTokenId : id }, function(err, user){
        if(err){
            console.log(err);
        }
        else{
            if(user && user.length > 0)
                res.json(user[0]);
        }
    });
};

// update user
exports.update = function (req, res){
    const id = req.params.id;
    User.find({ AuthenticationTokenId : id }, function(err, user){
        if(!user)
            res.status(404).send("data is not found");
        else {
            if(!req.body.UserName)
                res.status(400).send('Cannot update [UserName] to undefined');

            user.UserName = req.body.UserName;

            // TODO: Update password with hash + salt
            
            user.FirstName = req.body.FirstName;
            user.LastName = req.body.LastName;
            
            // TODO: Implement SelectList component and use data to update food preferences

            // NOTE: No need to update the "IsActive" field here just yet.

            user.save().then(user=> {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send("unable to update the database: "+err);
            });
        }
    });
};

// partial update user
exports.updatePartial = function (req, res){
    const id = req.params.id;
    User.find({ AuthenticationTokenId : id },function(err, user){
        if(!user)
            res.status(404).send("data is not found");
        else {
            if(req.body.UserName)
                user.UserName = req.body.UserName;
            // TODO: Check for dulicate user names and throw error

            // TODO: Update password with hash + salt
            
            if(req.body.FirstName)
                user.FirstName = req.body.FirstName;
            if(req.body.LastName)
                user.LastName = req.body.LastName;
            
            // TODO: Implement SelectList component and use data to update food preferences

            // NOTE: No need to update the "IsActive" field here just yet.

            user.save().then(user=> {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send("unable to update the database: "+err);
            });
        }
    });
};

// delete user
exports.delete = function(req, res){
    let id = req.params.id;
    User.find({ AuthenticationTokenId : id }, function(err, user){
        if(err) res.json(err);
        else {
            user.IsActive = false;
            user.save().then(user=> {
                res.json("Successfully removed");
            })
        }
    });
};

