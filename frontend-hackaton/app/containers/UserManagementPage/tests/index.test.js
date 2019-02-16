import React from 'react';
import { shallow } from 'enzyme';
import noop from 'lodash/noop';

import { UserManagementPage } from '../index';

describe('<UserManagementPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(
      <UserManagementPage requestUbs={noop} />,
    );
    expect(renderedComponent).toBeTruthy();
  });
});
