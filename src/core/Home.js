import React from 'react';
import Layout from './Layout';
import { isAntiticated } from '../auth/helpers';

const Home = () => {
  const {
    user: { name, email, role },
  } = isAntiticated();
  return (
    <div>
      <Layout
        title="Home Page"
        description="Node react Ecommerce app"
        className="container"
      >
        <div className="row">
          <div className="col-md-6">
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
          </div>
          <div className="col-md-6">
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
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
