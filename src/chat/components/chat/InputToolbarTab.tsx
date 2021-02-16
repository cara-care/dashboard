import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AttachIcon from '@material-ui/icons/AttachFile';
import BookmarkIcon from '@material-ui/icons/BookmarkBorder';
import { makeStyles } from '@material-ui/core/styles';
import { CHAT_MESSAGE_INPUT } from '../../../utils/test-helpers';
import TabPanel from '../../../components/TabPanel';

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    width: '100%',
    resize: 'none',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    outline: 0,
    border: 0,
    ...theme.typography.body1,
  },
  footer: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

interface InputToolbarProps {
  value: number;
  index: number;
  onSubmit: (message: string) => void;
  buttonMessage: string;
}

export default function InputToolbar({
  value,
  index,
  onSubmit,
  buttonMessage,
}: InputToolbarProps) {
  const classes = useStyles();
  const [message, setMessage] = useState('');

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (message) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <TabPanel value={value} index={index}>
      <textarea
        value={message}
        onChange={handleMessageChange}
        className={classes.input}
        rows={4}
        data-testid={CHAT_MESSAGE_INPUT}
      />
      <div className={classes.footer}>
        <div>
          <IconButton>
            <AttachIcon />
          </IconButton>
          <IconButton>
            <BookmarkIcon />
          </IconButton>
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={!message}
          onClick={handleSubmit}
        >
          {buttonMessage}
        </Button>
      </div>
    </TabPanel>
  );
}
