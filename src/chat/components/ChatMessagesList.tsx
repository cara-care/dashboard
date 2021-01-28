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
  let timeToCheck = data[0]?.created.slice(0, 10);

  return (
    <Fragment>
      {data.map((message: ChatMessage, index) => {
        const { id, created, text, author } = message;
        const dataToDisplay = timeToCheck;
        const messageDate = created.slice(0, 10);

        const isLastMessage = index + 1 === data.length;
        const isDifferentDate = messageDate !== timeToCheck;

        if (isDifferentDate) timeToCheck = messageDate;

        return (
          <Fragment key={id}>
            {isDifferentDate && <MessageDivider content={dataToDisplay} />}
            <Message
              position={getMessagePosition(author)}
              message={text}
              created={created}
            />
            {isLastMessage && <MessageDivider content={timeToCheck} />}
          </Fragment>
        );
      })}
    </Fragment>
  );
}
