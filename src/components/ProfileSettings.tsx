import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import Paper from '@material-ui/core/Paper';

import { isAuthenticated as isAuthenticatedSelector } from '../auth';
import { RouterLinkWithPropForwarding as Link } from './Link';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import {
  DARK_MODE_ICON,
  LANGUAGE_MENU_BUTTON,
  LIGHT_MODE_ICON,
} from '../utils/test-helpers';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { setTheme, useIsDarkMode } from '../theme';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { LOCALES } from '../utils/constants';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { getCurrentLocale, setLocale } from '../locale';
import Button from '@material-ui/core/Button';
import Translate from '@material-ui/icons/Translate';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  link: {
    display: 'block',
    textAlign: 'center',
    width: '100%',
  },
  column: {
    float: 'left',
    width: '25%',
    padding: '0 10px',
  },
  gridArticle: {
    border: '1px solid #ccc',
    boxShadow: '2px 2px 6px 0px  grey',
  },
  row: {
    margin: '0 -5px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    gridGap: '20px',
    alignItems: 'start',
  },
  text: {
    padding: '0 20px 20px',
  },
  textButton: {
    background: 'green',
    border: '0',
    color: 'white',
    padding: '10px',
    width: '100%',
  },
  language: {
    margin: theme.spacing(0, 0.5, 0, 1),
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
}));

const ProfileSettings: React.FC<RouteComponentProps<{
  token?: string;
}>> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isDarkMode = useIsDarkMode();
  const currentLocale = useSelector(getCurrentLocale);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState<
    boolean
  >(localStorage.getItem('notifications') === 'on');
  const [languageMenu, setLanguageMenu] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const handleThemeChange = useCallback(
    (nextTheme: 'dark' | 'light') => {
      dispatch(setTheme(nextTheme));
    },
    [dispatch]
  );
  const handleLocaleChange = useCallback(
    (locale: string) => {
      dispatch(setLocale(locale));
    },
    [dispatch]
  );
  const handleLanguageMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setLanguageMenu(event.currentTarget);
  };
  const handleLanguageMenuClose = (localeCode?: string) => {
    if (localeCode) {
      handleLocaleChange(localeCode);
    }
    setLanguageMenu(null);
  };
  const toggleTheme = useCallback(() => {
    handleThemeChange(isDarkMode ? 'light' : 'dark');
  }, [handleThemeChange, isDarkMode]);
  const toggleNotifications = useCallback(() => {
    if (localStorage.getItem('notifications') === 'on') {
      localStorage.setItem('notifications', 'off');
      setNotificationsEnabled(false);
    } else {
      Notification.requestPermission().then(() => {
        localStorage.setItem('notifications', 'on');
        setNotificationsEnabled(true);
      });
    }
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/nutri/login" />;
  }

  return (
    <Paper className={classes.paper} elevation={0}>
      <Avatar className={classes.avatar}>
        <SettingsIcon />
      </Avatar>

      <h1>Profile Settings</h1>
      <div className={classes.grid}>
        <div className={classes.gridArticle}>
          <div className={classes.text}>
            <h3>Language</h3>
            <Button
              aria-controls="language-menu"
              aria-haspopup="true"
              data-testid={LANGUAGE_MENU_BUTTON}
              onClick={handleLanguageMenuOpen}
            >
              <Translate />
              <span className={classes.language}>
                {LOCALES.find((el) => el.code === currentLocale)?.locale ||
                  intl.formatMessage({
                    id: 'common.language',
                    defaultMessage: 'Language',
                  })}
              </span>
              <ExpandMore fontSize="small" />
            </Button>
            <Menu
              id="language-menu"
              anchorEl={languageMenu}
              open={Boolean(languageMenu)}
              onClose={() => handleLanguageMenuClose()}
            >
              {LOCALES.map(({ code, locale }) => (
                <MenuItem
                  key={code}
                  lang={code}
                  selected={currentLocale === locale}
                  onClick={() => handleLanguageMenuClose(code)}
                >
                  {locale}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
        <div className={classes.gridArticle}>
          <div className={classes.text}>
            <h3>
              Change Password
              <IconButton to="/nutri/change-password" component={Link}>
                <VpnKeyIcon />
              </IconButton>
            </h3>
          </div>
        </div>
        {process.env.REACT_APP_LOCATION === 'EU' && (
          <div className={classes.gridArticle}>
            <div className={classes.text}>
              <h3>
                Toggle Notifications
                <IconButton onClick={toggleNotifications}>
                  {notificationsEnabled ? (
                    <NotificationsActiveIcon />
                  ) : (
                    <NotificationsOffIcon />
                  )}
                </IconButton>
              </h3>
            </div>
          </div>
        )}
        <div className={classes.gridArticle}>
          <div className={classes.text}>
            <h3>
              Toggle Theme
              <IconButton onClick={toggleTheme}>
                {isDarkMode ? (
                  <Brightness4Icon data-testid={DARK_MODE_ICON} />
                ) : (
                  <Brightness7Icon data-testid={LIGHT_MODE_ICON} />
                )}
              </IconButton>
            </h3>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default ProfileSettings;
