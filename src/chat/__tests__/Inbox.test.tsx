import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';
import withProviders from '../../components/withProviders';
import { renderWithRedux } from '../../utils/test-utils';
import Inbox from '../pages/Inbox';
import { getChatAuthorizationToken as mockGetChatAuthorizationToken } from '../../utils/api';
import { chatInitialState } from '../redux';
import { currentUserMock } from '../helpers';
import { CHAT_WRAPPER } from '../../utils/test-helpers';

jest.mock('../../utils/api');

describe('<Inbox />', () => {
  const InboxWithProviders = withProviders(Inbox, MemoryRouter);
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('does not render a chat when no chat user selected', () => {
    const { queryByTestId } = renderWithRedux(<InboxWithProviders />);
    expect(queryByTestId(CHAT_WRAPPER)).not.toBeInTheDocument();
  });
  it('does render a chat when there is a user', () => {
    const { queryByTestId } = renderWithRedux(<InboxWithProviders />, {
      preloadedState: {
        chat: {
          ...chatInitialState,
          currentChatUser: currentUserMock,
        },
      },
    });
    expect(queryByTestId(CHAT_WRAPPER)).toBeInTheDocument();
  });
  it('fetchs chat auth token, then connects to socket', async () => {
    renderWithRedux(<InboxWithProviders />);
    await waitFor(() => {
      expect(mockGetChatAuthorizationToken).toBeCalledTimes(1);
    });
    // TODO: test socket
  });
});
