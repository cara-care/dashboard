import React, { Fragment } from 'react';
import ChatRoomItem from './ChatRoomItem';
import useKabelwerk from '../../hooks/useKabelwerk';

export default function ChatMessages() {
  const { rooms } = useKabelwerk();

  return (
    <Fragment>
      {rooms.map((room: any) => {
        return <ChatRoomItem key={room.id} room={room} />;
      })}
    </Fragment>
  );
}
