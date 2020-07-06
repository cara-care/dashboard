import React from 'react';
import { renderWithReactIntl } from '../../utils/test-utils';
import Spinner from '../Spinner';

describe('<Spinner />', () => {
  it('renders correctly with default props', () => {
    const { container } = renderWithReactIntl(<Spinner />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with custom props', () => {
    const { container } = renderWithReactIntl(<Spinner noText size={32} />);
    expect(container).toMatchSnapshot();
  });
});
