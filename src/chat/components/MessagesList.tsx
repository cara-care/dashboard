import React from 'react';

import { RoomContext } from '../RoomContext';

import Message from './chat/Message';
import MessageDivider from './chat/MessageDivider';

const getMessagePosition = function (username: string) {
  // app usernames start with u- or auto-
  return /^(u-|auto-).*/i.test(username) ? 'left' : 'right';
};

const getDate = function (datetime: Date) {
  return datetime.toISOString().slice(0, 10);
};

const MessagesList = function () {
  const { messages } = React.useContext(RoomContext);

  let output = [];
  let lastDate = null;

  for (let i = messages.length - 1; i >= 0; i--) {
    let message = messages[i];

    let messageDate = getDate(message.insertedAt);
    if (lastDate && messageDate !== lastDate) {
      output.push(<MessageDivider key={lastDate} content={lastDate} />);
      lastDate = messageDate;
    } else if (!lastDate) {
      // the first iteration
      lastDate = messageDate;
    }

    output.push(
      <React.Fragment key={message.id}>
        <Message
          position={getMessagePosition(message.user ? message.user.key : '')}
          message={message}
        />
      </React.Fragment>
    );
  }

  return (
    <>
      {output}
      {lastDate && <MessageDivider key={lastDate} content={lastDate} />}
    </>
  );
};

export default MessagesList;
