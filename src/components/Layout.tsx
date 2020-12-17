import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    paddingTop: theme.spacing(7),
    flexGrow: 1,
    display: 'block',
    width: 'auto',
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(8),
    },
  },
}));

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Layout;
