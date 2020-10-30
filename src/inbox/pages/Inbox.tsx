import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NutriNavigation from '../../components/NutriNavigation';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '192px auto',
    width: '100vw',
    height: `calc(100vh - 68px - 64px)`, // 100vh - nutri navigation height - appbar height
  },
}));

export default function Inbox() {
  const classes = useStyles();

  return (
    <>
      <NutriNavigation />
      <div className={classes.root}>
        <aside></aside>
      </div>
    </>
  );
}
