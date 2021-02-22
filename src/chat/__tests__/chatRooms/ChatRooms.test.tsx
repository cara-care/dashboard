import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import { getChatRooms as mockGetChatRooms } from '../../../utils/api';
import ChatRooms from '../../components/chatRooms/ChatRooms';

jest.mock('../../../utils/api');

describe('<ChatRooms />', () => {
  it('fetches data correctly', async () => {
    const ChatRoomsWithProviders = withProviders(ChatRooms, MemoryRouter);
    renderWithRedux(<ChatRoomsWithProviders />);
    await waitFor(() => {
      expect(mockGetChatRooms).toHaveBeenCalledTimes(1);
    });
  });
});
