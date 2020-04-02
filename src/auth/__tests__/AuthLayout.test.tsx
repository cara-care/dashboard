import React from 'react';
import AuthLayout from '../components/AuthLayout';
import { shallow } from 'enzyme';

describe('<AuthLayout />', () => {
  it('should render correctly', () => {
    expect(shallow(<AuthLayout />)).toMatchSnapshot();
  });
});
