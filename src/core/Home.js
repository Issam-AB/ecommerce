import React from 'react';
import Layout from './Layout';
import { isAntiticated } from '../auth/helpers';
import { Link } from 'react-router-dom';

const Home = () => {
  const {
    user: { name, email, role },
  } = isAntiticated();

  const userInfo = () => {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">User INFORMATION</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{name}</li>
            <li className="list-group-item">{email}</li>
            <li className="list-group-item">{role ? 'admin' : 'user'}</li>
          </ul>
        </div>
      </div>
    );
  };
  const purshaseHistory = () => {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Purshase HISTORY</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"></li>
            <li className="list-group-item"></li>
            <li className="list-group-item"></li>
          </ul>
        </div>
      </div>
    );
  };
  const userLinks = () => {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">User Links</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Link className="nav-link" to="/cart">
                My cart
              </Link>
            </li>
            <li className="list-group-item">
              <Link className="nav-link" to="/profile">
                My cart
              </Link>
            </li>
            <li className="list-group-item"></li>
          </ul>
        </div>
      </div>
    );
  };
  const Name = () => {
    return (
      <p>
        Welcome, &nbsp;<b style={{ fontWeight: 'bold' }}>{name}</b>
      </p>
    );
  };
  return (
    <div>
      <Layout title="Home Page" description={Name()} className="container">
        <div className="row">
          <div className="col-md-3">{userLinks()}</div>
          <div className="col-md-9">{userInfo()}</div>
          <div className="col-md-9 offset-md-3 mb-4">{purshaseHistory()}</div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
