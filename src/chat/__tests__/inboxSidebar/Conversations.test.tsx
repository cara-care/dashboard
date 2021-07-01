import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import Conversations, { INBOXES } from '../../components/inboxSidebar/Conversations';
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
    INBOXES.forEach((inbox) => {
      expect(getByText(inbox.name)).toBeInTheDocument();
    });
  });
});
