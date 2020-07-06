import React from 'react';
import { renderWithReactIntl } from '../../utils/test-utils';
import NoResults from '../NoResults';

describe('<NoResults />', () => {
  it('renders correctly with default props', () => {
    const { container } = renderWithReactIntl(<NoResults />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with query prop', () => {
    const { container } = renderWithReactIntl(<NoResults query="Test" />);
    expect(container).toMatchSnapshot();
  });
});
