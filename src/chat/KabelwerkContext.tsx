import Kabelwerk from 'kabelwerk';
import * as React from 'react';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { isAuthenticated as isAuthenticatedSelector } from '../auth/authReducer';
import { getChatAuthorizationToken } from '../utils/api';
import { INBOXES, InboxType } from './inboxes';
import useNotification from './hooks/useNotification';
import { HubInfo, User, Inbox, InboxItem, Room, Message } from './interfaces';

export const KabelwerkContext = React.createContext<{
  connected: boolean;
  currentUser: User | null;
  currentRoom: Room | null;
  messages: Message[];
  inboxItems: InboxItem[];
  hubUsers: User[];
  openInbox: (inbox: InboxType) => void;
  openRoom: (roomId: number | null) => void;
  loadMoreInboxItems: () => Promise<boolean>;
  postMessage: (text: string) => Promise<Message | void>;
  loadEarlierMessages: () => Promise<boolean | void>;
}>({
  connected: false,
  currentUser: null,
  currentRoom: null,
  messages: [],
  inboxItems: [],
  hubUsers: [],
  openInbox: () => {},
  openRoom: () => {},
  loadMoreInboxItems: () => new Promise(() => {}),
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

  // the currently active Kabelwerk inbox object
  const [currentInbox, setCurrentInbox] = React.useState<Inbox | null>(null);

  // the above's list of inbox items
  const [inboxItems, setInboxItems] = React.useState<InboxItem[]>([]);

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

  const openRoom = (roomId: number | null) => {
    // TODO remove with selectRoom refactor
    // ideally we want to set the currentRoom to the topmost room from the roomlist
    // this is not possible at that moment, that is why when archiving for example, the currentRoom needs to be deselected
    if (roomId === null) {
      currentRoom?.off();
      setCurrentRoom(null);
      setMessages([]);
      return;
    }

    if (currentRoom !== null) {
      currentRoom.off();
    }

    const room = Kabelwerk.openRoom(roomId);

    room.on('ready', ({ messages }: { messages: Message[] }) => {
      setCurrentRoom(room);
      setMessages(messages);

      if (messages.length) {
        room.moveMarker(messages[messages.length - 1].id);
      }
    });

    room.on('message_posted', (message: Message) => {
      setMessages((messages) => {
        return [...messages, message];
      });

      room.moveMarker(message.id);
    });

    room.connect();
  };

  const openInbox = React.useCallback((inboxType: InboxType) => {
    const inbox = Kabelwerk.openInbox({
      limit: 20,
      attributes: INBOXES[inboxType].attributes,
      archived: INBOXES[inboxType].archived,
      assignedTo:
        inboxType === InboxType.PERSONAL && currentUser !== null
          ? currentUser.id
          : undefined,
    });

    setCurrentInbox(inbox);

    inbox.on('ready', ({ items }: { items: InboxItem[] }) => {
      items = items.filter((item) => item.message !== null);

      setInboxItems(items);
      openRoom(items.length > 0 ? items[0].room.id : null);
    });

    inbox.on('updated', ({ items }: { items: InboxItem[] }) => {
      items = items.filter((item) => item.message !== null);

      setInboxItems(items);
    });

    inbox.connect();
    /* eslint-disable-next-line */
  }, []);

  const loadMoreInboxItems = () => {
    if (currentInbox === null) {
      return Promise.resolve(false);
    }
    return currentInbox
      ?.loadMore()
      .then(({ items }: { items: InboxItem[] }) => {
        items = items.filter((item) => item.message !== null);

        if (items.length > inboxItems.length) {
          setInboxItems(items);
          return true;
        }

        return false;
      })
      .catch((error: Error) => {
        notification.showError(error.message);
        return false;
      });
  };

  React.useEffect(() => {
    if (isAuthenticated && Kabelwerk.getState() === Kabelwerk.INACTIVE) {
      Kabelwerk.config({
        url: process.env.REACT_APP_KABELWERK_URL,
        refreshToken: () => {
          return getChatAuthorizationToken().then((res) => res.data.token);
        },
        logging: process.env.NOVE_ENV === 'production' ? 'error' : 'info',
      });

      Kabelwerk.on('ready', () => {
        setConnected(true);
        setCurrentUser(Kabelwerk.getUser());
        openInbox(InboxType.ALL);
        Kabelwerk.loadHubInfo()
          .then((response: HubInfo) => setHubUsers(response.users))
          .catch((error: Error) => notification.showError(error.message));

        const notifier = Kabelwerk.openNotifier();

        notifier.on('updated', ({ message }: { message: Message }) => {
          notification.triggerDesktopNotification(message);
        });

        notifier.connect();
      });

      Kabelwerk.connect();
    }
    /* eslint-disable-next-line */
  }, [isAuthenticated]);

  // opens a new inbox when it changes
  React.useEffect(() => {
    if (connected) {
      openInbox(InboxType.ALL);
    }
  }, [openInbox, connected]);

  return (
    <KabelwerkContext.Provider
      value={{
        connected,
        currentUser,
        currentRoom,
        messages,
        inboxItems,
        hubUsers,
        postMessage,
        loadEarlierMessages,
        openInbox: (inbox: InboxType) => openInbox(inbox),
        openRoom: (roomId: number) => openRoom(roomId),
        loadMoreInboxItems,
      }}
    >
      {children}
    </KabelwerkContext.Provider>
  );
};
