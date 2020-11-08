import React, { useState } from 'react';
import Layout from '../core/Layout';
import { API_URL } from '../config';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import {isAntiticated} from '../auth/helpers';

const Signin = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const hadlChnange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const submitSignin = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toastr.warning(res.error, 'please check form !', {
            positionClass: 'toast-bottom-left',
          });
        } else {
          toastr.info('User is authenticated SuccessFully', 'Welcome', {
            positionClass: 'toast-bottom-left',
          });
          localStorage.setItem('jwt_info', JSON.stringify(res));
          props.history.push(`${isAntiticated() && isAntiticated().user.role === 1 ? '/dashboard' : '/'}`);
        }
      })
      .catch((err) => {
        toastr.error(err, 'Server Error !', {
          positionClass: 'toast-bottom-left',
        });
      });
  };
  const form = () => (
    <form onSubmit={submitSignin}>
      <div className="form-group">
        <label htmlFor="email" className="text-muted">
          email
        </label>
        <input
          type="text"
          className="form-control"
          id="email"
          onChange={hadlChnange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="text-muted">
          password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          onChange={hadlChnange}
        />
      </div>
      <input
        type="submit"
        className="btn btn-lg btn btn-block btn-outline-info"
        value="Sign In"
      />
    </form>
  );

  return (
    <div>
      <Layout
        title="Sign In Page"
        description="Sign In React Ecommerce App"
        className="container"
      >
        <div className="row">
          <div className="col-md-6 mx-auto">{form()}</div>
        </div>
      </Layout>
    </div>
  );
};

export default Signin;
