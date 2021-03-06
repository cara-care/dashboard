import { capitalize } from 'lodash';
import { ChatMessage, ChatUser } from './types';

export const findLastContact = (
  messages: ChatMessage[],
  username: string | undefined
) => {
  const lastContact = messages.find((msg) => msg.author !== username);
  return capitalize(lastContact?.author);
};

export const deletedUserData = (id: number, username: string): ChatUser => ({
  id,
  username,
  age: -1,
  allergies: [],
  dateJoined: '',
  enrolledProgrammes: [],
  diagnosis: '',
  inbox: '',
  lastSeen: '',
  platform: '',
  sex: '',
  email: '',
  timezone: '',
  nickname: '',
});
