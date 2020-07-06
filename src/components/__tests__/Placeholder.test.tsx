import React from 'react';
import { renderWithReactIntl } from '../../utils/test-utils';
import Placeholder from '../Placeholder';

describe('<Placeholder />', () => {
  it('renders correctly', () => {
    const { container } = renderWithReactIntl(<Placeholder />);
    expect(container).toMatchSnapshot();
  });
});
