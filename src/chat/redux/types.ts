export interface ChatUser {
  age: number | null;
  allergies: string[];
  appVersion: number | null;
  code: string;
  dateJoined: string;
  diagnosis: string;
  diseases: string[];
  email: string;
  id: number;
  lastSeen: string | null;
  nickname: string;
  platform: string;
  programme: string;
  programmeCurrentPhase: number | null;
  programmeModules: string[];
  programmeStarted: string | null;
  sex: string | null;
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

export interface User {
  id: number;
  key: string;
  name: string;
}

export interface Inbox {
  slug: string;
  name: string;
  icon: string;
}

export interface InboxRoom {
  id: number;
  lastMessage: Message | null;
  user: User;
}

export interface Message {
  id: number;
  insertedAt: Date;
  roomId: number;
  text: string;
  updatedAt: Date;
  user: User | null;
}
