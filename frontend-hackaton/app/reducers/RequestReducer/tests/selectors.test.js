import * as selectors from '../selectors';

describe('selectResources', () => {
  it('should select the resources state', () => {
    const resources = {
      test: 'test',
    };
    const mockedState = {
      resources,
    };
    expect(selectors.selectResources(mockedState)).toEqual(resources);
  });
});

describe('selectResource', () => {
  it('should select a resource based on the resource key', () => {
    const resourceState = {
      test: 'test',
    };
    const mockedState = {
      resources: {
        resourceKey: {
          resource: resourceState,
        },
      },
    };

    expect(selectors.selectResource('resourceKey')(mockedState)).toEqual(
      resourceState,
    );
  });
});
