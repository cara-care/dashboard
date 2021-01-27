import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { ChatMessage, chatMessagesSelector } from '../redux';
import Message from './Message';
import MessageDivider from './MessageDivider';

function getMessagePosition(username: string) {
  // app username starts with u- or auto-
  return /^(u-|auto-).*/i.test(username) ? 'left' : 'right';
}

export default function ChatMessagesList() {
  const data = useSelector(chatMessagesSelector);
  let timeToCheck = new Date().toJSON().slice(0, 10);

  return (
    <Fragment>
      {data.map((message: ChatMessage, index) => {
        const { id, created, text, author } = message;
        const dataToDisplay = timeToCheck;
        const messageDate = created.slice(0, 10);

        const isLastMessage = index + 1 === data.length;
        const isDifferentDate = messageDate !== timeToCheck;

        return (
          <Fragment key={id}>
            {isDifferentDate && (timeToCheck = messageDate) && (
              <MessageDivider children={dataToDisplay} />
            )}
            <Message
              position={getMessagePosition(author)}
              message={text}
              created={created}
            />
            {isLastMessage && <MessageDivider children={dataToDisplay} />}
          </Fragment>
        );
      })}
    </Fragment>
  );
}
