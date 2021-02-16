import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../components/withProviders';
import { MESSAGE_CONTAINER } from '../../utils/test-helpers';
import { renderWithRedux } from '../../utils/test-utils';
import Message from '../components/chat/Message';
import { testMessage } from '../testHelpers';

describe('<Message />', () => {
  it('renders received message with proper styles', () => {
    const ReceivedMessage = () => (
      <Message
        position="left"
        message={testMessage}
        created="2021-01-14T08:15:07Z"
      />
    );
    const MessageWithProviders = withProviders(ReceivedMessage, MemoryRouter);
    const { getByText, getByTestId } = renderWithRedux(
      <MessageWithProviders />
    );
    expect(getByTestId(MESSAGE_CONTAINER)).toBeInTheDocument();
    expect(getByTestId(MESSAGE_CONTAINER)).not.toHaveStyle(
      `flex-direction: row-reverse`
    );
    expect(getByText(testMessage)).toBeInTheDocument();
  });
  it('renders own message with proper styles', () => {
    const ReceivedMessage = () => (
      <Message
        position="right"
        message={testMessage}
        created="2021-01-14T08:25:07Z"
      />
    );
    const MessageWithProviders = withProviders(ReceivedMessage, MemoryRouter);
    const { getByText, getByTestId } = renderWithRedux(
      <MessageWithProviders />
    );

    expect(getByTestId(MESSAGE_CONTAINER)).toBeInTheDocument();
    expect(getByTestId(MESSAGE_CONTAINER)).toHaveStyle(
      `flex-direction: row-reverse`
    );
    expect(getByText(testMessage)).toBeInTheDocument();
  });
});
