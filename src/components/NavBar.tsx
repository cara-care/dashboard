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
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
  }, []);
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

  return (
    <AppBar elevation={0} color="default" className={classes.appBar}>
      <Toolbar>
        <div className={classes.inner}>
          <div className={classes.flex}>
            <img
              src={Logo}
              className={classes.logo}
              width="40"
              height="40"
              alt="Cara"
            />
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
                  <Brightness7Icon data-testid={DARK_MODE_ICON} />
                ) : (
                  <Brightness4Icon data-testid={LIGHT_MODE_ICON} />
                )}
              </IconButton>
            </Tooltip>
            {isAuthenticated && (
              <>
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
          </nav>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
