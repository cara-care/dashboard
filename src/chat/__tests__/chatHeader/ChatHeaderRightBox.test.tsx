import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import ChatHeaderRightBox from '../../components/chatHeader/ChatHeaderRightBox';
import { chatConversationsMock } from '../../testHelpers';

const testChannelSlug = 'Test Channel Slug';
const testChannelName = 'Test Channel Name';

describe.skip('<ChatHeaderRightBox />', () => {
  const ChatHeaderRightBoxWithUser = () => (
    <ChatHeaderRightBox />
  );
  it('renders elements correctly', () => {
    const ChatHeaderRightBoxWithProviders = withProviders(
      ChatHeaderRightBoxWithUser,
      MemoryRouter
    );
    const { getByText, getByLabelText } = renderWithRedux(
      <ChatHeaderRightBoxWithProviders />,
      {
        preloadedState: {
          chat: {
            selectedChatAssignment: testChannelSlug,
            chatConversations: [
              {
                slug: testChannelSlug,
                name: testChannelName,
                count: 0,
                private: false,
              },
              ...chatConversationsMock,
            ],
          },
        },
      }
    );
    const button = getByText(testChannelName).parentElement;
    expect(getByLabelText(/settings/i)).toBeInTheDocument;
    expect(getByLabelText(/star/i)).toBeInTheDocument;
    expect(getByLabelText(/notifications/i)).toBeInTheDocument;
    expect(getByLabelText(/check/i)).toBeInTheDocument;
    expect(button).toBeInTheDocument();
    expect(getByText(testChannelName)).toBeInTheDocument();
  });
  it('handles opening/closing assignment modal properly', async () => {
    const ChatHeaderRightBoxWithProviders = withProviders(
      ChatHeaderRightBoxWithUser,
      MemoryRouter
    );
    const { getByText, queryByText } = renderWithRedux(
      <ChatHeaderRightBoxWithProviders />,
      {
        preloadedState: {
          chat: {
            selectedChatAssignment: testChannelSlug,
            chatConversations: [
              {
                slug: testChannelSlug,
                name: testChannelName,
                count: 0,
                private: false,
              },
              ...chatConversationsMock,
            ],
          },
        },
      }
    );
    const button = getByText(testChannelName).parentElement;

    expect(queryByText(/Assign to teammate/i)).not.toBeInTheDocument();
    userEvent.click(button!);

    // opened modal
    const unknownChannel = getByText(chatConversationsMock[0].name);
    expect(getByText(/Assign to teammate/i)).toBeInTheDocument();
    expect(unknownChannel).toBeInTheDocument();
    userEvent.click(unknownChannel);

    await waitFor(() => {
      // closed modal, new assignment
      expect(queryByText(/Assign to teammate/i)).not.toBeInTheDocument();
      expect(queryByText(testChannelName)).not.toBeInTheDocument();
      expect(getByText(chatConversationsMock[0].name)).toBeInTheDocument();
    });
  });
});
