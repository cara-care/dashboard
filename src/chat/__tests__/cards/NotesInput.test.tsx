import { fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import NotesInput from '../../components/cards/NotesInput';
import { initialEditMode } from '../../redux';
import { currentUserMock } from '../../testHelpers';

const testMessage = 'test note';

describe('<NotesInput />', () => {
  const NotesInputWithUser = () => <NotesInput />;
  it('renders correctly', async () => {
    const NotesInputWithProviders = withProviders(
      NotesInputWithUser,
      MemoryRouter
    );
    const { container, getByRole } = renderWithRedux(
      <NotesInputWithProviders />,
      {
        preloadedState: {
          auth: {
            nutriName: 'Test Nutri',
          },
          chat: {
            currentChatUser: currentUserMock,
            noteEditMode: { ...initialEditMode },
          },
        },
      }
    );
    const input = container.querySelector('textarea');
    const submitButton = getByRole('button');
    expect(submitButton).toHaveAttribute('disabled');

    fireEvent.change(input!, { target: { value: testMessage } });

    expect(submitButton).not.toHaveAttribute('disabled');
  });
});
