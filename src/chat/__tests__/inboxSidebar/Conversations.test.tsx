import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import Conversations from '../../components/inboxSidebar/Conversations';
import { chatConversationsMock } from '../../testHelpers';
import { INBOXES } from '../../inboxes';

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
    Object.keys(INBOXES).forEach((key) => {
      expect(getByText(INBOXES[key].name)).toBeInTheDocument();
    });
  });
});
