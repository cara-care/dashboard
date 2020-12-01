import { ChatMessage, ChatRoom, ChatUser } from './chatReducer';

export enum ChatActionTypes {
  SET_CURRENT_CHAT_USER = 'chat/SET_CURRENT_CHAT_USER',
  CLEAR_CURRENT_CHAT_USER = 'chat/CLEAR_CURRENT_CHAT_USER',
  ADD_CHAT_MESSAGE = 'chat/ADD_CHAT_MESSAGE',
  SET_CHAT_MESSAGES = 'chat/SET_CHAT_MESSAGES',
  CLEAR_CHAT_MESSAGES = 'chat/CLEAR_CHAT_MESSAGES',
  ADD_CHAT_ROOM = 'chat/ADD_CHAT_ROOM',
  SET_CHAT_ROOMS = 'chat/SET_CHAT_ROOMS',
  CLEAR_CHAT_ROOMS = 'chat/CLEAR_CHAT_ROOMS',
  ADD_NEW_MESSAGE_TO_CHAT_ROOM_INIT = 'chat/ADD_NEW_MESSAGE_TO_CHAT_ROOM_INIT',
  ADD_NEW_MESSAGE_TO_CHAT_ROOM = 'chat/ADD_NEW_MESSAGE_TO_CHAT_ROOM',
  SET_SCROLL_TO_BOTTOM = 'chat/SET_SCROLL_TO_BOTTOM',
}

// Chat User

export interface SetCurrentUserAction {
  type: ChatActionTypes.SET_CURRENT_CHAT_USER;
  user: ChatUser | null;
}

export const setCurrentChatUser = (
  user: ChatUser | null
): SetCurrentUserAction => ({
  type: ChatActionTypes.SET_CURRENT_CHAT_USER,
  user,
});

export interface ClearCurrentUserAction {
  type: ChatActionTypes.CLEAR_CURRENT_CHAT_USER;
}

export const clearCurrentChatUser = (): ClearCurrentUserAction => ({
  type: ChatActionTypes.CLEAR_CURRENT_CHAT_USER,
});

// Chat Messages

export interface AddChatMessage {
  type: ChatActionTypes.ADD_CHAT_MESSAGE;
  chatMessage: ChatMessage;
}

export const addChatMessage = (chatMessage: ChatMessage): AddChatMessage => ({
  type: ChatActionTypes.ADD_CHAT_MESSAGE,
  chatMessage,
});

export interface SetChatMessages {
  type: ChatActionTypes.SET_CHAT_MESSAGES;
  chatMessages: ChatMessage[];
}

export const setChatMessages = (
  chatMessages: ChatMessage[]
): SetChatMessages => ({
  type: ChatActionTypes.SET_CHAT_MESSAGES,
  chatMessages,
});

export interface ClearChatMessages {
  type: ChatActionTypes.CLEAR_CHAT_MESSAGES;
}

export const clearChatMessages = (): ClearChatMessages => ({
  type: ChatActionTypes.CLEAR_CHAT_MESSAGES,
});

// Chat Rooms

export interface AddChatRoom {
  type: ChatActionTypes.ADD_CHAT_ROOM;
  chatRoom: ChatRoom;
}

export const addChatRoom = (chatRoom: ChatRoom): AddChatRoom => ({
  type: ChatActionTypes.ADD_CHAT_ROOM,
  chatRoom,
});

export interface SetChatRooms {
  type: ChatActionTypes.SET_CHAT_ROOMS;
  chatRooms: ChatRoom[];
}

export const setChatRooms = (chatRooms: ChatRoom[]): SetChatRooms => ({
  type: ChatActionTypes.SET_CHAT_ROOMS,
  chatRooms,
});

// not used
export interface ClearChatRooms {
  type: ChatActionTypes.CLEAR_CHAT_ROOMS;
}

export const clearChatRooms = (): ClearChatRooms => ({
  type: ChatActionTypes.CLEAR_CHAT_ROOMS,
});

// Add Msg to Chat Room

export interface AddNewMessageToChatRoomInit {
  type: ChatActionTypes.ADD_NEW_MESSAGE_TO_CHAT_ROOM_INIT;
  message: ChatMessage;
}

export const addNewMessageToChatRoomInit = (
  message: ChatMessage
): AddNewMessageToChatRoomInit => ({
  type: ChatActionTypes.ADD_NEW_MESSAGE_TO_CHAT_ROOM_INIT,
  message,
});

export interface AddNewMessageToChatRoom {
  type: ChatActionTypes.ADD_NEW_MESSAGE_TO_CHAT_ROOM;
  index: number;
  message: ChatMessage;
}

export const addNewMessageToChatRoom = (
  index: number,
  message: ChatMessage
): AddNewMessageToChatRoom => ({
  type: ChatActionTypes.ADD_NEW_MESSAGE_TO_CHAT_ROOM,
  index,
  message,
});

// Others

export interface SetScrollToBottom {
  type: ChatActionTypes.SET_SCROLL_TO_BOTTOM;
  payload: boolean;
}

export const setScrollToBottom = (payload: boolean): SetScrollToBottom => ({
  type: ChatActionTypes.SET_SCROLL_TO_BOTTOM,
  payload,
});

export type ChatActions =
  | SetCurrentUserAction
  | AddChatMessage
  | SetChatMessages
  | ClearCurrentUserAction
  | ClearChatMessages
  | SetScrollToBottom
  | AddChatRoom
  | SetChatRooms
  | ClearChatRooms
  | AddNewMessageToChatRoomInit
  | AddNewMessageToChatRoom;
