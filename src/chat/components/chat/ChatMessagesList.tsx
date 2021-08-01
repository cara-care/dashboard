import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { getMessages } from '../../redux';
import Message from './Message';
import MessageDivider from './MessageDivider';

const getMessagePosition = function (username: string) {
  // app usernames start with u- or auto-
  return /^(u-|auto-).*/i.test(username) ? 'left' : 'right';
};

const getDate = function (datetime: Date) {
  return datetime.toISOString().slice(0, 10);
};

export default function ChatMessagesList() {
  const data = useSelector(getMessages);

  let output = [];
  let lastDate = null;

  for (let i = data.length - 1; i >= 0; i--) {
    let message = data[i];

    let messageDate = getDate(message.insertedAt);
    if (lastDate && messageDate !== lastDate) {
      output.push(<MessageDivider key={lastDate} content={lastDate} />);
      lastDate = messageDate;
    } else if (!lastDate) {
      // the first iteration
      lastDate = messageDate;
    }

    output.push(
      <Fragment key={message.id}>
        <Message
          position={getMessagePosition(message.user ? message.user.key : '')}
          message={message.text}
          created={message.insertedAt}
        />
      </Fragment>
    );
  }

  return (
    <>
      {output}
      {lastDate && <MessageDivider key={lastDate} content={lastDate} />}
    </>
  );
}
