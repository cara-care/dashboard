import { capitalize } from 'lodash';
import { ChatMessage } from '.';

export const findLastContact = (
  messages: ChatMessage[],
  username: string | undefined
) => {
  const lastContact = messages.find((msg) => msg.author !== username);
  return capitalize(lastContact?.author);
};
