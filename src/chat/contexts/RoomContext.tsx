import Kabelwerk from 'kabelwerk';
import React from 'react';

import { NotificationsContext } from '../contexts/NotificationsContext';
import { Marker, Message, Room, Upload, User } from '../interfaces';

const RoomContext = React.createContext<{
  room: Room | null;
  roomUser: User | null;
  isReady: boolean;
  messages: Message[];
  roomUserMarker: Marker | null;
  loadEarlierMessages: () => Promise<boolean>;
  postText: (text: string) => Promise<Message>;
  postImage: (file: File) => Promise<Message>;
}>({
  room: null,
  roomUser: null,
  isReady: false,
  messages: [],
  roomUserMarker: null,
  loadEarlierMessages: () => Promise.reject(),
  postText: () => Promise.reject(),
  postImage: () => Promise.reject(),
});

const RoomProvider = function ({
  children,
  id,
}: {
  children: any;
  id: number;
}) {
  const { showError } = React.useContext(NotificationsContext);

  // the currently active room object
  const room = React.useRef<Room | null>(null);

  // the room's end user
  const [roomUser, setRoomUser] = React.useState<User | null>(null);

  // whether the room's ready event has been already fired
  const [isReady, setIsReady] = React.useState<boolean>(false);

  // the room's messages
  const [messages, setMessages] = React.useState<Message[]>([]);

  // the marker of the room's end user
  const [roomUserMarker, setRoomUserMarker] = React.useState<Marker | null>(
    null
  );

  React.useEffect(() => {
    room.current = Kabelwerk.openRoom(id);

    room.current!.on(
      'ready',
      ({ messages, markers }: { messages: Message[]; markers: Marker[] }) => {
        setMessages(messages);

        if (messages.length) {
          room.current!.moveMarker();
        }

        if (markers[1]) {
          setRoomUserMarker(markers[1]);
        }

        setRoomUser(room.current!.getUser());
        setIsReady(true);
      }
    );

    room.current!.on('message_posted', (message: Message) => {
      setMessages((messages) => {
        return [...messages, message];
      });

      room.current!.moveMarker();
    });

    room.current!.on('marker_moved', (marker: Marker) => {
      if (marker.userId === room.current!.getUser().id) {
        setRoomUserMarker(marker);
      }
    });

    room.current!.connect();

    return () => {
      if (room.current) {
        room.current!.disconnect();
        room.current = null;
      }

      setIsReady(false);
      setRoomUser(null);
      setRoomUserMarker(null);
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

  const postText = function (text: string) {
    if (room.current) {
      return room.current.postMessage({ text }).catch((error: Error) => {
        showError('Error posting your last message. ' + error.message);
        return Promise.reject(error);
      });
    } else {
      return Promise.reject(new Error('Room is already closed.'));
    }
  };

  const postImage = function (file: File) {
    if (room.current) {
      return room.current
        .postUpload(file)
        .then((upload: Upload) => {
          if (room.current) {
            return room.current.postMessage({ uploadId: upload.id });
          } else {
            return Promise.reject(new Error('Room is already closed.'));
          }
        })
        .catch((error: Error) => {
          showError('Error uploading your image. ' + error.message);
          return Promise.reject(error);
        });
    } else {
      return Promise.reject(new Error('Room is already closed.'));
    }
  };

  return (
    <RoomContext.Provider
      value={{
        room: room.current,
        roomUser,
        isReady,
        messages,
        roomUserMarker,
        loadEarlierMessages,
        postText,
        postImage,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export { RoomContext, RoomProvider };
