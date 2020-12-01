import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { ChatMessage, chatMessagesSelector } from '../redux';
import Message from './Message';

function getMessagePosition(username: string) {
  // app username starts with u- or auto-
  return /^(u-|auto-).*/i.test(username) ? 'left' : 'right';
}

export default function ChatMessagesList() {
  const data = useSelector(chatMessagesSelector);
  return (
    <Fragment>
      {data.map((message: ChatMessage) => {
        return (
          <Message
            key={message.id}
            position={getMessagePosition(message.author)}
            message={message.text}
            created={message.created}
          />
        );
      })}
    </Fragment>
  );
}
