import * as actions from '../actions';
import * as constants from '../constants';

describe('RequestReducer actions', () => {
  it('should return an action with type `REQUEST_RESOURCE`', () => {
    const expected = {
      type: constants.REQUEST_RESOURCE,
      resourceKey: 'resourceKey',
      options: {},
    };
    expect(actions.requestResource('resourceKey')).toEqual(expected);
  });

  it('should return an action with type `INIT_REQUEST_RESOURCE`', () => {
    const expected = {
      type: constants.INIT_REQUEST_RESOURCE,
      resourceKey: 'resourceKey',
    };
    expect(actions.initRequestResource('resourceKey')).toEqual(expected);
  });

  it('should return an action with type `REQUEST_RESOURCE_SUCCESS`', () => {
    const expected = {
      type: constants.REQUEST_RESOURCE_SUCCESS,
      resourceKey: 'resourceKey',
      resource: 'resource',
    };
    expect(actions.requestResourceSuccess('resourceKey', 'resource')).toEqual(
      expected,
    );
  });

  it('should return an action with type `REQUEST_RESOURCE_FAILURE`', () => {
    const expected = {
      type: constants.REQUEST_RESOURCE_FAILURE,
      resourceKey: 'resourceKey',
      error: 'error',
    };
    expect(actions.requestResourceFailure('resourceKey', 'error')).toEqual(
      expected,
    );
  });
});
