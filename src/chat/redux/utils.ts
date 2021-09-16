import { ChatUser } from './types';

export const deletedUserData = (id: number, username: string): ChatUser => ({
  id,
  username,
  age: null,
  allergies: [],
  appVersion: null,
  code: '',
  dateJoined: '',
  diagnosis: '',
  diseases: [],
  enrolledProgrammes: [],
  inbox: '',
  lastSeen: null,
  platform: '',
  sex: null,
  email: '',
  timezone: '',
  nickname: '',
});
