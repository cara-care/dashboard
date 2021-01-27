import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../components/withProviders';
import { renderWithRedux } from '../../utils/test-utils';
import MessageDivider from '../components/MessageDivider';

const label = 'test-label';

describe('<MessageDivider />', () => {
  const MessageDividerWithUser = () => <MessageDivider content={label} />;
  it('does render children correctly', () => {
    const MessageDividerWithProviders = withProviders(
      MessageDividerWithUser,
      MemoryRouter
    );
    const { getByText } = renderWithRedux(<MessageDividerWithProviders />);
    expect(getByText(label)).toBeInTheDocument();
  });
});
