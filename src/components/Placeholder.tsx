import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from './Spinner';

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: theme.spacing(8),
    width: '100%',
    height: `calc(100vh - ${theme.spacing(8)}px)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
}));

const Placeholder: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Spinner />
    </div>
  );
};

export default Placeholder;
