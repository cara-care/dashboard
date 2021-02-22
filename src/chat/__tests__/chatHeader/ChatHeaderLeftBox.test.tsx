import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { EnrolledProgram } from '../../../auth';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import ChatHeaderLeftBox from '../../components/chatHeader/ChatHeaderLeftBox';
import { currentUserMock } from '../../testHelpers';

const premiumUser = {
  ...currentUserMock,
  enrolledProgrammes: [
    {
      title: 'Test Premium Program',
    } as EnrolledProgram,
  ],
};

describe('<ChatHeaderLeftBox />', () => {
  const ChatHeaderLeftBoxWithUser = () => (
    <ChatHeaderLeftBox user={premiumUser} />
  );
  it('does render user data correctly for free user', () => {
    const ChatHeaderLeftBoxWithProviders = withProviders(
      ChatHeaderLeftBoxWithUser,
      MemoryRouter
    );
    const { container, getByText } = renderWithRedux(
      <ChatHeaderLeftBoxWithProviders />
    );
    const nickname = currentUserMock.nickname;
    const username = currentUserMock.username;
    const iconX = container.querySelector('svg');
    expect(getByText(nickname)).toBeInTheDocument();
    expect(getByText(new RegExp(username, 'i'))).toBeInTheDocument();
    expect(iconX).toBeInTheDocument();
  });
  it('does render user data correctly for premium user', () => {
    const ChatHeaderLeftBoxWithProviders = withProviders(
      ChatHeaderLeftBoxWithUser,
      MemoryRouter
    );
    const { getByText } = renderWithRedux(<ChatHeaderLeftBoxWithProviders />);
    const nickname = currentUserMock.nickname;
    const username = currentUserMock.username;
    const premiumTitle = premiumUser.enrolledProgrammes[0].title;
    expect(getByText(nickname)).toBeInTheDocument();
    expect(getByText(new RegExp(username, 'i'))).toBeInTheDocument();
    expect(getByText(new RegExp(premiumTitle, 'i'))).toBeInTheDocument();
  });
});
