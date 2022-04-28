import Kabelwerk from 'kabelwerk';
import React from 'react';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { isAuthenticated as isAuthenticatedSelector } from '../auth/authReducer';
import { getChatAuthorizationToken } from '../utils/api';
import { INBOXES, InboxType } from './inboxes';
import useNotification from './hooks/useNotification';
import { HubInfo, User, Inbox, InboxItem, Message } from './interfaces';

export const KabelwerkContext = React.createContext<{
  connected: boolean;
  currentUser: User | null;
  inboxItems: InboxItem[];
  hubUsers: User[];
  openInbox: (inbox: InboxType) => void;
  loadMoreInboxItems: () => Promise<boolean>;
}>({
  connected: false,
  currentUser: null,
  inboxItems: [],
  hubUsers: [],
  openInbox: () => {},
  loadMoreInboxItems: () => new Promise(() => {}),
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
        inboxItems,
        hubUsers,
        openInbox: (inbox: InboxType) => openInbox(inbox),
        loadMoreInboxItems,
      }}
    >
      {children}
    </KabelwerkContext.Provider>
  );
};
