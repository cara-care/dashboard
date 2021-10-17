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
}

export interface Room {
  loadEarlier: () => Promise<{ messages: Message[] }>;
  postMessage: (message: { text: string }) => Promise<Message>;
  off: () => {};
  user: User;
}

export interface Message {
  id: number;
  insertedAt: Date;
  roomId: number;
  text: string;
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
  selectRoom: (roomId: number) => void;
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

  const [connected, setConnected] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [
    currentInboxRoom,
    setCurrentInboxRoom,
  ] = React.useState<InboxRoom | null>(null);
  const [currentInbox, setCurrentInbox] = React.useState<Inbox | null>(null);
  const [currentInboxType, setCurrentInboxType] = React.useState(InboxType.ALL);
  const [currentRoom, setCurrentRoom] = React.useState<Room | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [hubUsers, setHubUsers] = React.useState<User[]>([]);
  const [rooms, setRooms] = React.useState<InboxRoom[]>([]);

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
      setMessages(messages);
    });

    room.on('message_posted', (message: Message) => {
      setMessages((messages) => {
        return [...messages, message];
      });
    });

    room.connect();

    setCurrentRoom(room);
  };

  const openInbox = React.useCallback(() => {
    const inbox = Kabelwerk.openInbox({
      limit: 20,
      attributes: INBOXES[currentInboxType].attributes,
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
      .catch((error: Error) => notification.showError(error.message));
  };

  React.useEffect(() => {
    if (!Kabelwerk.isConnected()) {
      isAuthenticated &&
        getChatAuthorizationToken().then((res) => {
          Kabelwerk.config({
            url: process.env.REACT_APP_KABELWERK_URL,
            token: res.data.token,
            refreshToken: () => {
              return getChatAuthorizationToken().then((res) => res.data.token);
            },
            logging: 'info',
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

  React.useEffect(() => {
    // open inbox
    if (connected && currentInboxType !== null) {
      openInbox();
    }
  }, [currentInboxType, openInbox, connected]);

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
