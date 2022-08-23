import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { currentUserMock, notesMock } from '../../../utils/test-helpers';
import { renderWithRedux } from '../../../utils/test-utils';

import withProviders from '../../../components/withProviders';
import NotesCard from '../../components/cards/NotesCard';
import { initialEditMode } from '../../redux';

describe.skip('<NotesCard />', () => {
  const NotesCardWithUser = () => <NotesCard />;
  it('renders notes correctly', async () => {
    const NotesCardWithProviders = withProviders(
      NotesCardWithUser,
      MemoryRouter
    );
    const { getByLabelText, getByText, queryByText } = renderWithRedux(
      <NotesCardWithProviders />,
      {
        preloadedState: {
          chat: {
            currentChatUser: currentUserMock,
            noteEditMode: { ...initialEditMode },
            currentChatUserNotes: notesMock,
          },
        },
      }
    );
    const expandButton = getByLabelText(/expand/i);
    expect(getByText(notesMock[0].text)).toBeInTheDocument();
    expect(getByText(notesMock[1].text)).toBeInTheDocument();
    expect(queryByText(notesMock[2].text)).not.toBeInTheDocument();
    userEvent.click(expandButton);
    expect(queryByText(notesMock[2].text)).toBeInTheDocument();

    userEvent.click(expandButton);
    await waitFor(() => {
      expect(queryByText(notesMock[2].text)).not.toBeInTheDocument();
    });
  });
});
