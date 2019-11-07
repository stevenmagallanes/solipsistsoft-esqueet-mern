export default class UserRepository {
    authToken = '';
    constructor(authToken) {
        // TODO: Move to configuration
        this.authToken = authToken;
        this.userAPIURI = 'http://localhost:4000/users';
    }
    async getUser(userTokenId) {
        let response = await fetch(this.userAPIURI + '/' + userTokenId, {
            method: 'get',
            headers: {
                Authorization: 'Bearer ' + this.authToken,
            }
        })
        response = await response.json();
        return response;
    }

    async updateUser(userJSON) {
        try {
            await fetch(this.userAPIURI + '/' + userJSON.userTokenId, {
                method: 'post',
                headers: {
                    Authorization: 'Bearer ' + this.authToken,
                },
                body: userJSON // TODO: need to clean this
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    async deleteUser(user) {
        try {
            await fetch(this.userAPIURI + '/' + user.userTokenId, {
                method: 'delete',
                headers: {
                    Authorization: 'Bearer ' + this.authToken,
                }
            });
        }
        catch (err) {
            console.log('Error deleting user data: ' + err)
        }
    }

    async createUser(userJSON) {
        try {
            await fetch(this.userAPIURI, {
                method: 'post',
                headers: {
                    Authorization: 'Bearer ' + this.authToken,
                },
                body: userJSON, // TODO: need to clean/validate this
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}