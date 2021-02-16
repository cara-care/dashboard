import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../components/withProviders';
import { renderWithRedux } from '../../utils/test-utils';
import ChatHeaderLabel from '../components/chatHeader/ChatHeaderLabel';

const label = 'test-label';

describe('<ChatHeaderLabel />', () => {
  const ChatHeaderLabelWithUser = () => <ChatHeaderLabel label={label} />;
  it('does render label correctly', () => {
    const ChatHeaderLabelWithProviders = withProviders(
      ChatHeaderLabelWithUser,
      MemoryRouter
    );
    const { getByText } = renderWithRedux(<ChatHeaderLabelWithProviders />);
    expect(getByText(label)).toBeInTheDocument();
  });
});
