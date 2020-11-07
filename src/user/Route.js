import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './Signin';
import SignUp from './Signup';
import Home from '../core/Home';
import Menu from '../core/Menu';
import Dashboard from './Dashboard';
import PrivateRoute from '../auth/PrivateRouter';

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
