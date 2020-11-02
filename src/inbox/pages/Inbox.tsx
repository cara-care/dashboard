import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NutriNavigation from '../../components/NutriNavigation';
import MessagePreview from '../components/MessagePreview';
import Message from '../components/Message';
import InputToolbar from '../components/InputToolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '320px auto',
    width: '100vw',
    height: `calc(100vh - 68px - 64px)`, // 100vh - nutri navigation height - appbar height
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '2px solid #d8eceb',
    overflowY: 'scroll',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
  },
  messages: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column-reverse',
    padding: theme.spacing(2),
    overflowY: 'auto',
  },
}));

export default function Inbox() {
  const classes = useStyles();

  return (
    <>
      <NutriNavigation />
      <div className={classes.root}>
        <div className={classes.sidebar}>
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
        </div>
        <div className={classes.main}>
          <div className={classes.messages}>
            <Message
              position="right"
              message="Hi Benjamin, my name is Alina and I'm your personal dietitian here at Cara Care 😊 I'm glad that you’ve signed up for the IBS program. Which symptoms are you struggling with the most?"
            />
            <Message message="Hi Alina! I mostly struggle with pain and diarrhea." />
          </div>
          <InputToolbar />
        </div>
      </div>
    </>
  );
}
