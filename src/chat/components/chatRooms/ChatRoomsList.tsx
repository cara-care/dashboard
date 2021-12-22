import React, { Fragment } from 'react';
import ChatRoomItem from './ChatRoomItem';
import useKabelwerk from '../../hooks/useKabelwerk';

export default function ChatMessages() {
  const { inboxItems } = useKabelwerk();

  return (
    <Fragment>
      {inboxItems.map((item: any) => {
        return <ChatRoomItem key={item.room.id} inboxItem={item} />;
      })}
    </Fragment>
  );
}
