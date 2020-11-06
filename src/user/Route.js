import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './Signin';
import SignUp from './Signup';
import Home from '../core/Home';
import Menu from '../core/Menu';

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
