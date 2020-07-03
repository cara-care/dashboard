import React from 'react';
import { render } from '@testing-library/react';
import ErrorMessage from '../components/ErrorMessage';

describe('<ErrorMessage />', () => {
  it('renders correctly', () => {
    const { container } = render(<ErrorMessage message="Test Error" />);
    expect(container).toMatchSnapshot();
  });
});
