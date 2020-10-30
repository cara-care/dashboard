import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import { NUTRI_NAVIGATION } from '../utils/test-helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(3)}px 0`,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    maxHeight: 68,
    overflowX: 'scroll',
  },
  link: {
    margin: `0 ${theme.spacing(4)}px`,
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
    fontWeight: 500,
    letterSpacing: '0.02857em',
    opacity: 0.7,
    transition: `opacity ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}`,
    '&:hover': {
      opacity: 1,
    },
  },
  activeLink: {
    position: 'relative',
    opacity: 1,
    '&::after': {
      position: 'absolute',
      display: 'block',
      content: "''",
      top: 40,
      left: 0,
      width: '100%',
      height: 4,
      backgroundColor: theme.palette.background.paper,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
    },
  },
  bubble: {
    position: 'relative',
    '&::before': {
      opacity: 1,
      position: 'absolute',
      top: -8,
      right: -8,
      display: 'block',
      content: "''",
      backgroundColor: theme.palette.error.dark,
      width: 8,
      height: 8,
      borderRadius: '50%',
    },
  },
}));

const NutriNavigation: React.FC = () => {
  const classes = useStyles();
  return (
    <nav className={classes.root} data-testid={NUTRI_NAVIGATION}>
      <NavLink
        to="/nutri/programs"
        exact
        className={classes.link}
        activeClassName={classes.activeLink}
      >
        <FormattedMessage
          id="nutriNavigation.enrolledPrograms"
          defaultMessage="Enrolled programs"
        />
      </NavLink>
      <NavLink
        to="/nutri/questionnaires"
        exact
        className={classes.link}
        activeClassName={classes.activeLink}
      >
        <FormattedMessage
          id="nutriNavigation.questionnaires"
          defaultMessage="Questionnaires (new)"
        />
      </NavLink>
      <NavLink
        to="/nutri"
        exact
        className={classes.link}
        activeClassName={classes.activeLink}
      >
        <FormattedMessage id="nutriNavigation.graph" />
      </NavLink>
      <NavLink
        to="/nutri/inbox"
        exact
        className={classes.link}
        activeClassName={classes.activeLink}
      >
        <FormattedMessage id="nutriNavigation.inbox" />
      </NavLink>
    </nav>
  );
};

export default NutriNavigation;
