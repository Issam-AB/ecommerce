import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAntiticated } from './helpers';

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAntiticated() && isAntiticated().user.role === 1 ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      )
    }
  />
);

export default AdminRoute;
