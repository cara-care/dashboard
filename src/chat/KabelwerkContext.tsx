import Kabelwerk from 'kabelwerk';
import * as React from 'react';
import { ReactElement } from 'react';
import { getChatAuthorizationToken } from '../utils/api';
import { INBOXES } from './inboxes';
import { InboxType } from './pages/Inbox';

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
  loadEarlierMessages: () => Promise<Message[] | void>;
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
      return currentRoom
        .postMessage({ text })
        .then((newMessage: Message) => {
          setMessages([...messages, newMessage]);
          return Promise.resolve(newMessage);
        })
        .catch((error: Error) => {
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
          if (newMessages !== undefined && newMessages.length > 0) {
            setMessages([...newMessages, ...messages]);
          }
          return Promise.resolve(newMessages);
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
      setMessages([...messages, message]);
    });

    room.connect();
  };

  const openInbox = React.useCallback(() => {
    const inbox = Kabelwerk.openInbox({
      limit: 20,
      attributes: INBOXES[currentInboxType].attributes,
      assignedTo:
        currentInboxType === InboxType.PERSONAL && currentUser !== null
          ? currentUser.id
          : undefined,
    });

    setCurrentInbox(inbox);

    inbox.on('ready', ({ rooms }: { rooms: InboxRoom[] }) => {
      setRooms(rooms);
      if (rooms.length > 0) {
        openRoom(rooms[0].id);
        setCurrentInboxRoom(rooms[0]);
      }
    });

    inbox.on('updated', ({ rooms }: { rooms: InboxRoom[] }) => {
      setRooms(rooms);
    });

    inbox.connect();
  }, [currentInboxType]);

  const loadMoreRooms = () => {
    currentInbox
      ?.loadMore()
      .then((response: { rooms: InboxRoom[] }) => {
        setRooms(response.rooms);
      })
      .catch((err: Error) => console.error(err));
  };

  React.useEffect(() => {
    if (!Kabelwerk.isConnected()) {
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
            .catch((err: Error) => console.error(err));
        });

        Kabelwerk.connect();
      });
    }
  }, []);

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
