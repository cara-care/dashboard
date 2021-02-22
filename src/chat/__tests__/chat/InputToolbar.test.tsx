import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import user from '@testing-library/user-event';
import { CHAT_MESSAGE_INPUT } from '../../../utils/test-helpers';
import { renderWithRedux } from '../../../utils/test-utils';
import InputToolbar from '../../components/chat/InputToolbar';
import { testMessage } from '../../testHelpers';
import { fireEvent } from '@testing-library/react';

const onSubmitMock = jest.fn();

describe('<InputToolbar />', () => {
  it('sends the written message correctly', async () => {
    const InputToolbarComp = () => <InputToolbar onSubmit={onSubmitMock} />;
    const InputToolbarWithProviders = withProviders(
      InputToolbarComp,
      MemoryRouter
    );
    const { getByTestId, getByRole } = renderWithRedux(
      <InputToolbarWithProviders />
    );
    const input = getByTestId(CHAT_MESSAGE_INPUT);
    const submitButton = getByRole('button', {
      name: /Send/i,
    });
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: testMessage } });
    user.click(submitButton);
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith(testMessage);
  });
  it('changes tabs properly', async () => {
    const InputToolbarComp = () => <InputToolbar onSubmit={onSubmitMock} />;
    const InputToolbarWithProviders = withProviders(
      InputToolbarComp,
      MemoryRouter
    );
    const { queryByText, getByText, getByRole } = renderWithRedux(
      <InputToolbarWithProviders />
    );
    const tab1Button = getByRole('tab', {
      name: /Reply/i,
    });
    const tab2Button = getByRole('tab', {
      name: /Note/i,
    });
    expect(getByText(/Send/i)).toBeInTheDocument();
    expect(queryByText(/Add Note/i)).not.toBeInTheDocument();
    user.click(tab2Button);
    expect(queryByText(/Send/i)).not.toBeInTheDocument();
    expect(getByText(/Add Note/i)).toBeInTheDocument();
    user.click(tab1Button);
    expect(getByText(/Send/i)).toBeInTheDocument();
    expect(queryByText(/Add Note/i)).not.toBeInTheDocument();
  });
});
