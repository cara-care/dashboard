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
