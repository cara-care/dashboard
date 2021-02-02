import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { chatRoomsSelector, ChatRoom } from '../../redux';
import ChatRoomItem from './ChatRoomItem';

export default function ChatMessages() {
  const data = useSelector(chatRoomsSelector);
  return (
    <Fragment>
      {data.map((room: ChatRoom) => {
        return (
          <ChatRoomItem
            key={room.patient.username}
            patient={room.patient}
            message={room.lastMessage.text}
            sent={room.lastMessage.created}
          />
        );
      })}
    </Fragment>
  );
}
