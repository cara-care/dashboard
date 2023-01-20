import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Translate from '@material-ui/icons/Translate';
import ExpandMore from '@material-ui/icons/ExpandMore';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { makeStyles } from '@material-ui/core/styles';
import {
  isAuthenticated as isAuthenticatedSelector,
  getPatientNickname,
  logoutInitAction,
} from '../auth';
import { getCurrentLocale, setLocale } from '../locale';
import { useIsDarkMode, setTheme } from '../theme';
import { RouterLinkWithPropForwarding as Link } from './Link';
import Logo from '../assets/images/logo.svg';
import { LOCALES } from '../utils/constants';
import { LANGUAGE_MENU_BUTTON } from '../utils/test-helpers';
import { DARK_MODE_ICON, LIGHT_MODE_ICON } from '../utils/test-helpers';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 4px 22px 0 rgba(37,38,94,0.10)',
    zIndex: theme.zIndex.drawer + 1,
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    color: theme.palette.getContrastText(theme.palette.background.paper),
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    marginRight: theme.spacing(3),
    width: 40,
    height: 40,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  language: {
    margin: theme.spacing(0, 0.5, 0, 1),
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
  },
  navbar: {
    overflow: 'hidden',
    backgroundColor: '#333',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
}));

const NavBar: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const patientNickname = useSelector(getPatientNickname);
  const currentLocale = useSelector(getCurrentLocale);
  const isDarkMode = useIsDarkMode();
  const [languageMenu, setLanguageMenu] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const handleSelectPatientPress = useCallback(() => {
    history.push('/nutri/select-patient');
  }, [history]);
  const handleLogout = useCallback(() => {
    dispatch(logoutInitAction());
  }, [dispatch]);
  const handleLocaleChange = useCallback(
    (locale: string) => {
      dispatch(setLocale(locale));
    },
    [dispatch]
  );
  const handleThemeChange = useCallback(
    (nextTheme: 'dark' | 'light') => {
      dispatch(setTheme(nextTheme));
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // desktop notifications
  const [notificationsEnabled, setNotificationsEnabled] = React.useState<
    boolean
  >(localStorage.getItem('notifications') === 'on');

  const toggleNotifications = useCallback(() => {
    if (localStorage.getItem('notifications') === 'on') {
      // disable the desktop notifications
      localStorage.setItem('notifications', 'off');
      setNotificationsEnabled(false);
    } else {
      // enable the desktop notifications
      Notification.requestPermission().then(() => {
        localStorage.setItem('notifications', 'on');
        setNotificationsEnabled(true);
      });
    }
  }, []);

  return (
    <AppBar elevation={0} color="default" className={classes.appBar}>
      <Toolbar>
        <div className={classes.inner}>
          <div className={classes.flex}>
            <Link to="/nutri/home">
              <img
                src={Logo}
                className={classes.logo}
                width="40"
                height="40"
                alt="Cara"
              />
            </Link>
            <h1>Care Panel</h1>
            <Hidden xsDown>
              <Typography variant="body2">
                {isAuthenticated ? (
                  patientNickname
                ) : (
                  <FormattedMessage
                    id="navbar.title.caraWebDashboard"
                    defaultMessage="Cara Web Dashboard"
                  />
                )}
              </Typography>
            </Hidden>
          </div>
          <nav className={classes.nav}>
            <Tooltip
              title={intl.formatMessage({
                id: 'common.changeLanguage',
                defaultMessage: 'Change Language',
              })}
            >
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
            </Tooltip>
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
            <Tooltip
              title={
                <FormattedMessage id="caraPanel.home" defaultMessage="Home" />
              }
              aria-label={intl.formatMessage({
                id: 'caraPanel.home',
                defaultMessage: 'Home',
              })}
            >
              <IconButton to="/nutri/home" component={Link}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={intl.formatMessage({
                id: 'navbar.toggleTheme',
                defaultMessage: 'Toggle light/dark theme',
              })}
              aria-label={intl.formatMessage({
                id: 'navbar.toggleTheme',
                defaultMessage: 'Toggle light/dark theme',
              })}
            >
              <IconButton onClick={toggleTheme}>
                {isDarkMode ? (
                  <Brightness4Icon data-testid={DARK_MODE_ICON} />
                ) : (
                  <Brightness7Icon data-testid={LIGHT_MODE_ICON} />
                )}
              </IconButton>
            </Tooltip>
            {isAuthenticated && (
              <>
                {process.env.REACT_APP_LOCATION === 'EU' && (
                  <Tooltip
                    title={intl.formatMessage({
                      id: 'navbar.toggleNotifications',
                      defaultMessage: 'Toggle notifications',
                    })}
                    aria-label={intl.formatMessage({
                      id: 'navbar.toggleNotifications',
                      defaultMessage: 'Toggle notifications',
                    })}
                  >
                    <IconButton onClick={toggleNotifications}>
                      {notificationsEnabled ? (
                        <NotificationsActiveIcon />
                      ) : (
                        <NotificationsOffIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                )}
                {process.env.REACT_APP_LOCATION === 'GLOBAL' && (
                  <Hidden
                    mdDown
                    // https://material-ui.com/components/use-media-query/#testing
                    implementation={
                      process.env.NODE_ENV === 'test' ? 'css' : undefined
                    }
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleSelectPatientPress}
                    >
                      <FormattedMessage
                        id="navbar.selectDifferentPatient"
                        defaultMessage="Select different patient"
                      />
                    </Button>
                  </Hidden>
                )}

                <Tooltip
                  title={
                    <FormattedMessage
                      id="changePassword.changePassword"
                      defaultMessage="Change Password"
                    />
                  }
                  aria-label={intl.formatMessage({
                    id: 'changePassword.changePassword',
                    defaultMessage: 'Change Password',
                  })}
                >
                  <IconButton to="/nutri/change-password" component={Link}>
                    <VpnKeyIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={
                    <FormattedMessage
                      id="_.common.logout"
                      defaultMessage="Logout"
                    />
                  }
                  aria-label={intl.formatMessage({
                    id: '_.common.logout',
                    defaultMessage: 'Logout',
                  })}
                >
                  <IconButton onClick={handleLogout}>
                    <ExitToApp />
                  </IconButton>
                </Tooltip>
              </>
            )}

            <div>
              <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Dashboard
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          </nav>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
