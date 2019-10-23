import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import UserCreateView from './views/user.create';
import UserEditView from './views/user.edit';
import FoodCreateView from './views/food.create';
import FoodEditView from './views/food.edit';
import FoodIndexView from './views/food.index';
import GroupCreateView from './views/group.create';
import LunchCreateView from './views/lunch.create';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Esqueet</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link">Index</Link>
                </li>
              </ul>
            </div>
          </nav> <br/>
          <h2>Esqueet: Come on everybody just PICK a place to eat!</h2> <br/>
          <Switch>
            <Route exact path='/profile/new' component={ UserCreateView } />
            <Route path='/profile/edit/:id' component={ UserEditView } />
            <Route exact path='/food/new' component={ FoodCreateView } />
            <Route path='/food/edit/:id' component={ FoodEditView } />
            <Route exact path='/food/list' component={ FoodIndexView } />
            <Route exact path='/group/new' component={ GroupCreateView } />
            <Route exact path='/lunch/new' component={ LunchCreateView } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;