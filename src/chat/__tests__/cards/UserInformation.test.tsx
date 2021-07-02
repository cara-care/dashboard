import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import UserInformation from '../../components/cards/UserInformation';
import { chatMessagesMock, currentUserMock } from '../../testHelpers';

describe.skip('<UserInformation />', () => {
  const UserInformationWithUser = () => <UserInformation />;
  it('renders user data correctly', () => {
    const UserInformationWithProviders = withProviders(
      UserInformationWithUser,
      MemoryRouter
    );
    const { getByText } = renderWithRedux(<UserInformationWithProviders />, {
      preloadedState: {
        chat: {
          currentChatUser: currentUserMock,
          chatMessages: chatMessagesMock,
        },
      },
    });
    expect(
      getByText(new RegExp(String(currentUserMock.id), 'i'))
    ).toBeInTheDocument();
    expect(
      getByText(new RegExp(String(currentUserMock.age), 'i'))
    ).toBeInTheDocument();
    expect(getByText(new RegExp(currentUserMock.sex, 'i'))).toBeInTheDocument();
    // lastContact
    expect(
      getByText(new RegExp(chatMessagesMock[0].author, 'i'))
    ).toBeInTheDocument();
  });
});
