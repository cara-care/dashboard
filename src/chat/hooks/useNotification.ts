import { NotificationsContext } from '../NotificationsContext';
import * as React from 'react';

const useNotification = () => {
  const context = React.useContext(NotificationsContext);

  return context;
};

export default useNotification;
