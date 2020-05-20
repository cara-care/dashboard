import React from 'react';
import configureStore from 'redux-mock-store';
import { shallowWithIntl } from '../../utils/intl-enzyme-test-helper';
import Programs from '../pages/Programs';

const mockStore = configureStore();
const initialState = {
  auth: {
    patientTimezone: 'Europe/Berlin',
    patientEnrolledPrograms: [],
  },
};
const store = mockStore(initialState);
describe('<Programs />', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowWithIntl(
      // @ts-ignore
      <Programs store={store} />
    );
  });

  it.skip('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
