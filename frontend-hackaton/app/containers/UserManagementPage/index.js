import React from 'react';
import PageLayout from 'common/PageLayout';
import UsersTableContainer from 'users/UsersTableContainer';
import { Input } from 'antd';

/* eslint-disable react/prefer-stateless-function */
export class UserManagementPage extends React.PureComponent {
  render() {
    return (
      <PageLayout>
        <div style={{ display: 'flex' }}>
          <div style={{ maxWidth: 300, marginRight: 15 }}>
            <label htmlFor="Cidade">Cidade</label>
            <Input id="Cidade" />
          </div>
          <div style={{ maxWidth: 300, marginRight: 15 }}>
            <label htmlFor="Longitude">Longitude</label>
            <Input id="Longitude" />
          </div>
          <div style={{ maxWidth: 300, marginRight: 15 }}>
            <label htmlFor="Latitude">Latitude</label>
            <Input id="Latitude" />
          </div>
        </div>
        <br />
        <UsersTableContainer />
      </PageLayout>
    );
  }
}

export default UserManagementPage;
