import { ChatEditMode, ChatUser, ChatUserNote } from './types';

export enum ChatActionTypes {
  // Kabelwerk
  SELECT_INBOX = 'chat/SELECT_INBOX',
  SELECT_ROOM = 'chat/SELECT_ROOM',
  UPDATE_INBOX_ROOMS = 'chat/UPDATE_INBOX_ROOMS',
  UPDATE_MESSAGES = 'chat/UPDATE_MESSAGES',
  UPDATE_PATIENT = 'chat/UPDATE_PATIENT',

  // Notes
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

export interface UpdatePatient {
  type: ChatActionTypes.UPDATE_PATIENT;
  payload: ChatUser | null;
}
export const updatePatient = (payload: ChatUser | null): UpdatePatient => ({
  type: ChatActionTypes.UPDATE_PATIENT,
  payload,
});

export type ChatActions =
  | SetChatUserNotes
  | AddChatUserNote
  | EditChatUserNote
  | DeleteChatUserNote
  | SetNoteEditMode
  | ClearEditMode
  | UpdatePatient;
