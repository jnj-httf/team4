import React from 'react';
import PageLayout from 'common/PageLayout';
import UsersTableContainer from 'users/UsersTableContainer';

/* eslint-disable react/prefer-stateless-function */
export class UserManagementPage extends React.PureComponent {
  render() {
    return (
      <PageLayout>
        <UsersTableContainer />
      </PageLayout>
    );
  }
}

export default UserManagementPage;
