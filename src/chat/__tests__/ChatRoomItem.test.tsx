import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../components/withProviders';
import { renderWithRedux } from '../../utils/test-utils';
import ChatRoomItem from '../components/ChatRoomItem';
import { chatRoomsMock } from '../helpers';

const routePath = `/nutri/inbox`;
const chatRoomMock = chatRoomsMock[0];

describe('<ChatRoomItem />', () => {
  const ChatRoomItemWithUser = () => (
    <ChatRoomItem
      patient={chatRoomMock.patient}
      message={chatRoomMock.lastMessage.text}
      sent={chatRoomMock.lastMessage.sent}
    />
  );
  it('renders message and patient name', () => {
    const ChatRoomItemWithProviders = withProviders(
      ChatRoomItemWithUser,
      MemoryRouter
    );
    const { getByText } = renderWithRedux(<ChatRoomItemWithProviders />, {
      preloadedState: {
        chat: {
          loadingCurrentUser: false,
        },
      },
    });
    expect(getByText(chatRoomMock.lastMessage.text)).toBeInTheDocument();
    expect(getByText(chatRoomMock.patient.nickname)).toBeInTheDocument();
  });
  it('has correct href attribute', async () => {
    const ChatRoomItemWithProviders = withProviders(
      ChatRoomItemWithUser,
      MemoryRouter
    );
    const { getByText } = renderWithRedux(<ChatRoomItemWithProviders />, {
      preloadedState: {
        chat: {
          loadingCurrentUser: false,
        },
      },
    });
    const link = getByText(chatRoomMock.patient.nickname).closest('a');
    expect(link).toHaveAttribute(
      'href',
      `${routePath}/${chatRoomMock.patient.id}/${chatRoomMock.patient.username}`
    );
  });
});
