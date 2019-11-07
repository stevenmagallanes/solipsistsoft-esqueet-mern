import React, { Component } from 'react';
import Auth from '../util/auth0';
import { Link } from 'react-router-dom';
import UserRepository from '../repository/user.repository';
import Log from '../util/logger';

class Login extends Component {
    state = {
        UserName: 'Friend'
    };

    handleAuthentication = (hash) => {
        if (/access_token|id_token|error/.test(hash)) {
            this.auth.handleAuthentication();
        }
    }
    auth = new Auth();
    // calls the login method in authentication service
    login = () => {
        this.auth.login();
    }
    // calls the logout method in authentication service
    logout = () => {
        this.auth.logout();
    }

    componentDidMount() {
        if (window.location.pathname === '/auth-callback' && window.location.hash) {
            this.handleAuthentication(window.location.hash);
        }

        const authToken = localStorage.getItem('access_token');
        if (authToken) {
            const jwt = require('jsonwebtoken');
            const jwksClient = require('jwks-rsa');
            var jClient = jwksClient({ jwksUri: 'http://stevenmagallanes.auth0.com/.well-known/jwks.json' });
            function getKey(header, callback) {
                jClient.getSigningKey(header.kid, function (err, key) {
                    if (err) {
                        Log.error(err);
                    }
                    else {
                        var signingKey = key.publicKey || key.rsaPublicKey;
                        callback(null, signingKey);
                    }
                });
            }

            const options = {
                algorithms: ['RS256'],
                complete: false,
                ignoreExpiration: false,
                ignoreNotBefore: false,
                clockTolerance: 20
            };

            const loginComponent = this;
            jwt.verify(authToken, getKey, options, async function (err, decoded) {
                if (err) {
                    Log.error(err);
                }
                else {
                    const authTokenJson = decoded;
                    if (authTokenJson && authTokenJson.sub && String(authTokenJson.sub).indexOf('|') > 0) {
                        const authUserId = String(authTokenJson.sub).split('|')[1];

                        // Need to tie the token to a User record in the database
                        const userRepo = new UserRepository(authToken);
                        const userData = await userRepo.getUser(authUserId);
                        if (userData && userData.FirstName) {
                            loginComponent.setState({ UserName: userData.FirstName });
                        }
                        else {
                            // if we get here an the user cannot be found, we should probably create a new user
                        }
                    }
                }
            });

            //const authTokenIsValid = jwt.verify(authToken, 'jL1QxszjU-32mw7ctQnL28wkdIvlGVjb7bGiAb48ZRhwApGW6_XCq6R85JxG-C8E', options);

        }
    }

    render() {
        // calls the isAuthenticated method in authentication service
        const isAuthenticated = this.auth.isAuthenticated;

        return (
            <div>
                {
                    isAuthenticated() &&
                    <div className="container column">
                        <h5>
                            You are logged in!{' ' + this.state.UserName + ' '}
                            <Link to='/'
                                style={{ cursor: 'pointer' }}
                                onClick={this.logout}
                            >Log Out</Link>.
            </h5>
                    </div>
                }
                {
                    !isAuthenticated() && (
                        <div className="container column">
                            <h5>Esqueet - What's for lunch?</h5>
                            <h5>
                                You are not logged in! Please{' '}
                                <Link to="/"
                                    style={{ cursor: 'pointer' }}
                                    onClick={this.login}
                                >Log In</Link>
                                {' ' + this.state.UserName} to continue.
              </h5>
                        </div>
                    )
                }
            </div>
        );
    }

}

export default Login;
