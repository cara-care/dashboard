import React from 'react';
import { shallow } from 'enzyme';
import AuthLayout from '../components/AuthLayout';

describe('<AuthLayout />', () => {
  it('should render correctly', () => {
    expect(shallow(<AuthLayout />)).toMatchSnapshot();
  });
});
