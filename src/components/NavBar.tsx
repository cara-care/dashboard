import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import {
  isAuthenticated as isAuthenticatedSelector,
  getPatientNickname,
  logoutInitAction,
} from '../auth';
import { RouterLinkWithPropForwarding as Link } from './Link';
import Logo from '../assets/images/logo.svg';
import SettingsIcon from '@material-ui/icons/Settings';

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
  button: {
    marginLeft: 20,
    marginRight: 20,
  },
}));

const NavBar: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const patientNickname = useSelector(getPatientNickname);
  const handleSelectPatientPress = useCallback(() => {
    history.push('/nutri/select-patient');
  }, [history]);
  const handleLogout = useCallback(() => {
    dispatch(logoutInitAction());
  }, [dispatch]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            {patientNickname ? patientNickname : <h1>Care Panel</h1>}
          </div>
          <nav className={classes.nav}>
            {isAuthenticated && (
              <>
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
                <div>
                  <Button
                    id="profile-settings-button"
                    aria-controls={open ? 'profile-settings-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    <AccountCircleIcon />
                  </Button>
                  <Menu
                    id="profile-settings-menu"
                    aria-labelledby="profile-settings-button"
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
                    <MenuItem
                      to="/nutri/profile-settings"
                      component={Link}
                      onClick={handleClose}
                    >
                      <IconButton>
                        <SettingsIcon />
                      </IconButton>
                      Profile
                    </MenuItem>
                    <MenuItem>
                      <IconButton
                        onClick={() => {
                          handleClose();
                          handleLogout();
                        }}
                      >
                        <ExitToApp />
                      </IconButton>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </>
            )}
          </nav>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
