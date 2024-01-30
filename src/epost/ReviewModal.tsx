import React from 'react';
import { Button, Checkbox, makeStyles, Typography } from '@material-ui/core';
import { Prescription, ReviewType } from './types';
import Modal from '../components/Modal';
import { PRIMARY_COLOR } from '../theme';

const useStyles = makeStyles((theme) => ({
  flex: { flex: 1 },
  subtitle: {
    paddingTop: '20px',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid black',
    backgroundColor: theme.palette.background.default,
    marginTop: '20px',
  },
  checkboxText: {
    padding: '10px',
    fontWeight: 'bold',
  },
  checkbox: {
    alignSelf: 'center',
  },
  buttonContainer: {
    textAlign: 'center',
  },
  buttonDiv: {
    padding: '10px 20px',
    margin: '5px',
    marginTop: '20px',
    backgroundColor: theme.palette.secondary.main,
    color: PRIMARY_COLOR,
    border: 'none',
    cursor: 'pointer',
  },
  modal: { padding: '20px' },
  pdfContainer: {
    marginTop: '20px',
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  placeholder: {
    marginBottom: '20px',
  },
  redText: {
    color: '#FA5544',
  },
  primaryText: {
    color: PRIMARY_COLOR,
  },
  deleteButton: {
    padding: '10px 20px',
    margin: '5px',
    marginTop: '20px',
    backgroundColor: theme.palette.secondary.main,
    color: '#FA5544',
    border: 'none',
    cursor: 'pointer',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));

interface ReviewModalProps {
  isOpen: boolean;
  title: string;
  subtitle: string;
  action: string;
  confirmText: string;
  reviewConfirmed: boolean;
  content: Prescription | undefined;
  theme?: 'primary' | 'warning';
  onClose: () => void;
  onConfirm: (checked: boolean) => void;
  onSubmit: (action: ReviewType) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  title,
  subtitle,
  action,
  confirmText,
  content,
  reviewConfirmed,
  theme = 'primary',
  onClose,
  onConfirm,
  onSubmit,
}) => {
  const styles = useStyles();
  return (
    <Modal
      open={isOpen}
      actions={
        <div className={styles.modal}>
          <Typography
            variant="h4"
            className={
              theme === 'primary' ? styles.primaryText : styles.redText
            }
          >
            {title}
          </Typography>
          <Typography variant="subtitle1">{subtitle}</Typography>
          <Typography className={styles.subtitle} variant="body1">
            <b>ID: </b>
            {content?.id}
            <br />
            <b>Address: </b>
            {content?.letterReceiver}
            <br />
            <b>Sender Address: </b>
            {content?.letterSender}
            <br />
            <div className={styles.pdfContainer}>
              <a
                className={styles.link}
                href={`/api/${content?.pdfFile}`}
                download
              >
                <p>View auto-generated PDF</p>
              </a>
            </div>
          </Typography>
          <div className={styles.checkboxContainer}>
            <div className={styles.flex}>
              <Typography variant="subtitle1" className={styles.checkboxText}>
                {confirmText}
              </Typography>
            </div>
            <div className={styles.checkbox}>
              <Checkbox
                color="primary"
                checked={reviewConfirmed}
                style={{ padding: 10 }}
                onChange={(e) => onConfirm(e.target.checked)}
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            {action === 'review' ? (
              <Button
                color="primary"
                type="button"
                variant="contained"
                disabled={!reviewConfirmed}
                className={
                  theme === 'primary' ? styles.buttonDiv : styles.deleteButton
                }
                onClick={() => onSubmit(ReviewType.QUEUE)}
              >
                Queue for Later
              </Button>
            ) : (
              ''
            )}

            <Button
              color="primary"
              type="button"
              variant="contained"
              disabled={!reviewConfirmed}
              className={styles.buttonDiv}
              onClick={() => onSubmit(ReviewType.POST)}
            >
              {action === 'review' ? 'Send Now' : 'Delete'}
            </Button>
            <Button className={styles.deleteButton} onClick={onClose}>
              <Typography variant="subtitle2">Cancel</Typography>
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default ReviewModal;
