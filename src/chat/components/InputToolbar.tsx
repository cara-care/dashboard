import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AttachIcon from '@material-ui/icons/AttachFile';
import BookmarkIcon from '@material-ui/icons/BookmarkBorder';
import React from 'react';
import { useIntl } from 'react-intl';

import Modal from '../../components/Modal';
import TabPanel from '../../components/TabPanel';

import { RoomContext } from '../contexts/RoomContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  card: {
    paddingBottom: 4,
    border: `1px solid ${theme.palette.divider}`,
    overflow: 'hidden' /* to prevent input borders from overflowing */,
  },
  textarea: {
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
  fileInput: {
    display: 'none',
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

const InputToolbar = function () {
  const classes = useStyles();
  const intl = useIntl();

  const { postText, postImage } = React.useContext(RoomContext);

  // the <input> for uploading files
  const fileInput = React.useRef(null);

  // the value of the <textarea> for posting messages
  const [draft, setDraft] = React.useState('');

  // whether to show the upload preview <Modal>
  const [showUploadPreview, setShowUploadPreview] = React.useState(false);

  // the src of the upload preview <img>
  const [uploadPreviewUrl, setUploadPreviewUrl] = React.useState('');

  // called when the send button is presed
  const submitText = function () {
    if (draft.length > 0) {
      postText(draft);
      setDraft('');
    }
  };

  // called when the send button on an image preview dialog is pressed
  const submitImage = function () {
    // @ts-ignore
    if (fileInput.current && fileInput.current.files.length) {
      // @ts-ignore
      postImage(fileInput.current.files[0]);
      setShowUploadPreview(false);
    }
  };

  // called when the user selects a file from the browser's file picker
  const handleFileInputChange = function () {
    // @ts-ignore
    if (fileInput.current && fileInput.current.files.length) {
      setUploadPreviewUrl((prevUrl) => {
        if (prevUrl) {
          URL.revokeObjectURL(prevUrl);
        }

        // @ts-ignore
        return URL.createObjectURL(fileInput.current.files[0]);
      });

      setShowUploadPreview(true);
    }
  };

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.card}>
        <TabPanel value={0} index={0}>
          <textarea
            value={draft}
            rows={4}
            className={classes.textarea}
            onChange={(e) => setDraft(e.target.value)}
          />
          <input
            type="file"
            name="upload"
            accept="image/*"
            className={classes.fileInput}
            ref={fileInput}
            onChange={handleFileInputChange}
          />
          <div className={classes.footer}>
            <div>
              <IconButton>
                <AttachIcon
                  onClick={() => {
                    // @ts-ignore
                    fileInput.current.click();
                  }}
                />
              </IconButton>
              <IconButton>
                <BookmarkIcon />
              </IconButton>
            </div>
            <Button
              variant="contained"
              color="primary"
              disabled={!draft}
              onClick={submitText}
            >
              {intl.formatMessage({
                id: 'common.send',
                defaultMessage: 'Send',
              })}
            </Button>
          </div>
        </TabPanel>
      </Paper>

      <Modal
        open={showUploadPreview}
        onClose={() => setShowUploadPreview(false)}
        actions={
          <>
            <Button onClick={() => setShowUploadPreview(false)}>Close</Button>
            <Button onClick={submitImage}>Send</Button>
          </>
        }
      >
        <img src={uploadPreviewUrl} alt="Preview" />
      </Modal>
    </div>
  );
};

export default InputToolbar;
