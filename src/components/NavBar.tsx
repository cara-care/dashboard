import React from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  isAuthenticated as isAuthenticatedSelector,
  getPatientNickname,
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
    marginLeft: 20,
  },
}));

const NavBar: React.FC = () => {
  const classes = useStyles();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const patientNickname = useSelector(getPatientNickname);

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
            {/* {isAuthenticated && (
              <>
                <Hidden mdDown>
                  <Typography variant="body2" className={classes.button}>
                    {patientPhone}
                  </Typography>
                  <Typography variant="body2" className={classes.button}>
                    {patientEmail}
                  </Typography>
                </Hidden>
              </>
            )} */}
          </nav>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
