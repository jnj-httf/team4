import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import { Input, Button } from 'antd';
import { sortBy, filter } from 'lodash';

import { PAGINATION_INITIAL_STATE, HAS_BACKEND } from 'configurations';
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
    error: '',
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
      // this.doRequestUbs,
    );
  };

  doRequestUbs = () => {
    const { requestUbs } = this.props;
    const { city, longitude, latitude, pagination } = this.state;
    requestUbs({ city, longitude, latitude, pagination });
  };

  validate = () => {
    const { longitude, latitude } = this.state;
    if ((latitude && !longitude) || (!latitude && longitude)) {
      this.setState({
        error: 'Por favor, preencha ambos longitude e latitude',
      });
    } else {
      this.setState({
        error: '',
      });
      // this.doRequestUbs();
    }
  };

  distance = (lat1, lon1, lat2, lon2) => {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist *= 1.609344; // to kilometers
    return dist;
  }

  orderDataByDistance(data) {
    const { latitude, longitude } = this.state;

    return sortBy(data, (elem) => this.distance(latitude, longitude, elem.vlr_latitude, elem.vlr_longitude))
    // for (let i = 0; i < data.length; i += 1) {
    //   // if this location is within 0.1KM of the user, add it to the list
    //   if (this.distance(poslat, poslng, data[i].lat, data[i].lng, "K") <= 0.1) {
    //     html += '<p>' + data[i].location + ' - ' + data[i].code + '</p>';
    //   }
    // }
  }

  retiraAcentos(str) {
    const comAcento = 'ÀÁ ÃÄÅÆÇÈÉÊËÌÍÎÏÐ ÑÒÓÔÕÖØÙÚÛÜ ÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ';
    const semAcento = 'AAAAAAACEEEEIIIIDN OOOOOOUUUUYRsBaaa aaaaceeeeiiiionoooooouuuuybyr';
    let novastr = '';
    for (let i = 0; i < str.length; i += 1) {
      let troca = false;
      for (let a = 0; a < comAcento.length; a += 1) {
        if (str.substr(i, 1) === comAcento.substr(a, 1)) {
          novastr += semAcento.substr(a, 1);
          troca = true;
          break;
        }
      }
      if (troca === false) {
        novastr += str.substr(i, 1);
      }
    }
    return novastr;
  }

  filterByCity(data) {
    const { city } = this.state;
    return filter(
      data,
      elem => city ? this.retiraAcentos(elem.dsc_cidade).toLowerCase().includes(this.retiraAcentos(city).toLowerCase()) : true
    );
  }

  render() {
    const { data, intl } = this.props;
    const { pagination } = this.state;

    let orderedDataByDistance = this.orderDataByDistance(data);
    orderedDataByDistance = this.filterByCity(orderedDataByDistance);
    // if (!HAS_BACKEND) {

    // }

    return (
      <div>
        <span style={{ color: 'red' }}>{this.state.error}</span>
        <br />
        <div style={{ display: 'flex' }}>
          <div style={{ maxWidth: 300, marginRight: 15 }}>
            <label htmlFor="Cidade">Cidade</label>
            <Input
              id="Cidade"
              onChange={event => this.setState({ city: event.target.value })}
            />
          </div>
          <div style={{ marginTop: 25 }}>
            <span>Total = {(orderedDataByDistance || []).length}</span>
          </div>
          {/* <Button
            style={{ marginTop: 21 }}
            type="button"
            onClick={this.validate}
          >
            Buscar
          </Button> */}
        </div>
        <br />
        <div style={{ display: 'flex' }}>
          <div style={{ maxWidth: 300, marginRight: 15 }}>
            <label htmlFor="Latitude">Latitude</label>
            <Input
              id="Latitude"
              onChange={event =>
                this.setState({ latitude: event.target.value })
              }
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
        </div>
        <br />
        <UsersTable
          data={orderedDataByDistance}
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
