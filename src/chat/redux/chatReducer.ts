import { Reducer } from 'redux';
import { ChatActions, ChatActionTypes } from './chatActions';
import { RootState } from '../../utils/store';
import { uniqBy } from 'lodash';
import { findLastContact } from './utils';
import {
  ChatUser,
  ChatUserNote,
  ChatMessage,
  ChatRoom,
  ChatConversation,
  ChatEditMode,
  Inbox,
  InboxRoom,
  Message,
} from './types';

export interface ChatState {
  loadingCurrentUser: boolean;
  currentChatUser: ChatUser | null;
  currentChatUserNotes: ChatUserNote[];
  chatMessages: ChatMessage[];
  chatRooms: ChatRoom[];
  chatConversations: ChatConversation[];
  inbox: Inbox | null;
  inboxRooms: any[];
  messages: Message[];
  room: InboxRoom | null;
  selectedChatAssignment: string;
  selectedChatConversation: ChatConversation;
  scrollToChatBottom: boolean;
  noteEditMode: ChatEditMode;
}

export const initialEditMode = {
  isEdit: false,
  noteId: -1,
  message: '',
};

export const chatInitialState = {
  loadingCurrentUser: false,
  currentChatUser: null,
  currentChatUserNotes: [],
  chatMessages: [],
  chatRooms: [],
  chatConversations: [],
  inbox: null,
  inboxRooms: [],
  messages: [],
  room: null,
  selectedChatAssignment: '',
  selectedChatConversation: {
    name: 'All',
    private: false,
    slug: 'all',
    rooms: 0,
  },
  scrollToChatBottom: false,
  noteEditMode: initialEditMode,
};


export const chatReducer: Reducer<ChatState, ChatActions> = (
  state = chatInitialState,
  action: ChatActions
) => {
  switch (action.type) {
    // Current User
    case ChatActionTypes.SET_CURRENT_USER_LOADING:
      return {
        ...state,
        loadingCurrentUser: action.payload,
      };
    case ChatActionTypes.SET_CURRENT_CHAT_USER:
      return {
        ...state,
        currentChatUser: action.user,
        selectedChatAssignment: action.user?.inbox ?? '_',
      };
    case ChatActionTypes.CLEAR_CURRENT_CHAT_USER:
      return {
        ...state,
        currentChatUser: null,
      };

    // Chat Messages
    case ChatActionTypes.ADD_CHAT_MESSAGE:
      const isCurrentChat =
        action.chatMessage.room === state.currentChatUser?.username;
      if (!isCurrentChat) return { ...state };
      return {
        ...state,
        chatMessages: [action.chatMessage, ...state.chatMessages],
        scrollToChatBottom: true,
      };
    case ChatActionTypes.SET_CHAT_MESSAGES:
      const newChatMessages = uniqBy(
        [...state.chatMessages, ...action.chatMessages],
        'id'
      );
      return {
        ...state,
        chatMessages: newChatMessages,
      };
    case ChatActionTypes.CLEAR_CHAT_MESSAGES:
      return {
        ...state,
        chatMessages: [],
      };

    // Chat Rooms
    case ChatActionTypes.ADD_CHAT_ROOM:
      return {
        ...state,
        chatRooms: [action.chatRoom, ...state.chatRooms],
      };
    case ChatActionTypes.SET_CHAT_ROOMS:
      const newChatRooms = action.isNewRoom
        ? uniqBy(action.chatRooms, 'patient.id')
        : uniqBy([...state.chatRooms, ...action.chatRooms], 'patient.id');
      return {
        ...state,
        chatRooms: newChatRooms,
      };
    case ChatActionTypes.CLEAR_CHAT_ROOMS:
      return {
        ...state,
        chatRooms: [],
      };
    case ChatActionTypes.ADD_NEW_MESSAGE_TO_CHAT_ROOM:
      const updatedRooms = [...state.chatRooms];

      const [newestRoom] = updatedRooms.splice(action.index, 1);
      newestRoom.lastMessage = action.message;
      updatedRooms.unshift(newestRoom);
      // TODO: add unread mark
      return {
        ...state,
        chatRooms: updatedRooms,
      };

    // CHAT CONVERSATIONS
    case ChatActionTypes.SET_CHAT_CONVERSATIONS:
      return {
        ...state,
        chatConversations: [...action.chatConversations],
      };

    // CHAT NOTES
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
    case ChatActionTypes.SET_CHAT_ROOMS_SLUG:
      const conversation = state.chatConversations.find(
        (el) => el.name === action.payload
      );
      return {
        ...state,
        selectedChatConversation:
          conversation ?? chatInitialState.selectedChatConversation,
      };
    case ChatActionTypes.SET_SELECTED_ASSIGNMENT:
      return {
        ...state,
        selectedChatAssignment: action.payload,
      };
    case ChatActionTypes.SET_SCROLL_TO_BOTTOM:
      return {
        ...state,
        scrollToChatBottom: action.payload,
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

    default:
      return state;
  }
};


export const loadingCurrentUserSelector = (state: RootState) =>
  state.chat.loadingCurrentUser;

export const currentUserIdSelector = (state: RootState) =>
  state.chat.currentChatUser?.id;

export const lastContactSelector = (state: RootState) =>
  findLastContact(
    state.chat.chatMessages,
    state.chat.currentChatUser?.username
  );

export const currentUserSelector = (state: RootState) =>
  state.chat.currentChatUser;

export const currentUserUsernameSelector = (state: RootState) =>
  state.chat.currentChatUser?.username;

export const chatMessagesSelector = (state: RootState) =>
  state.chat.chatMessages;

export const lastHeardFromSelector = (state: RootState) =>
  state.chat.chatMessages[0]?.created.slice(0, 10);

export const chatRoomsSelector = (state: RootState) => state.chat.chatRooms;

export const chatRoomsNumberSelector = (state: RootState) =>
  state.chat.chatConversations.find(
    (conversation) =>
      conversation.slug === state.chat.selectedChatConversation.slug
  )?.rooms;

export const getChatRoomsSlug = (state: RootState) =>
  state.chat.selectedChatConversation.slug;

export const getChatRoomsFullName = (state: RootState) =>
  state.chat.selectedChatConversation.name;

export const chatConversationsSelector = (state: RootState) =>
  state.chat.chatConversations;

export const chatPublicConversationsSelector = (state: RootState) =>
  state.chat.chatConversations.filter((conversation) => !conversation.private);

export const chatOwnConversationsSelector = (state: RootState) =>
  state.chat.chatConversations.find(
    (conversation) => conversation.name === state.auth.nutriName
  );

export const selectedAssignmentSelector = (state: RootState) =>
  state.chat.chatConversations?.find(
    (conversation) => conversation.slug === state.chat.selectedChatAssignment
  )?.name;

export const notesSelector = (state: RootState) =>
  state.chat.currentChatUserNotes;

export const noteEditModeSelector = (state: RootState) =>
  state.chat.noteEditMode;

export const scrollToChatBottomSelector = (state: RootState) =>
  state.chat.scrollToChatBottom;


// Kabelwerk

export const getInbox = (state: RootState) => state.chat.inbox;

export const getInboxRooms = (state: RootState) => state.chat.inboxRooms;

export const getRoom = (state: RootState) => state.chat.room;

export const getMessages = (state: RootState) => state.chat.messages;
