import React from 'react';
import Layout from '../core/Layout';
import { isAntiticated } from '../auth/helpers';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAntiticated();

  const AdminInfo = () => {
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

  const AdminLinks = () => {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">User Links</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group">
              <Link className="nav-link" to="/create/category">
                Create Category
              </Link>
            </li>
            <li className="list-group">
              <Link className="nav-link" to="/create/product">
                Create Product
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
          <div className="col-md-3">{AdminLinks()}</div>
          <div className="col-md-9">{AdminInfo()}</div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashboard;
