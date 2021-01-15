import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';
import withProviders from '../../components/withProviders';
import { renderWithRedux } from '../../utils/test-utils';
import { getMessages as mockGetMessages } from '../../utils/api';
import Chat from '../components/Chat';
import { currentUserMock } from '../helpers';

jest.mock('../../utils/api');
const onSendMessageMock = jest.fn();

describe('<Chat />', () => {
  const ChatWithUser = () => (
    <Chat user={currentUserMock} onSendMessage={onSendMessageMock} />
  );
  it('fetches chat messages when user selected', async () => {
    const ChatWithProviders = withProviders(ChatWithUser, MemoryRouter);
    renderWithRedux(<ChatWithProviders />, {
      preloadedState: {
        chat: {
          loadingCurrentUser: false,
        },
      },
    });
    await waitFor(() => {
      expect(mockGetMessages).toHaveBeenCalledTimes(1);
    });
  });
});
