import { Reducer } from 'redux';
import { ChatActions, ChatActionTypes } from './chatActions';
import { RootState } from '../../utils/store';
import { ChatUser, ChatUserNote, ChatEditMode } from './types';

export interface ChatState {
  currentChatUser: ChatUser | null;
  currentChatUserNotes: ChatUserNote[];
  loadingCurrentUser: boolean;
  noteEditMode: ChatEditMode;
  patient: ChatUser | null;
}

export const initialEditMode = {
  isEdit: false,
  noteId: -1,
  message: '',
};

export const chatInitialState = {
  currentChatUser: null,
  currentChatUserNotes: [],
  loadingCurrentUser: false,
  noteEditMode: initialEditMode,
  patient: null,
};

export const chatReducer: Reducer<ChatState, ChatActions> = (
  state = chatInitialState,
  action: ChatActions
) => {
  switch (action.type) {
    // Notes
    case ChatActionTypes.SET_CHATUSER_NOTES:
      return {
        ...state,
        currentChatUserNotes: [...action.notes.reverse()],
      };

    case ChatActionTypes.ADD_CHATUSER_NOTE:
      return {
        ...state,
        currentChatUserNotes: [action.note, ...state.currentChatUserNotes],
      };

    case ChatActionTypes.EDIT_CHATUSER_NOTE:
      const index = state.currentChatUserNotes.findIndex(
        (note) => note.id === action.id
      );
      const newNotes = [...state.currentChatUserNotes];
      newNotes[index] = { ...newNotes[index], text: action.text };
      return {
        ...state,
        currentChatUserNotes: newNotes,
      };

    case ChatActionTypes.DELETE_CHATUSER_NOTE:
      const filteredNotes = state.currentChatUserNotes.filter(
        (note) => note.id !== action.id
      );
      return {
        ...state,
        currentChatUserNotes: filteredNotes,
      };

    case ChatActionTypes.SET_NOTE_EDIT_MODE:
      return {
        ...state,
        noteEditMode: action.payload,
      };

    case ChatActionTypes.CLEAR_NOTE_EDIT_MODE:
      return {
        ...state,
        noteEditMode: { ...initialEditMode },
      };

    case ChatActionTypes.UPDATE_PATIENT:
      return {
        ...state,
        patient: action.payload,
      };

    default:
      return state;
  }
};

export const currentUserUsernameSelector = (state: RootState) =>
  state.chat.currentChatUser?.username;

export const notesSelector = (state: RootState) =>
  state.chat.currentChatUserNotes;

export const noteEditModeSelector = (state: RootState) =>
  state.chat.noteEditMode;

export const getPatient = (state: RootState) => state.chat.patient;
