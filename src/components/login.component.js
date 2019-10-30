import React, { Component } from 'react';
import {Router, Switch, Route} from 'react-router-dom';

import Loading from '../components/loading.component';

import { exportSpecifier } from '@babel/types';
import Auth from '../util/auth0';

class Login extends Component {
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
  render() {
    // calls the isAuthenticated method in authentication service
    const isAuthenticated = this.auth.isAuthenticated;
    if(window.location.pathname == '/auth-callback' && window.location.hash)
        this.handleAuthentication(window.location.hash)
    return (
      <div>
        {
          isAuthenticated() &&
          <div className="container column">
            <h5>
              You are logged in!{' '}
              <a
                style={{ cursor: 'pointer' }}
                onClick={this.logout}
              >
                Log Out
              </a>.
            </h5>
          </div>
        }
        {
          !isAuthenticated() && (
            <div className="container column">
              <h5>Esqueet - What's for lunch?</h5>
              <h5>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login}
                >
                  Log In
                </a>
                {' '}to continue.
              </h5>
            </div>
          )
        }
      </div>
      );
    }

}

export default Login;
