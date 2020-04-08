import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import {
  isAuthenticated as isAuthenticatedSelector,
  hasPatientId,
  getPatientNickname,
  unselectPatientAction,
  logoutInitAction,
} from '../auth';
import Logo from '../assets/images/logo.png';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
    color: '#637280',
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
    width: 50,
    height: 50,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    marginRight: 20,
  },
}));

const NavBar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isPatientSelected = useSelector(hasPatientId);
  const patientNickname = useSelector(getPatientNickname);
  const unselectPatient = useCallback(() => {
    dispatch(unselectPatientAction());
  }, [dispatch]);
  const handleLogout = useCallback(() => {
    dispatch(logoutInitAction());
  }, [dispatch]);

  return (
    <AppBar elevation={0} color="default" className={classes.appBar}>
      <Toolbar>
        <div className={classes.inner}>
          <div className={classes.flex}>
            <img
              src={Logo}
              className={classes.logo}
              width="50"
              height="50"
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
            {isAuthenticated && (
              <>
                <Hidden mdDown>
                  {isPatientSelected && (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={unselectPatient}
                    >
                      <FormattedMessage
                        id="navbar.selectDifferentPatient"
                        defaultMessage="Select different patient"
                      />
                    </Button>
                  )}
                </Hidden>
                <Tooltip
                  title={
                    <FormattedMessage
                      id="_.common.logout"
                      defaultMessage="Logout"
                    />
                  }
                  aria-label="logout"
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
