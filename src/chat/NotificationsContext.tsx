import * as React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

enum Severity {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

interface Notification {
  message: string;
  severity?: Severity;
}

const AUTO_HIDE_DURATION = 5000;

export const NotificationsContext = React.createContext<{
  showError: (text: string) => void;
  showWarning: (text: string) => void;
  showInfo: (text: string) => void;
  showSuccess: (text: string) => void;
}>({
  showError: () => {},
  showWarning: () => {},
  showInfo: () => {},
  showSuccess: () => {},
});

const Notification: React.FC<{
  message: string;
  severity?: Severity;
  isShowing: (open: boolean) => void;
}> = (props) => {
  const [open, setOpen] = React.useState<boolean>(true);
  const [message, setMessage] = React.useState<string | null>(props.message);

  React.useEffect(() => {
    setMessage(props.message);
  }, [props]);

  React.useEffect(() => {
    props.isShowing(open);
  }, [open, props]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={AUTO_HIDE_DURATION}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={handleClose}
      transitionDuration={{
        exit: 0,
      }}
    >
      <Alert
        onClose={handleClose}
        severity={props.severity || 'info'}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export const NotificationsProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [notification, setNotification] = React.useState<Notification | null>(
    null
  );

  const showError = (text: string) => {
    setNotification({
      message: text,
      severity: Severity.Error,
    });
  };

  const showWarning = (text: string) => {
    setNotification({
      message: text,
      severity: Severity.Warning,
    });
  };

  const showSuccess = (text: string) => {
    setNotification({
      message: text,
      severity: Severity.Success,
    });
  };

  const showInfo = (text: string) => {
    setNotification({
      message: text,
      severity: Severity.Info,
    });
  };

  const isShowing = (open: boolean) => {
    if (!open) {
      setNotification(null);
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        showError,
        showWarning,
        showInfo,
        showSuccess,
      }}
    >
      {notification !== null ? (
        <Notification
          message={notification.message}
          severity={notification.severity}
          isShowing={(open: boolean) => {
            isShowing(open);
          }}
        />
      ) : null}
      {children}
    </NotificationsContext.Provider>
  );
};
