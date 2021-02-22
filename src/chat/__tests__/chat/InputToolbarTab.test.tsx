import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import user from '@testing-library/user-event';
import { CHAT_MESSAGE_INPUT } from '../../../utils/test-helpers';
import { renderWithRedux } from '../../../utils/test-utils';
import InputToolbarTab from '../../components/chat/InputToolbarTab';
import { testMessage } from '../../testHelpers';
import { fireEvent } from '@testing-library/react';

const onSubmitMock = jest.fn();
const buttonMessage = 'Test message for button';

describe('<InputToolbarTab />', () => {
  it('renders correctly and sends the written message correctly', async () => {
    const InputToolbarTabComp = () => (
      <InputToolbarTab
        onSubmit={onSubmitMock}
        value={1}
        index={1}
        buttonMessage={buttonMessage}
      />
    );
    const InputToolbarTabWithProviders = withProviders(
      InputToolbarTabComp,
      MemoryRouter
    );
    const { getByTestId, getByRole } = renderWithRedux(
      <InputToolbarTabWithProviders />
    );
    const input = getByTestId(CHAT_MESSAGE_INPUT);
    const submitButton = getByRole('button', {
      name: buttonMessage,
    });
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: testMessage } });
    user.click(submitButton);
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith(testMessage);
  });
});
