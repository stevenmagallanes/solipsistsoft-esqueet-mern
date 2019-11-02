export default class UserRepository{
    authToken = '';
    constructor(authToken){
        // TODO: Move to configuration
        this.authToken = authToken;
        this.userAPIURI = 'http://localhost:4000/users';
    }
    async getUser(userTokenId){
        return await fetch(this.userAPIURI + '/' + userTokenId, {
            method: 'get',
            headers: {
                Authorization: 'Bearer ' + this.authToken,
            }
        }).then(async function(response){
            const res = await response.json()
            return res;
        });

        /*
        return new Promise((resolve, reject) => {
            fetch(this.userAPIURI + '/' + userTokenId, {
                method: 'get',
                'Authorization': this.authToken,
            })
            .then(function(data){
                var userData = JSON.parse(data);
                resolve( userData );
            })
            .catch(function(err){
                reject('Error retrieving user data: ' + err);
            });
        });
        */
    }

    updateUser(userJSON){
        return new Promise((resolve, reject) => {
            fetch(this.userAPIURI + '/' + userJSON.userTokenId, {
                method: 'post',
                'Authorization': this.authToken,
                data: userJSON // TODO: need to clean this
            })
            .then(function(data){
                //var userData = JSON.parse(data);
                resolve( 'User successfully updated' );
            })
            .catch(function(err){
                reject('Error updating user data: ' + err);
            });
        });
    }

    deleteUser(user){
        return new Promise((resolve, reject) => {
            fetch(this.userAPIURI + '/' + user.userTokenId, {
                method: 'delete',
                'Authorization': this.authToken,
            })
            .then(function(res){
                resolve( 'User successfully deleted: ' + res );
            })
            .catch(function(err){
                reject('Error deleting user data: ' + err);
            });
        });

    }

    createUser(userJSON){

    }
}