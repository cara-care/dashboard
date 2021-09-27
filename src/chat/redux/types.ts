// Cara users

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

// Notes

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

// Kabelwerk

export interface User {
  id: number;
  key: string;
  name: string;
}

export enum Inbox {
  PERSONAL = 'personal',
  ANWENDERTEST_HB = 'anwendertest_hb',
  ANWENDERTEST_IBD = 'anwendertest_ibd',
  ANWENDERTEST_IBS = 'anwendertest_ibs',
  RCT_IBS = 'rct_ibs',
  NO_STUDY = 'no_study',
  ALL = 'all',
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
