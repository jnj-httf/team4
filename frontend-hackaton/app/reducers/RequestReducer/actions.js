import {
  REQUEST_RESOURCE,
  INIT_REQUEST_RESOURCE,
  REQUEST_RESOURCE_SUCCESS,
  REQUEST_RESOURCE_FAILURE,
} from './constants';

export const requestResource = (resourceKey, options = {}) => ({
  type: REQUEST_RESOURCE,
  resourceKey,
  options,
});

export const initRequestResource = resourceKey => ({
  type: INIT_REQUEST_RESOURCE,
  resourceKey,
});

export const requestResourceSuccess = (resourceKey, resource) => ({
  type: REQUEST_RESOURCE_SUCCESS,
  resourceKey,
  resource,
});

export const requestResourceFailure = (resourceKey, error) => ({
  type: REQUEST_RESOURCE_FAILURE,
  resourceKey,
  error,
});
