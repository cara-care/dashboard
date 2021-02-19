import { EnrolledProgram } from '../../auth';

export interface ChatUser {
  age: number;
  allergies: string[];
  dateJoined: string;
  enrolledProgrammes: EnrolledProgram[];
  diagnosis: string;
  id: number;
  inbox: string;
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

export interface ChatUserNote {
  author: {
    id: number;
    name: string;
  };
  created: string;
  id: number;
  lastModified: string;
  text: string;
}

export interface ChatEditMode {
  isEdit: boolean;
  noteId: number;
  message: string;
}