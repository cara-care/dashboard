import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import Conversations from '../../components/inboxSidebar/Conversations';
import { chatConversationsMock } from '../../testHelpers';

describe('<Conversations />', () => {
  const ConversationsWithUser = () => <Conversations />;
  it('renders elements correctly', () => {
    const ConversationsWithProviders = withProviders(
      ConversationsWithUser,
      MemoryRouter
    );
    const { getByText } = renderWithRedux(<ConversationsWithProviders />, {
      preloadedState: {
        auth: {
          nutriName: 'Test Nutri',
        },
        chat: {
          chatConversations: chatConversationsMock,
        },
      },
    });
    expect(getByText('You')).toBeInTheDocument();
    chatConversationsMock.forEach((conversation) => {
      expect(getByText(conversation.name)).toBeInTheDocument();
    });
  });
});
