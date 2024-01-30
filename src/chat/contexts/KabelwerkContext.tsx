import Kabelwerk from 'kabelwerk';
import React from 'react';
import { ReactElement } from 'react';

import { getChatAuthorizationToken } from '../../utils/api';
import useNotification from '../hooks/useNotification';
import { HubInfo, Message, User } from '../interfaces';

export const KabelwerkContext = React.createContext<{
  connected: boolean;
  currentUser: User | null;
  hubUsers: User[];
}>({
  connected: false,
  currentUser: null,
  hubUsers: [],
});

export const KabelwerkProvider: React.FC<{
  children: ReactElement;
}> = ({ children }) => {
  const notification = useNotification();

  // whether the websocket connection to the Kabelwerk backend is open
  const [connected, setConnected] = React.useState(false);

  // the connected Kabelwerk user
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  // the list of all care team members, including the connected user
  const [hubUsers, setHubUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    if (Kabelwerk.getState() === Kabelwerk.INACTIVE) {
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
  }, [notification]);

  return (
    <KabelwerkContext.Provider
      value={{
        connected,
        currentUser,
        hubUsers,
      }}
    >
      {children}
    </KabelwerkContext.Provider>
  );
};
