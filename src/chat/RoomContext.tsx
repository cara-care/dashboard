import Kabelwerk from 'kabelwerk';
import React from 'react';

import { Message, Room, User } from './interfaces';

const RoomContext = React.createContext<{
  room: Room | null;
  roomUser: User | null;
  isReady: boolean;
  messages: Message[];
  loadEarlierMessages: () => Promise<boolean>;
  postMessage: (text: string) => Promise<Message>;
}>({
  room: null,
  roomUser: null,
  isReady: false,
  messages: [],
  loadEarlierMessages: () => Promise.reject(),
  postMessage: () => Promise.reject(),
});

const RoomProvider = function ({
  children,
  id,
}: {
  children: any;
  id: number;
}) {
  // the currently active room object
  const room = React.useRef<Room | null>(null);

  // the room's end user
  const [roomUser, setRoomUser] = React.useState<User | null>(null);

  // whether the room's ready event has been already fired
  const [isReady, setIsReady] = React.useState<boolean>(false);

  // the room's messages
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    room.current = Kabelwerk.openRoom(id);

    room.current!.on('ready', ({ messages }: { messages: Message[] }) => {
      setMessages(messages);

      if (messages.length) {
        room.current!.moveMarker();
      }

      setRoomUser(room.current!.getUser());
      setIsReady(true);
    });

    room.current!.on('message_posted', (message: Message) => {
      setMessages((messages) => {
        return [...messages, message];
      });

      room.current!.moveMarker();
    });

    room.current!.connect();

    return () => {
      if (room.current) {
        room.current!.disconnect();
        room.current = null;
      }

      setRoomUser(null);
      setIsReady(false);
      setMessages([]);
    };
  }, [id]);

  const loadEarlierMessages = function () {
    if (room.current) {
      return room.current
        .loadEarlier()
        .then(({ messages: newMessages }: { messages: Message[] }) => {
          // the sdk keeps the id of the earliest message shown to know which earlier messages to load
          // when transitioning the old chat database to kabelwerk, it was inserted using bulk import
          // which also overwrote the old ids with new ones causing losing the original id order
          // this means that a new message might end up having an id that is smaller meaning the message was earlier in time than an old messages
          // such messages will be returned by the `loadEarlier()` function which results in message repetition
          // that is why the new messages need to be filtered and the duplicates need to be removed
          const uniqueIds = new Set([
            ...messages.map((message) => message.id),
            ...newMessages.map((message) => message.id),
          ]);

          const uniqueMessages = [
            ...messages,
            ...newMessages.filter((message) => !uniqueIds.has(message.id)),
          ];

          const hasNewMessages = uniqueMessages.length > messages.length;

          setMessages(uniqueMessages);

          return Promise.resolve(hasNewMessages);
        })
        .catch((error: Error) => {
          console.error(error);
          return false;
        });
    } else {
      return Promise.resolve(false);
    }
  };

  const postMessage = function (text: string) {
    if (room.current) {
      return room.current.postMessage({ text });
    } else {
      return Promise.reject();
    }
  };

  return (
    <RoomContext.Provider
      value={{
        room: room.current,
        roomUser,
        isReady,
        messages,
        loadEarlierMessages,
        postMessage,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export { RoomContext, RoomProvider };
