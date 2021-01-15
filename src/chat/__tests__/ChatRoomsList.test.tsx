import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../components/withProviders';
import { renderWithRedux } from '../../utils/test-utils';
import ChatRoomsList from '../components/ChatRoomsList';
import { chatRoomsMock } from '../helpers';

describe('<ChatRoomsList />', () => {
  it('renders message and patient name correctly', async () => {
    const ChatRoomsListWithProviders = withProviders(
      ChatRoomsList,
      MemoryRouter
    );
    const { getByText } = renderWithRedux(<ChatRoomsListWithProviders />, {
      preloadedState: {
        chat: {
          chatRooms: chatRoomsMock,
        },
      },
    });
    chatRoomsMock.forEach((chatRoomMock) => {
      expect(getByText(chatRoomMock.lastMessage.text)).toBeInTheDocument();
      expect(getByText(chatRoomMock.patient.nickname)).toBeInTheDocument();
    });
  });
});
