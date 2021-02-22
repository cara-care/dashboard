import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import AssignTeammate from '../../components/chatHeader/AssignTeammate';
import { chatConversationsMock, currentUserMock } from '../../testHelpers';

const assignUserToNutriMock = jest.fn();
const handleCloseAssignPopupMock = jest.fn();
const testChannelSlug = 'Test Channel Slug';
const testChannelName = 'Test Channel Name';

describe('<AssignTeammate />', () => {
  const AssignTeammateWithUser = () => (
    <AssignTeammate
      assignUserToNutri={assignUserToNutriMock}
      handleCloseAssignPopup={handleCloseAssignPopupMock}
    />
  );
  it('renders elements correctly', () => {
    const AssignTeammateWithProviders = withProviders(
      AssignTeammateWithUser,
      MemoryRouter
    );
    const { getByText } = renderWithRedux(<AssignTeammateWithProviders />, {
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
    });
    expect(getByText(/Assign to teammate/i)).toBeInTheDocument();
    expect(getByText(testChannelName)).toBeInTheDocument();
    expect(getByText(chatConversationsMock[0].name)).toBeInTheDocument();
  });
  it('handles click on channel correctly', () => {
    const AssignTeammateWithProviders = withProviders(
      AssignTeammateWithUser,
      MemoryRouter
    );
    const { getByText } = renderWithRedux(<AssignTeammateWithProviders />, {
      preloadedState: {
        chat: {
          currentChatUser: currentUserMock,
          selectedChatAssignment: testChannelSlug,
          chatConversations: chatConversationsMock,
        },
      },
    });
    const unknownChannel = getByText(chatConversationsMock[0].name);
    userEvent.click(unknownChannel);
    expect(assignUserToNutriMock).toHaveBeenCalledTimes(1);
    expect(assignUserToNutriMock).toHaveBeenCalledWith(
      chatConversationsMock[0].slug,
      currentUserMock.username
    );
    expect(handleCloseAssignPopupMock).toHaveBeenCalledTimes(1);
  });
});
