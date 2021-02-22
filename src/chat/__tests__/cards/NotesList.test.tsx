import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import NotesList from '../../components/cards/NotesList';
import { initialEditMode } from '../../redux';
import { currentUserMock, notesMock } from '../../testHelpers';

describe('<NotesList />', () => {
  const NotesListWithUser = () => <NotesList notes={notesMock} />;
  it('renders notes correctly', () => {
    const NotesListWithProviders = withProviders(
      NotesListWithUser,
      MemoryRouter
    );
    const { getByText } = renderWithRedux(<NotesListWithProviders />, {
      preloadedState: {
        auth: {
          nutriName: 'Test Nutri',
        },
        chat: {
          currentChatUser: currentUserMock,
          noteEditMode: { ...initialEditMode },
        },
      },
    });
    expect(getByText(notesMock[0].text)).toBeInTheDocument();
    expect(getByText(notesMock[0].author.name)).toBeInTheDocument();
    expect(getByText(notesMock[1].text)).toBeInTheDocument();
    expect(getByText(notesMock[1].author.name)).toBeInTheDocument();
  });
  it('shows edit and delete icon if it is own note', () => {
    const NotesListWithProviders = withProviders(
      NotesListWithUser,
      MemoryRouter
    );
    const { getByLabelText } = renderWithRedux(<NotesListWithProviders />, {
      preloadedState: {
        auth: {
          nutriName: 'Test Nutri',
        },
        chat: {
          currentChatUser: currentUserMock,
          noteEditMode: { ...initialEditMode },
        },
      },
    });
    expect(getByLabelText(/edit-icon/i)).toBeInTheDocument();
    expect(getByLabelText(/delete-icon/i)).toBeInTheDocument();
  });
});
