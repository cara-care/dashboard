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
  email: '',
  lastSeen: null,
  nickname: '',
  platform: '',
  programme: '',
  programmeModules: [],
  programmeWeek: null,
  sex: null,
  timezone: '',
});
