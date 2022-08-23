import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AttachIcon from '@material-ui/icons/AttachFile';
import BookmarkIcon from '@material-ui/icons/BookmarkBorder';
import React from 'react';
import { useIntl } from 'react-intl';

import TabPanel from '../../components/TabPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  card: {
    paddingBottom: 4,
    border: `1px solid ${theme.palette.divider}`,
    overflow: 'hidden' /* to prevent input borders from overflowing */,
  },
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
  postMessage: (text: string) => void;
}

const InputToolbar = function ({ postMessage }: InputToolbarProps) {
  const classes = useStyles();
  const intl = useIntl();

  // the draft message
  const [message, setMessage] = React.useState('');

  // called when the send button is presed
  const handleSubmit = function () {
    if (message) {
      postMessage(message);
      setMessage('');
    }
  };

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.card}>
        <TabPanel value={0} index={0}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={classes.input}
            rows={4}
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
              {intl.formatMessage({
                id: 'common.send',
                defaultMessage: 'Send',
              })}
            </Button>
          </div>
        </TabPanel>
      </Paper>
    </div>
  );
};

export default InputToolbar;
