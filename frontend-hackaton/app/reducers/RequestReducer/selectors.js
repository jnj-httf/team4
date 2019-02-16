import { createSelector } from 'reselect';
import get from 'lodash/get';

import { REQUEST_REDUCER_KEY } from './constants';

export const selectResources = state => get(state, REQUEST_REDUCER_KEY);

export const selectResource = resourceKey =>
  createSelector([selectResources], resources =>
    get(resources, `${resourceKey}.resource`),
  );

export const selectIsLoading = resourceKey =>
  createSelector([selectResources], resources =>
    get(resources, `${resourceKey}.isLoading`),
  );

export const selectError = resourceKey =>
  createSelector([selectResources], resources =>
    get(resources, `${resourceKey}.error`),
  );
