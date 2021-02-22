import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import Details from '../../components/cards/Details';
import { chatMessagesMock, currentUserMock } from '../../testHelpers';

describe('<Details />', () => {
  const DetailsWithUser = () => <Details />;
  it('renders user data correctly', () => {
    const DetailsWithProviders = withProviders(DetailsWithUser, MemoryRouter);
    const { getByText } = renderWithRedux(<DetailsWithProviders />, {
      preloadedState: {
        chat: {
          currentChatUser: currentUserMock,
          chatMessages: chatMessagesMock,
        },
      },
    });
    expect(
      getByText(new RegExp(currentUserMock.username, 'i'))
    ).toBeInTheDocument();
    expect(
      getByText(new RegExp(currentUserMock.platform, 'i'))
    ).toBeInTheDocument();
    expect(
      getByText(new RegExp(currentUserMock.dateJoined, 'i'))
    ).toBeInTheDocument();
    expect(
      getByText(new RegExp(currentUserMock.lastSeen, 'i'))
    ).toBeInTheDocument();
    // lastHeardFrom
    expect(
      getByText(new RegExp(chatMessagesMock[0].created.slice(0, 10), 'i'))
    ).toBeInTheDocument();
  });
  it('handles properly expand/hide click', async () => {
    const DetailsWithProviders = withProviders(DetailsWithUser, MemoryRouter);
    const { getByText, queryByText, getByLabelText } = renderWithRedux(
      <DetailsWithProviders />,
      {
        preloadedState: {
          chat: {
            currentChatUser: currentUserMock,
            chatMessages: chatMessagesMock,
          },
        },
      }
    );
    expect(
      queryByText(new RegExp(currentUserMock.email, 'i'))
    ).not.toBeInTheDocument();
    expect(
      queryByText(new RegExp(currentUserMock.timezone, 'i'))
    ).not.toBeInTheDocument();

    const expandButton = getByLabelText(/expand/i);
    userEvent.click(expandButton);
    expect(
      getByText(new RegExp(currentUserMock.email, 'i'))
    ).toBeInTheDocument();
    expect(
      getByText(new RegExp(currentUserMock.timezone, 'i'))
    ).toBeInTheDocument();

    userEvent.click(expandButton);
    await waitFor(() => {
      expect(
        queryByText(new RegExp(currentUserMock.email, 'i'))
      ).not.toBeInTheDocument();
      expect(
        queryByText(new RegExp(currentUserMock.timezone, 'i'))
      ).not.toBeInTheDocument();
    });
  });
});
