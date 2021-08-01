import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { getInboxRooms } from '../../redux';
import ChatRoomItem from './ChatRoomItem';

export default function ChatMessages() {
  const rooms = useSelector(getInboxRooms);
  return (
    <Fragment>
      {rooms.map((room: any) => {
        return <ChatRoomItem key={room.id} room={room} />;
      })}
    </Fragment>
  );
}
