import { call, put, takeEvery, all } from 'redux-saga/effects';
import get from 'lodash/get';

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
  };

  try {
    const { data } = yield call(apis.ubs.getUbs, { params });
    yield put(requestResourceSuccess(resourceKey, data.records));
  } catch (e) {
    yield put(requestResourceFailure(resourceKey, e.response));
  }
}

export default function* requestResourceListener() {
  yield all([takeEvery(REQUEST_RESOURCE, requestUbs)]);
}
