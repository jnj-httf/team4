/*
 * UserManagementPage Messages
 *
 * This contains all the text for the UserManagementPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserManagementPage';

export default defineMessages({
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'E-mail',
  },
  role: {
    id: `${scope}.role`,
    defaultMessage: 'Role',
  },
  update: {
    id: `${scope}.update`,
    defaultMessage: 'Update',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'Change Password',
  },
  actions: {
    id: `${scope}.actions`,
    defaultMessage: 'Actions',
  },
  user: {
    id: `${scope}.user`,
    defaultMessage: 'User',
  },
  admin: {
    id: `${scope}.admin`,
    defaultMessage: 'Admin',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search',
  },
  reset: {
    id: `${scope}.reset`,
    defaultMessage: 'Reset',
  },
  searchName: {
    id: `${scope}.searchName`,
    defaultMessage: 'Search name',
  },
  searchEmail: {
    id: `${scope}.searchEmail`,
    defaultMessage: 'Search e-mail',
  },
});
