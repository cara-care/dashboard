import { Reducer } from 'redux';
import { ChatActions, ChatActionTypes } from './chatActions';
import { RootState } from '../../utils/store';
import {
  ChatUser,
  ChatUserNote,
  ChatConversation,
  ChatEditMode,
  Inbox,
  InboxRoom,
  Message,
} from './types';

export interface ChatState {
  chatConversations: ChatConversation[];
  currentChatUser: ChatUser | null;
  currentChatUserNotes: ChatUserNote[];
  inbox: Inbox | null;
  inboxRooms: any[];
  loadingCurrentUser: boolean;
  messages: Message[];
  noteEditMode: ChatEditMode;
  patient: ChatUser | null;
  room: InboxRoom | null;
  selectedChatAssignment: string;
}

export const initialEditMode = {
  isEdit: false,
  noteId: -1,
  message: '',
};

export const chatInitialState = {
  chatConversations: [],
  currentChatUser: null,
  currentChatUserNotes: [],
  inbox: null,
  inboxRooms: [],
  loadingCurrentUser: false,
  messages: [],
  noteEditMode: initialEditMode,
  patient: null,
  room: null,
  selectedChatAssignment: '',
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

    // Other
    case ChatActionTypes.SET_SELECTED_ASSIGNMENT:
      return {
        ...state,
        selectedChatAssignment: action.payload,
      };

    // Kabelwerk
    case ChatActionTypes.SELECT_INBOX:
      return {
        ...state,
        inbox: action.payload,
      };

    case ChatActionTypes.SELECT_ROOM:
      return {
        ...state,
        room: action.payload,
      };

    case ChatActionTypes.UPDATE_INBOX_ROOMS:
      return {
        ...state,
        inboxRooms: action.payload,
      };

    case ChatActionTypes.UPDATE_MESSAGES:
      let newMessages = [];

      if (action.subtype === 'prepend') {
        newMessages = action.payload.concat(state.messages);
      } else if (action.subtype === 'append') {
        newMessages = state.messages.concat(action.payload);
      } else {
        newMessages = action.payload;
      }

      return {
        ...state,
        messages: newMessages,
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

export const chatConversationsSelector = (state: RootState) =>
  state.chat.chatConversations;

export const selectedAssignmentSelector = (state: RootState) =>
  state.chat.chatConversations?.find(
    (conversation) => conversation.slug === state.chat.selectedChatAssignment
  )?.name;

export const notesSelector = (state: RootState) =>
  state.chat.currentChatUserNotes;

export const noteEditModeSelector = (state: RootState) =>
  state.chat.noteEditMode;

// Kabelwerk

export const getInbox = (state: RootState) => state.chat.inbox;

export const getInboxRooms = (state: RootState) => state.chat.inboxRooms;

export const getRoom = (state: RootState) => state.chat.room;

export const getMessages = (state: RootState) => state.chat.messages;

export const getPatient = (state: RootState) => state.chat.patient;
