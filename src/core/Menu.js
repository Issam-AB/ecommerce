import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { API_URL } from '../config';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { isAntiticated } from '../auth/helpers';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: '#2a9d8f',
    };
  } else
    return {
      color: '#fff',
    };
};
const Menu = (props) => {
  const signout = () => {
    fetch(`${API_URL}/signout`)
      .then(() => {
        toastr.info('User SignOut', 'Next Time', {
          positionClass: 'toast-bottom-left',
        });
        localStorage.removeItem('jwt_info');
        props.history.push('/signin');
      })
      .catch();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand " href="/">
          Ecommerce
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <Fragment>
              <li className="nav-item ">
                <Link
                  style={isActive(props.history, '/')}
                  className="nav-link"
                  to="/"
                >
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  style={isActive(props.history, '/dashboard')}
                  className="nav-link"
                  to={`${
                    isAntiticated() && isAntiticated().user.role === 1
                      ? 'admin'
                      : ''
                  }/Dashboard`}
                >
                  Dashborad <span className="sr-only">(current)</span>
                </Link>
              </li>
            </Fragment>
          </ul>
          <ul className="navbar-nav ml-auto">
            {!isAntiticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    style={isActive(props.history, '/signin')}
                    className="nav-link"
                    to="/signin"
                  >
                    Connexion
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    style={isActive(props.history, '/signup')}
                    className="nav-link"
                    to="/signup"
                  >
                    Register
                  </Link>
                </li>
              </Fragment>
            )}

            <li className="nav-item">
              {isAntiticated() && (
                <span
                  className="nav-link"
                  onClick={signout}
                  style={{ cursor: 'pointer' }}
                >
                  Sign out
                </span>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default withRouter(Menu);
