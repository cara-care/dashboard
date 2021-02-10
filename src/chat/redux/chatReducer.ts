import { Reducer } from 'redux';
import { ChatActions, ChatActionTypes } from './chatActions';
import { RootState } from '../../utils/store';
import { uniqBy } from 'lodash';
import { EnrolledProgram } from '../../auth';
import { findLastContact } from './utils';
export interface ChatUser {
  age: number;
  allergies: string[];
  dateJoined: string;
  enrolledProgrammes: EnrolledProgram[];
  diagnosis: string;
  id: number;
  lastSeen: string;
  nickname: string;
  platform: string;
  sex: string | null;
  email: string;
  timezone: string;
  username: string;
}

export interface ChatMessage {
  author: string;
  created: string;
  id: number;
  room: string;
  sent: string;
  text: string;
  type: string;
  upload: null;
}

export interface LastMessage {
  author: string;
  created: string;
  id: number;
  sent: string;
  text: string;
  upload: null;
}

export interface ChatRoomPatient {
  id: number;
  nickname: string;
  username: string;
}

export interface ChatRoom {
  lastMessage: LastMessage;
  patient: ChatRoomPatient;
}

export interface ChatConversation {
  name: string;
  private: boolean;
  slug: string;
  rooms: number;
}

export interface ChatState {
  loadingCurrentUser: boolean;
  currentChatUser: ChatUser | null;
  chatMessages: ChatMessage[];
  chatRooms: ChatRoom[];
  chatConversations: ChatConversation[];
  selectedChatAssignment: string;
  selectedChatConversation: ChatConversation;
  scrollToChatBottom: boolean;
}

export const chatInitialState = {
  loadingCurrentUser: false,
  currentChatUser: null,
  chatMessages: [],
  chatRooms: [],
  chatConversations: [],
  selectedChatAssignment: 'Unassigned',
  selectedChatConversation: {
    name: 'All',
    private: false,
    slug: 'all',
  },
  scrollToChatBottom: false,
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
        // selectedChatAssignment: '' TODO: put here assignment info from BE
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
      const newChatRooms = uniqBy(action.chatRooms, 'patient.id');
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
  state.chat.chatRooms.length;
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
  state.chat.selectedChatAssignment;
export const scrollToChatBottomSelector = (state: RootState) =>
  state.chat.scrollToChatBottom;
