import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import ChatHeader from '../../components/chatHeader/ChatHeader';
import { currentUserMock } from '../../testHelpers';

describe.skip('<ChatHeader />', () => {
  const ChatHeaderWithUser = () => <ChatHeader />;
  it('does render user data when user loaded', () => {
    const ChatHeaderWithProviders = withProviders(
      ChatHeaderWithUser,
      MemoryRouter
    );
    const { getByText } = renderWithRedux(<ChatHeaderWithProviders />, {
      preloadedState: {
        chat: {
          loadingCurrentUser: false,
        },
      },
    });
    expect(getByText(currentUserMock.nickname)).toBeInTheDocument();
  });
  it('does not render user data when loading state', () => {
    const ChatHeaderWithProviders = withProviders(
      ChatHeaderWithUser,
      MemoryRouter
    );
    const { queryByText } = renderWithRedux(<ChatHeaderWithProviders />, {
      preloadedState: {
        chat: {
          loadingCurrentUser: true,
        },
      },
    });
    expect(queryByText(currentUserMock.nickname)).not.toBeInTheDocument();
  });
});
