/*
 * SUMMARY: This file acts as the entry point for our web front end.
 * 
 * The esqueet app itself is using the MVC pattern so its views are found
 * in the /views folder.  Shared components are in the /components folder.
 * Business logic are handled by the controllers in the (you guessed it)
 * /controllers folder.
 * 
 * Since the data models are shared, they will be found up a folder, over
 * in the ../models folder.
 */
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/login.component';
import Navbar from './components/navbar.component';
import HomeView from './views/home';

// TODO: These views should be called in by their controllers, not by the main app.
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
        <Login />
        <Navbar />
        <div className="container">
          { /* TODO: Change the below <Switch> to change which controller the app uses, not which view. */}
          <Switch>
            <Route exact path='/' component={HomeView} />
            <Route exact path='/profile/new' component={UserCreateView} />
            <Route path='/profile/edit/:id' component={UserEditView} />
            <Route exact path='/food/new' component={FoodCreateView} />
            <Route path='/food/edit/:id' component={FoodEditView} />
            <Route exact path='/food/list' component={FoodIndexView} />
            <Route exact path='/group/new' component={GroupCreateView} />
            <Route exact path='/lunch/new' component={LunchCreateView} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;