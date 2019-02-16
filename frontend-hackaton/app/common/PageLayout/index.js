import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import StyledMenu from './StyledMenu';
import StyledContent from './StyledContent';
import StyledFooter from './StyledFooter';
import ContentPanel from './ContentPanel';

const { Header } = Layout;

export default class PageLayout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    const { children } = this.props;

    return (
      <Layout className="layout">
        <Header>
          <StyledMenu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
          >
            {/* TODO */}
          </StyledMenu>
        </Header>
        <StyledContent>
          <ContentPanel>{children}</ContentPanel>
        </StyledContent>
        <StyledFooter>{/* TODO */}</StyledFooter>
      </Layout>
    );
  }
}
