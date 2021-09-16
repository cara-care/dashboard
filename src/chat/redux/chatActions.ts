import {
  ChatEditMode,
  ChatUser,
  ChatUserNote,
  Inbox,
  InboxRoom,
  Message,
} from './types';

export enum ChatActionTypes {
  SET_SELECTED_ASSIGNMENT = 'chat/SET_SELECTED_ASSIGNMENT',

  // Kabelwerk
  SELECT_INBOX = 'chat/SELECT_INBOX',
  SELECT_ROOM = 'chat/SELECT_ROOM',
  UPDATE_INBOX_ROOMS = 'chat/UPDATE_INBOX_ROOMS',
  UPDATE_MESSAGES = 'chat/UPDATE_MESSAGES',
  UPDATE_PATIENT = 'chat/UPDATE_PATIENT',

  // notes
  SET_CHATUSER_NOTES = 'chat/SET_CHATUSER_NOTES',
  ADD_CHATUSER_NOTE = 'chat/ADD_CHATUSER_NOTE',
  EDIT_CHATUSER_NOTE = 'chat/EDIT_CHATUSER_NOTE',
  DELETE_CHATUSER_NOTE = 'chat/DELETE_CHATUSER_NOTE',
  SET_NOTE_EDIT_MODE = 'chat/SET_NOTE_EDIT_MODE',
  CLEAR_NOTE_EDIT_MODE = 'chat/CLEAR_NOTE_EDIT_MODE',
}

// notes

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
  payload: ChatEditMode;
}

export const setNodeEditMode = (payload: ChatEditMode): SetNoteEditMode => ({
  type: ChatActionTypes.SET_NOTE_EDIT_MODE,
  payload,
});

export interface ClearEditMode {
  type: ChatActionTypes.CLEAR_NOTE_EDIT_MODE;
}

export const clearEditMode = (): ClearEditMode => ({
  type: ChatActionTypes.CLEAR_NOTE_EDIT_MODE,
});

// Kabelwerk

export interface SelectInbox {
  type: ChatActionTypes.SELECT_INBOX;
  payload: Inbox;
}
export const selectInbox = (payload: Inbox): SelectInbox => ({
  type: ChatActionTypes.SELECT_INBOX,
  payload,
});

export interface SelectRoom {
  type: ChatActionTypes.SELECT_ROOM;
  payload: InboxRoom;
}
export const selectRoom = (payload: InboxRoom): SelectRoom => ({
  type: ChatActionTypes.SELECT_ROOM,
  payload,
});

export interface UpdateInboxRooms {
  type: ChatActionTypes.UPDATE_INBOX_ROOMS;
  payload: any[];
}
export const updateInboxRooms = (payload: any[]): UpdateInboxRooms => ({
  type: ChatActionTypes.UPDATE_INBOX_ROOMS,
  payload,
});

export interface UpdateMessages {
  type: ChatActionTypes.UPDATE_MESSAGES;
  subtype: string;
  payload: Message[];
}
export const updateMessages = (
  payload: Message[],
  subtype: string = ''
): UpdateMessages => ({
  type: ChatActionTypes.UPDATE_MESSAGES,
  subtype,
  payload,
});

export interface UpdatePatient {
  type: ChatActionTypes.UPDATE_PATIENT;
  payload: ChatUser | null;
}
export const updatePatient = (payload: ChatUser | null): UpdatePatient => ({
  type: ChatActionTypes.UPDATE_PATIENT,
  payload,
});

// Others

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

export type ChatActions =
  | SetSelectedAssignment
  | SetChatUserNotes
  | AddChatUserNote
  | EditChatUserNote
  | DeleteChatUserNote
  | SetNoteEditMode
  | ClearEditMode
  | SelectInbox
  | SelectRoom
  | UpdateInboxRooms
  | UpdateMessages
  | UpdatePatient;
