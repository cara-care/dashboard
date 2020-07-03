import React from 'react';
import { render } from '@testing-library/react';
import AuthLayout from '../components/AuthLayout';

describe('<AuthLayout />', () => {
  it('should render correctly', () => {
    const { container } = render(<AuthLayout />);
    expect(container).toMatchSnapshot();
  });
});
