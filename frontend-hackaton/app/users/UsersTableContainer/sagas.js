import { call, put, takeEvery, all } from 'redux-saga/effects';
import get from 'lodash/get';

import { HAS_BACKEND } from 'configurations';
import apis from 'apis';
import { REQUEST_RESOURCE } from 'reducers/RequestReducer/constants';
import {
  initRequestResource,
  requestResourceSuccess,
  requestResourceFailure,
} from 'reducers/RequestReducer/actions';
import { USERS_RESOURCE_KEY } from './constants';

export function* requestUbs({ resourceKey, options }) {
  if (resourceKey !== USERS_RESOURCE_KEY) return;

  yield put(initRequestResource(resourceKey));
  const params = {
    page: get(options, 'pagination.current'),
    city: get(options, 'city', ''),
    longitude: get(options, 'longitude', ''),
    latitude: get(options, 'latitude', ''),
  };

  try {
    if (HAS_BACKEND) {
      const { data } = yield call(apis.ubs.getUbs, { params });
      yield put(requestResourceSuccess(resourceKey, data));
    } else {
      // const ubs = localStorage.getItem('UBS');
      // let array = JSON.parse(ubs);

      // if (!array) {
      let array = [];
      for (let i = 1; i < 1886; i += 1) {
        const { data } = yield call(apis.ubs.getUbs, { params: { page: i } });
        array = array.concat(data.records);
      }
      // localStorage.setItem('UBS', JSON.stringify(array));
      // }

      yield put(requestResourceSuccess(resourceKey, array));
    }
  } catch (e) {
    yield put(requestResourceFailure(resourceKey, e.response));
  }
}

export default function* requestResourceListener() {
  yield all([takeEvery(REQUEST_RESOURCE, requestUbs)]);
}
