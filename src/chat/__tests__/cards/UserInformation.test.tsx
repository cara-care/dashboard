import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { chatMessagesMock, currentUserMock } from '../../../utils/test-helpers';
import { renderWithRedux } from '../../../utils/test-utils';

import withProviders from '../../../components/withProviders';
import UserInformation from '../../components/cards/UserInformation';

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
