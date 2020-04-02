import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    paddingTop: theme.spacing(8),
    flexGrow: 1,
    display: 'block',
    width: 'auto',
    maxWidth: '100%',
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
