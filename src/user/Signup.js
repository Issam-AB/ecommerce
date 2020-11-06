import React, { useState } from 'react';
import Layout from '../core/Layout';
import { API_URL } from '../config';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const Signup = (props) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const hadlChnange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const submitSignup = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/signup`, {
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
          toastr.success('User is Created SuccessFully', 'New Account', {
            positionClass: 'toast-bottom-left',
          });
          props.history.push('/signin');
        }
      })
      .catch((err) => {
        toastr.error(err, 'Server Error !', {
          positionClass: 'toast-bottom-left',
        });
      });
  };
  const form = () => (
    <form onSubmit={submitSignup}>
      <div className="form-group">
        <label htmlFor="name" className="text-muted">
          name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          onChange={hadlChnange}
        />
      </div>
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
        className="btn btn-lg btn btn-block btn-outline-dark"
        value="Sign Up"
      />
    </form>
  );

  return (
    <div>
      <Layout
        title="Sign up Page"
        description="Sign up react Ecommerce app"
        className="container"
      >
        <div className="row">
          <div className="col-md-6 mx-auto">{form()}</div>
        </div>
      </Layout>
    </div>
  );
};

export default Signup;
