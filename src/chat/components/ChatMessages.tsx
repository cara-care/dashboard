import React from 'react';
import Message from './Message';

interface ChatMessagesProps {
  data: any;
}

export interface IMessage {
  author: string;
  created: string;
  id: number;
  sent: string;
  text: string;
  upload: null;
}

export interface IPageMessage {
  count: number;
  next: string | null;
  previous: string | null;
  results: IMessage[];
}

function getMessagePosition(username: string) {
  // app username starts with u- or auto-
  return /^(u-|auto-).*/i.test(username) ? 'left' : 'right';
}

export default function ChatMessages({ data }: ChatMessagesProps) {
  return data.reverse().map((page: IPageMessage, i: number) => {
    return (
      <React.Fragment key={i}>
        {page.results.map((message: IMessage, index) => {
          return (
            <React.Fragment key={message.id}>
              <Message
                position={getMessagePosition(message.author)}
                message={message.text}
                created={message.created}
              />
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  });
}
