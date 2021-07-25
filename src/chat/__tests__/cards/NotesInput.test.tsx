import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import NotesInput from '../../components/cards/NotesInput';
import { initialEditMode } from '../../redux';
import { currentUserMock, notesMock } from '../../testHelpers';
import { sendNote, editNote } from '../../../utils/api';

jest.mock('../../../utils/api');
const sendNoteMock = sendNote as jest.Mock;
const editNoteMock = editNote as jest.Mock;
sendNoteMock.mockResolvedValueOnce({
  data: { results: notesMock[0] },
});
editNoteMock.mockResolvedValueOnce({
  data: { results: notesMock[0] },
});

const testMessage = 'test note';

describe.skip('<NotesInput />', () => {
  const NotesInputWithUser = () => <NotesInput />;
  it('renders correctly and handles note sending', async () => {
    const NotesInputWithProviders = withProviders(
      NotesInputWithUser,
      MemoryRouter
    );
    const { container, getByRole, getByText } = renderWithRedux(
      <NotesInputWithProviders />,
      {
        preloadedState: {
          auth: {
            nutriName: 'Test Nutri',
          },
          chat: {
            currentChatUser: currentUserMock,
            noteEditMode: { ...initialEditMode },
            currentChatUserNotes: [],
          },
        },
      }
    );
    const input = container.querySelector('textarea');
    const submitButton = getByRole('button');
    expect(getByText(/Send/i)).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('disabled');

    fireEvent.change(input!, { target: { value: testMessage } });
    expect(submitButton).not.toHaveAttribute('disabled');

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(sendNoteMock).toHaveBeenCalledTimes(1);
      expect(sendNoteMock).toHaveBeenCalledWith(
        currentUserMock.id,
        testMessage
      );
      expect(submitButton).toHaveAttribute('disabled');
    });
  });
  it('handles note editing', async () => {
    const NotesInputWithProviders = withProviders(
      NotesInputWithUser,
      MemoryRouter
    );
    const { container, getByRole, getByText } = renderWithRedux(
      <NotesInputWithProviders />,
      {
        preloadedState: {
          auth: {
            nutriName: 'Test Nutri',
          },
          chat: {
            currentChatUser: currentUserMock,
            noteEditMode: {
              isEdit: true,
              noteId: 1000,
              message: notesMock[0].text,
            },
            currentChatUserNotes: [notesMock[0]],
          },
        },
      }
    );
    const input = container.querySelector('textarea');
    const submitButton = getByRole('button');
    expect(getByText(/Update/i)).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('disabled');

    fireEvent.change(input!, { target: { value: testMessage } });
    expect(submitButton).not.toHaveAttribute('disabled');

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(editNoteMock).toHaveBeenCalledTimes(1);
      expect(editNoteMock).toHaveBeenCalledWith(
        currentUserMock.id,
        notesMock[0].id,
        testMessage
      );
      expect(submitButton).toHaveAttribute('disabled');
    });
  });
});
