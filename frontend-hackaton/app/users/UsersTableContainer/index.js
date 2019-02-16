import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import { Input, Button } from 'antd';

import { PAGINATION_INITIAL_STATE } from 'configurations';
import injectSaga from 'utils/injectSaga';
import { requestResource } from 'reducers/RequestReducer/actions';
import { selectResource } from 'reducers/RequestReducer/selectors';
import UsersTable from '../UsersTable';
import { USERS_RESOURCE_KEY } from './constants';
import sagas from './sagas';

export class UsersTableContainer extends React.PureComponent {
  static propTypes = {
    requestUbs: PropTypes.func.isRequired,
    data: PropTypes.array,
    usersStatistics: PropTypes.object,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    usersStatistics: {},
  };

  state = {
    pagination: PAGINATION_INITIAL_STATE,
    city: '',
    longitude: '',
    latitude: '',
  };

  componentDidMount() {
    this.doRequestUbs();
  }

  componentWillReceiveProps(nextProps) {
    const { pagination } = this.state;
    if (this.props.usersStatistics !== nextProps.usersStatistics) {
      this.setState({
        pagination: {
          ...pagination,
          total: 1885,
        },
      });
    }
  }

  onTableChange = pagination => {
    this.setState(
      {
        pagination,
      },
      this.doRequestUbs,
    );
  };

  doRequestUbs = () => {
    const { requestUbs } = this.props;
    const { city, longitude, latitude, pagination } = this.state;
    requestUbs({ city, longitude, latitude, pagination });
  };

  render() {
    const { data, intl } = this.props;
    const { pagination } = this.state;

    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ maxWidth: 300, marginRight: 15 }}>
            <label htmlFor="Cidade">Cidade</label>
            <Input
              id="Cidade"
              onChange={event => this.setState({ city: event.target.value })}
            />
          </div>
          <div style={{ maxWidth: 300, marginRight: 15 }}>
            <label htmlFor="Longitude">Longitude</label>
            <Input
              id="Longitude"
              onChange={event =>
                this.setState({ longitude: event.target.value })
              }
            />
          </div>
          <div style={{ maxWidth: 300, marginRight: 15 }}>
            <label htmlFor="Latitude">Latitude</label>
            <Input
              id="Latitude"
              onChange={event =>
                this.setState({ latitude: event.target.value })
              }
            />
          </div>
          <Button
            style={{ marginTop: 21 }}
            type="button"
            onClick={this.doRequestUbs}
          >
            Buscar
          </Button>
        </div>
        <br />
        <UsersTable
          data={data}
          onChange={this.onTableChange}
          pagination={pagination}
          intl={intl}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestUbs: options =>
      dispatch(requestResource(USERS_RESOURCE_KEY, options)),
  };
}

const mapStateToProps = createStructuredSelector({
  data: selectResource(USERS_RESOURCE_KEY),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'UsersTableContainer', saga: sagas });

export default compose(
  withSaga,
  withConnect,
  injectIntl,
)(UsersTableContainer);
