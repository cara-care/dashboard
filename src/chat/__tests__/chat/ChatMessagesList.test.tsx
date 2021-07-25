import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import ChatMessagesList from '../../components/chat/ChatMessagesList';
import { chatMessagesMock } from '../../testHelpers';

describe.skip('<ChatMessagesList />', () => {
  it('renders all messages correctly', () => {
    const ChatMessagesListWithProviders = withProviders(
      ChatMessagesList,
      MemoryRouter
    );
    const { getByText } = renderWithRedux(<ChatMessagesListWithProviders />, {
      preloadedState: {
        chat: {
          messages: chatMessagesMock,
        },
      },
    });
    expect(getByText(chatMessagesMock[0].text)).toBeInTheDocument();
    expect(getByText(chatMessagesMock[1].text)).toBeInTheDocument();
  });
});
