import React from 'react';
import Layout from '../core/Layout';
import { isAntiticated } from '../auth/helpers';
import { Link } from 'react-router-dom';

const Dashboard = () => {
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
            <li className="list-group-item">
              {role ? <strong>admin</strong> : <strong>user</strong>}
            </li>
          </ul>
        </div>
      </div>
    );
  };
  const purshaseHistory = () => {
    return (
      <>
        <br />
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Purshase HISTORY</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">zszsz</li>
              <li className="list-group-item">zszsz</li>
            </ul>
          </div>
        </div>
      </>
    );
  };
  const userLinks = () => {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">User Links</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group">
              <Link className="nav-link" to="/cart">
                My cart
              </Link>
            </li>
            <li className="list-group">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  const Name = (Nom) => {
    return (
      <p>
        welcome, &nbsp;
        <b style={{ fontWeight: 'bold' }}>{Nom}</b>
      </p>
    );
  };
  return (
    <div>
      <Layout title="Home Page" description={Name(name)} className="container">
        <div className="row">
          <div className="col-md-3">{userLinks()}</div>
          <div className="col-md-9">{userInfo()}</div>
          <div className="col-md-9 offset-md-3 mb-4">{purshaseHistory()}</div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
