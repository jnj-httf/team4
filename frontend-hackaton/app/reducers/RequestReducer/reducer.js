/*
 * RequestReducer
 * For every requested resource, a state will be created with:
 * resourceKey: {
 *   resource: [],
 *   isLoading: false,
 *   error: undefined,
 * }
 */
import {
  REQUEST_RESOURCE_FAILURE,
  REQUEST_RESOURCE_SUCCESS,
  INIT_REQUEST_RESOURCE,
} from './constants';

// Don't use immutable state due to performance reasons
const updateSubstate = (state, resourceKey, payload) => ({
  ...state,
  [resourceKey]: {
    ...state[resourceKey],
    ...payload,
  },
});

function requestReducer(state = {}, action) {
  switch (action.type) {
    case INIT_REQUEST_RESOURCE: {
      const payload = {
        isLoading: true,
        error: undefined,
      };
      return updateSubstate(state, action.resourceKey, payload);
    }
    case REQUEST_RESOURCE_SUCCESS: {
      const payload = {
        resource: action.resource,
        isLoading: false,
        error: undefined,
      };
      return updateSubstate(state, action.resourceKey, payload);
    }
    case REQUEST_RESOURCE_FAILURE: {
      const payload = {
        resource: undefined,
        isLoading: false,
        error: action.error,
      };
      return updateSubstate(state, action.resourceKey, payload);
    }
    default:
      return state;
  }
}

export default requestReducer;
