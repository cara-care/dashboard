import React from 'react';
import { render } from '@testing-library/react';
import Container from '../Container';

describe('<Container />', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Container>
        <span>Test</span>
      </Container>
    );
    expect(container).toMatchSnapshot();
  });
});
