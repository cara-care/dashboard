import Kabelwerk from 'kabelwerk';
import * as React from 'react';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { isAuthenticated as isAuthenticatedSelector } from '../auth/authReducer';
import { getChatAuthorizationToken } from '../utils/api';
import { INBOXES } from './inboxes';
import { InboxType } from './pages/Inbox';
import useNotification from './hooks/useNotification';

export interface Inbox {
  loadMore: () => Promise<{ rooms: InboxRoom[] }>;
}

export interface InboxRoom {
  id: number;
  lastMessage: Message | null;
  user: User;
  isArchived: () => boolean;
}

export interface Room {
  loadEarlier: () => Promise<{ messages: Message[] }>;
  isArchived: () => boolean;
  postMessage: (message: { text: string }) => Promise<Message>;
  off: () => void;
  archive: () => Promise<void>;
  unarchive: () => Promise<void>;
  getUser: () => User;
}

export enum MessageType {
  Text = 'text',
  RoomMove = 'room_move',
}

export interface Message {
  id: number;
  insertedAt: Date;
  roomId: number;
  text: string;
  type: MessageType;
  updatedAt: Date;
  user: User | null;
}

interface HubInfo {
  id: number;
  name: string;
  users: User[];
}

interface User {
  id: number;
  key: string;
  name: string;
}

export const KabelwerkContext = React.createContext<{
  connected: boolean;
  currentInboxType: InboxType;
  currentUser: User | null;
  currentRoom: Room | null;
  currentInboxRoom: InboxRoom | null;
  messages: Message[];
  rooms: InboxRoom[];
  hubUsers: User[];
  selectInbox: (inbox: InboxType) => void;
  selectRoom: (roomId: number | null) => void;
  selectCurrentInboxRoom: (room: InboxRoom) => void;
  loadMoreRooms: () => void;
  postMessage: (text: string) => Promise<Message | void>;
  loadEarlierMessages: () => Promise<boolean | void>;
}>({
  connected: false,
  currentInboxType: InboxType.ALL,
  currentUser: null,
  currentRoom: null,
  currentInboxRoom: null,
  messages: [],
  rooms: [],
  hubUsers: [],
  selectInbox: () => {},
  selectRoom: () => {},
  selectCurrentInboxRoom: () => {},
  loadMoreRooms: () => {},
  postMessage: () => new Promise(() => {}),
  loadEarlierMessages: () => new Promise(() => {}),
});

export const KabelwerkProvider: React.FC<{
  children: ReactElement;
}> = ({ children }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const notification = useNotification();

  // whether the websocket connection to the Kabelwerk backend is open
  const [connected, setConnected] = React.useState(false);

  // the connected Kabelwerk user
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  // the list of all care team members, including the connected user
  const [hubUsers, setHubUsers] = React.useState<User[]>([]);

  // the currently selected inbox from the left-most menu
  const [currentInboxType, setCurrentInboxType] = React.useState(InboxType.ALL);

  // the currently active Kabelwerk inbox object
  const [currentInbox, setCurrentInbox] = React.useState<Inbox | null>(null);

  // the above's list of rooms
  const [rooms, setRooms] = React.useState<InboxRoom[]>([]);

  // the currently selected room from the inbox room list
  const [
    currentInboxRoom,
    setCurrentInboxRoom,
  ] = React.useState<InboxRoom | null>(null);

  // the currently active Kabelwerk room object
  const [currentRoom, setCurrentRoom] = React.useState<Room | null>(null);

  // the above's messages
  const [messages, setMessages] = React.useState<Message[]>([]);

  const postMessage = (text: string) => {
    if (currentRoom !== null) {
      return currentRoom.postMessage({ text }).catch((error: Error) => {
        return Promise.reject(error);
      });
    }

    return Promise.resolve();
  };

  const loadEarlierMessages = () => {
    if (currentRoom !== null) {
      return currentRoom
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
        .catch((err: Error) => {
          return Promise.reject(err);
        });
    }

    return Promise.resolve();
  };

  const openRoom = (roomId: number) => {
    if (currentRoom !== null) {
      currentRoom.off();
    }

    const room = Kabelwerk.openRoom(roomId);

    room.on('ready', ({ messages }: { messages: Message[] }) => {
      setCurrentRoom(room);
      setMessages(messages);
    });

    room.on('message_posted', (message: Message) => {
      setMessages((messages) => {
        return [...messages, message];
      });
    });

    room.connect();
  };

  const openInbox = React.useCallback(() => {
    const inbox = Kabelwerk.openInbox({
      limit: 20,
      attributes: INBOXES[currentInboxType].attributes,
      archived: INBOXES[currentInboxType].archived,
      // needs to be disabled temporarily because the sdk cannot handle undefined
      // at the moment assigning users to hub users does not work
      // assignedTo:
      //   currentInboxType === InboxType.PERSONAL && currentUser !== null
      //     ? currentUser.id
      //     : undefined,
    });

    setCurrentInbox(inbox);

    inbox.on('ready', ({ rooms }: { rooms: InboxRoom[] }) => {
      setRooms(rooms);
      setMessages([]);
      setCurrentRoom(null);
      setCurrentInboxRoom(null);
    });

    inbox.on('updated', ({ rooms }: { rooms: InboxRoom[] }) => {
      setRooms(rooms);
    });

    inbox.connect();
    /* eslint-disable-next-line */
  }, [currentInboxType]);

  const loadMoreRooms = () => {
    currentInbox
      ?.loadMore()
      .then((response: { rooms: InboxRoom[] }) => {
        setRooms(response.rooms);
      })
      .catch((error: Error) => console.error(error));
    // temporary disabled because load more is called all the time in smaller inboxes
    // .catch((error: Error) => notification.showError(error.message));
  };

  React.useEffect(() => {
    if (isAuthenticated && !Kabelwerk.isConnected()) {
      getChatAuthorizationToken().then((res) => {
        Kabelwerk.config({
          url: process.env.REACT_APP_KABELWERK_URL,
          token: res.data.token,
          refreshToken: () => {
            return getChatAuthorizationToken().then((res) => res.data.token);
          },
          logging: process.env.NOVE_ENV === 'production' ? 'error' : 'info',
        });

        Kabelwerk.on('ready', () => {
          setConnected(true);
          setCurrentUser(Kabelwerk.getUser());
          openInbox();
          Kabelwerk.loadHubInfo()
            .then((response: HubInfo) => setHubUsers(response.users))
            .catch((error: Error) => notification.showError(error.message));
        });

        Kabelwerk.connect();
      });
    }
    /* eslint-disable-next-line */
  }, [isAuthenticated]);

  return (
    <KabelwerkContext.Provider
      value={{
        connected,
        currentInboxType,
        currentUser,
        currentRoom,
        currentInboxRoom,
        messages,
        postMessage,
        loadEarlierMessages,
        selectInbox: (inbox: InboxType) => setCurrentInboxType(inbox),
        selectRoom: (roomId: number) => openRoom(roomId),
        selectCurrentInboxRoom: (room: InboxRoom) => setCurrentInboxRoom(room),
        rooms,
        hubUsers,
        loadMoreRooms,
      }}
    >
      {children}
    </KabelwerkContext.Provider>
  );
};
