import {
  ChatConversation,
  ChatMessage,
  ChatRoom,
  ChatRoomPatient,
  ChatUser,
  ChatUserNote,
} from './types';

export enum ChatActionTypes {
  SET_CURRENT_USER_LOADING = 'chat/SET_CURRENT_USER_LOADING',
  SET_CURRENT_CHAT_USER_INIT = 'chat/SET_CURRENT_CHAT_USER_INIT',
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
  SET_CHAT_CONVERSATIONS = 'chat/SET_CHAT_CONVERSATIONS',
  SET_CHAT_ROOMS_SLUG = 'chat/SET_CHAT_ROOMS_SLUG',
  SET_SELECTED_ASSIGNMENT = 'chat/SET_SELECTED_ASSIGNMENT',
  SET_SCROLL_TO_BOTTOM = 'chat/SET_SCROLL_TO_BOTTOM',
  SET_CHATUSER_NOTES = 'chat/SET_CHATUSER_NOTES',
  ADD_CHATUSER_NOTE = 'chat/ADD_CHATUSER_NOTE',
  EDIT_CHATUSER_NOTE = 'chat/EDIT_CHATUSER_NOTE',
  DELETE_CHATUSER_NOTE = 'chat/DELETE_CHATUSER_NOTE',
  SET_NOTE_EDIT_MODE = 'chat/SET_NOTE_EDIT_MODE',
  CLEAR_NOTE_EDIT_MODE = 'chat/CLEAR_NOTE_EDIT_MODE',
}

// Chat User

export interface SetCurrentUserLoading {
  type: ChatActionTypes.SET_CURRENT_USER_LOADING;
  payload: boolean;
}

export const setCurrentUserLoading = (
  payload: boolean
): SetCurrentUserLoading => ({
  type: ChatActionTypes.SET_CURRENT_USER_LOADING,
  payload,
});

export interface SetCurrentUserActionInit {
  type: ChatActionTypes.SET_CURRENT_CHAT_USER_INIT;
  user: ChatRoomPatient;
  refetchMessages: boolean;
}

export const setCurrentChatUserInit = (
  user: ChatRoomPatient,
  refetchMessages: boolean = false
): SetCurrentUserActionInit => ({
  type: ChatActionTypes.SET_CURRENT_CHAT_USER_INIT,
  user,
  refetchMessages,
});
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

// Chat Conversations

export interface SetChatConversations {
  type: ChatActionTypes.SET_CHAT_CONVERSATIONS;
  chatConversations: ChatConversation[];
}

export const setChatConversations = (
  chatConversations: ChatConversation[]
): SetChatConversations => ({
  type: ChatActionTypes.SET_CHAT_CONVERSATIONS,
  chatConversations,
});

// ChatUser Notes
export interface SetChatUserNotes {
  type: ChatActionTypes.SET_CHATUSER_NOTES;
  notes: ChatUserNote[];
}

export const setChatUserNotes = (notes: ChatUserNote[]): SetChatUserNotes => ({
  type: ChatActionTypes.SET_CHATUSER_NOTES,
  notes,
});

export interface AddChatUserNote {
  type: ChatActionTypes.ADD_CHATUSER_NOTE;
  note: ChatUserNote;
}

export const addChatUserNote = (note: ChatUserNote): AddChatUserNote => ({
  type: ChatActionTypes.ADD_CHATUSER_NOTE,
  note,
});

export interface EditChatUserNote {
  type: ChatActionTypes.EDIT_CHATUSER_NOTE;
  id: number;
  text: string;
}

export const editChatUserNote = (
  id: number,
  text: string
): EditChatUserNote => ({
  type: ChatActionTypes.EDIT_CHATUSER_NOTE,
  id,
  text,
});

export interface DeleteChatUserNote {
  type: ChatActionTypes.DELETE_CHATUSER_NOTE;
  id: number;
}

export const deleteChatUserNote = (id: number): DeleteChatUserNote => ({
  type: ChatActionTypes.DELETE_CHATUSER_NOTE,
  id,
});

export interface SetNoteEditMode {
  type: ChatActionTypes.SET_NOTE_EDIT_MODE;
  payload: any;
}

export const setNodeEditMode = (payload: any): SetNoteEditMode => ({
  type: ChatActionTypes.SET_NOTE_EDIT_MODE,
  payload,
});

export interface ClearEditMode {
  type: ChatActionTypes.CLEAR_NOTE_EDIT_MODE;
}

export const clearEditMode = (): ClearEditMode => ({
  type: ChatActionTypes.CLEAR_NOTE_EDIT_MODE,
});

// Others

export interface SetChatRoomsSlug {
  type: ChatActionTypes.SET_CHAT_ROOMS_SLUG;
  payload: string;
}

export const setChatRoomsSlug = (payload: string): SetChatRoomsSlug => ({
  type: ChatActionTypes.SET_CHAT_ROOMS_SLUG,
  payload,
});

export interface SetSelectedAssignment {
  type: ChatActionTypes.SET_SELECTED_ASSIGNMENT;
  payload: string;
}

export const setSelectedAssignment = (
  payload: string
): SetSelectedAssignment => ({
  type: ChatActionTypes.SET_SELECTED_ASSIGNMENT,
  payload,
});

export interface SetScrollToBottom {
  type: ChatActionTypes.SET_SCROLL_TO_BOTTOM;
  payload: boolean;
}

export const setScrollToBottom = (payload: boolean): SetScrollToBottom => ({
  type: ChatActionTypes.SET_SCROLL_TO_BOTTOM,
  payload,
});

export type ChatActions =
  | SetCurrentUserLoading
  | SetCurrentUserActionInit
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
  | AddNewMessageToChatRoom
  | SetChatConversations
  | SetChatRoomsSlug
  | SetSelectedAssignment
  | SetChatUserNotes
  | AddChatUserNote
  | EditChatUserNote
  | DeleteChatUserNote
  | SetNoteEditMode
  | ClearEditMode;
