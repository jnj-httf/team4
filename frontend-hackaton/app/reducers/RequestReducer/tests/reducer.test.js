import * as actions from '../actions';
import RequestReducer from '../reducer';

/* eslint new-cap: ["error", { "capIsNew": false }] */
describe('RequestReducer reducer', () => {
  it("should return the same state if the action doesn't exist", () => {
    const state = {
      somestate: 'somevalue',
    };
    expect(RequestReducer(state, {})).toEqual(state);
  });

  it('should return the initial state if the state is undefined', () => {
    const initalState = {};
    expect(RequestReducer(undefined, {})).toEqual(initalState);
  });

  it('should set the resource initial state on the first action', () => {
    const state = {};
    const action = actions.initRequestResource('resourceKey');
    const expectedState = {
      resourceKey: {
        isLoading: true,
        error: undefined,
      },
    };

    expect(RequestReducer(state, action)).toEqual(expectedState);
  });

  it('should set isLoading to true if the action is requestResource or initRequestResource', () => {
    const state = {
      resourceKey: {
        resource: { resource: 'resource' },
        isLoading: false,
        error: undefined,
      },
    };
    const action = actions.initRequestResource('resourceKey');
    const expectedState = {
      resourceKey: {
        resource: { resource: 'resource' },
        isLoading: true,
        error: undefined,
      },
    };

    expect(RequestReducer(state, action)).toEqual(expectedState);
  });

  it('should and set the resource and toggle isLoading to false if the action is requestResourceSuccess', () => {
    const state = {
      resourceKey: {
        resource: [],
        isLoading: true,
        error: true,
      },
    };
    const action = actions.requestResourceSuccess('resourceKey', 'resource');
    const expectedState = {
      resourceKey: {
        resource: 'resource',
        isLoading: false,
        error: undefined,
      },
    };

    expect(RequestReducer(state, action)).toEqual(expectedState);
  });

  it('should and set the error and toggle isLoading to false if the action is requestResourceFailure', () => {
    const state = {
      resourceKey: {
        resource: { resource: 'resource' },
        isLoading: true,
        error: false,
      },
    };
    const action = actions.requestResourceFailure('resourceKey', 'error');
    const expectedState = {
      resourceKey: {
        resource: undefined,
        isLoading: false,
        error: 'error',
      },
    };

    expect(RequestReducer(state, action)).toEqual(expectedState);
  });
});
