import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';

import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import AttachIcon from '@material-ui/icons/AttachFile';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { sendPrescription } from '../utils/api';
import IconButton from '@material-ui/core/IconButton';
import Modal from '../components/Modal';

interface Success {
  letterId: string;
  time: string;
}
interface FormData {
  addressLineOne: string;
  addressLineTwo: string;
  postCode: string;
  city: string;
  senderAddressLineOne: string;
  senderAddressLineTwo: string;
  senderPostCode: string;
  senderCity: string;
}

interface InitialFormData extends FormData {
  pdfFile: File | null;
}

export interface EPostFormData extends FormData {
  pdfFile: File;
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing(8),
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(),
  },
  formHidden: {
    display: 'none',
  },
  inputBase: {
    marginLeft: '10px',
    ml: 10,
    flex: 1,
  },
  submit: {
    margin: '10px 0 50px',
  },
  fileInput: {
    display: 'none',
  },
  subtitle: {
    paddingTop: '20px',
  },
  subHeader: {
    marginTop: '30px',
  },
  uploadBox: {
    border: '2px solid #479f9d',
    padding: '20px',
    margin: '20px 0 20px 0',
  },
  fileName: { fontWeight: 'bold' },
  italicText: {
    fontStyle: 'italic',
  },
  rowItem: { display: 'flex', flex: 1 },
  expandRowSymbol: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  collapsibleRow: {
    cursor: 'pointer',
    backgroundColor: '#f1f1f1',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
  },
  row: { display: 'flex', justifyContent: 'space-between' },
  modal: { padding: '20px' },
  modalButton: { marginTop: '20px', width: '100%', display: 'block' },
}));

const PrescriptionEpostService: React.FC<RouteComponentProps<{
  token?: string;
}>> = () => {
  const fileInput = React.useRef<HTMLInputElement>(null);

  const blankForm = {
    pdfFile: null,
    addressLineOne: '',
    addressLineTwo: '',
    postCode: '',
    city: '',
    senderAddressLineOne: 'HiDoc Technologies GmbH',
    senderAddressLineTwo: 'Hohe Bleichen 22',
    senderPostCode: '20354',
    senderCity: 'Hamburg',
  };

  const styles = useStyles();
  const intl = useIntl();
  const [formData, setFormData] = useState<InitialFormData>(blankForm);
  const [formHidden, setFormHidden] = useState<boolean>(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [success, setSuccess] = useState<Success | null>(null);
  const [error, setError] = useState('');

  const toggleSenderDetails = useCallback(() => {
    setFormHidden(!formHidden);
  }, [formHidden]);

  const handleFileInputChange = useCallback(() => {
    if (
      fileInput.current &&
      fileInput.current.files !== null &&
      fileInput.current.files.length
    ) {
      setError('');
      return setFormData({ ...formData, pdfFile: fileInput.current.files[0] });
    }
    return;
  }, [formData, fileInput]);

  const handleSubmit = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      const formElement = document.querySelector('form');
      if (formData.pdfFile === null || formElement === null) {
        return;
      }

      const ePostFormData = new FormData(formElement);
      sendPrescription(ePostFormData)
        .then((res: any) => {
          setSuccess({
            letterId: res.data.letterID,
            time: new Date().toUTCString(),
          });
          setShowSuccessMessage(true);
          setError('');
        })
        .catch((error) => {
          setError(
            `There was an error sending the prescription to the backend: ${error.response.data.detail}. Please try again.`
          );
        });
    },
    [formData]
  );

  const handleModalClose = useCallback(() => {
    setFormData(() => blankForm);
    setShowSuccessMessage(false);
  }, [blankForm]);

  const toggleSymbol = formHidden ? '+' : '-';

  return (
    <div className={styles.wrapper}>
      <Typography variant="h4">ePost Prescription</Typography>
      <Typography className={styles.subtitle} variant="subtitle1">
        Post a prescription to an insurance provider using the form below.
      </Typography>
      {success && (
        <Typography
          color="primary"
          className={styles.subtitle}
          variant="subtitle1"
        >
          <em>
            Previously posted a prescription <b>{success.time}</b>, reference
            letterId: <b>{success.letterId}</b>
          </em>
        </Typography>
      )}
      <form id="ePostForm" className={styles.form} onSubmit={handleSubmit}>
        <div>
          <Typography className={styles.subHeader} variant="h6">
            Address
          </Typography>
          <Typography
            component="h6"
            variant="subtitle1"
            className={styles.italicText}
          >
            The address of the insurance provider
          </Typography>
          <TextField
            id="addressOne"
            name="addressLineOne"
            label={'Address Line 1'}
            value={formData.addressLineOne}
            margin="normal"
            required
            fullWidth
            onChange={(e) =>
              setFormData({
                ...formData,
                addressLineOne: e.target.value,
              })
            }
          />
          <TextField
            id="addressTwo"
            name="addressLineTwo"
            label={'Address Line 2'}
            value={formData.addressLineTwo}
            margin="normal"
            required
            fullWidth
            onChange={(e) =>
              setFormData({
                ...formData,
                addressLineTwo: e.target.value,
              })
            }
          />
          <TextField
            id="city"
            name="city"
            label={'City'}
            value={formData.city}
            margin="normal"
            required
            fullWidth
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          <TextField
            id="postcode"
            name="postCode"
            label={'Postcode'}
            value={formData.postCode}
            margin="normal"
            required
            fullWidth
            onChange={(e) =>
              setFormData({ ...formData, postCode: e.target.value })
            }
          />
        </div>
        <div>
          <div className={styles.collapsibleRow} onClick={toggleSenderDetails}>
            <div className={styles.rowItem}>
              <Typography variant="h6">Sender details</Typography>
            </div>

            <div className={styles.expandRowSymbol}>
              <Typography variant="h6">{toggleSymbol}</Typography>
            </div>
          </div>
          <div className={formHidden ? styles.formHidden : undefined}>
            <Typography variant="subtitle1" className={styles.italicText}>
              The address of the person with the prescription
            </Typography>
            <TextField
              id="senderAddressLineOne"
              name="senderAddressLineOne"
              label={'Sender Address Line 1'}
              value={formData.senderAddressLineOne}
              margin="normal"
              required
              fullWidth
              onChange={(e) =>
                setFormData({
                  ...formData,
                  senderAddressLineOne: e.target.value,
                })
              }
            />
            <TextField
              id="addressTwo"
              name="senderAddressLineTwo"
              label={'Address Line 2'}
              value={formData.senderAddressLineTwo}
              margin="normal"
              required
              fullWidth
              onChange={(e) =>
                setFormData({
                  ...formData,
                  senderAddressLineTwo: e.target.value,
                })
              }
            />
            <TextField
              id="city"
              name="senderCity"
              label={'City'}
              value={formData.senderCity}
              margin="normal"
              required
              fullWidth
              onChange={(e) =>
                setFormData({ ...formData, senderCity: e.target.value })
              }
            />
            <TextField
              id="postcode"
              name="senderPostCode"
              label={'Postcode'}
              value={formData.senderPostCode}
              margin="normal"
              required
              fullWidth
              onChange={(e) =>
                setFormData({ ...formData, senderPostCode: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <Typography className={styles.subHeader} variant="h6">
            PDF Upload
          </Typography>
          <div className={styles.uploadBox}>
            <Typography component="h4" variant="body1">
              Choose a file to upload
              <IconButton
                onClick={() => {
                  // @ts-ignore
                  fileInput.current.click();
                }}
              >
                <AttachIcon />
              </IconButton>
            </Typography>
            <input
              type="file"
              name="pdfFile"
              accept=".pdf"
              className={styles.fileInput}
              ref={fileInput}
              onChange={handleFileInputChange}
            />
            {!!formData.pdfFile?.name ? (
              <div className={styles.row}>
                <Typography className={styles.fileName} variant="body1">
                  {formData.pdfFile?.name}
                </Typography>
                <CheckCircleIcon color="primary" />
              </div>
            ) : (
              <Typography className={styles.italicText} variant="body1">
                No file chosen
              </Typography>
            )}
          </div>
        </div>
        <Typography className={styles.subtitle} variant="subtitle1">
          <b>Note:</b> It is only possible to post one document, so the
          prescription and accompanying documents must be combined into a single
          PDF.
        </Typography>
        <Typography
          className={styles.subtitle}
          variant="subtitle1"
          color="error"
        >
          {error}
        </Typography>
        <Button
          disabled={!formData.pdfFile?.name}
          className={styles.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          {intl.formatMessage({
            id: 'common.send',
            defaultMessage: 'Send',
          })}
        </Button>
      </form>
      <Modal
        open={showSuccessMessage}
        onClose={() => setShowSuccessMessage(false)}
        actions={
          <div className={styles.modal}>
            <Typography variant="h4" color="primary">
              Success!
            </Typography>
            <Typography variant="subtitle1">
              The prescription is on its way!
            </Typography>
            <Typography className={styles.subtitle} variant="body1">
              <b>Address: </b>
              {formData.addressLineOne}, {formData.addressLineTwo},{' '}
              {formData.city}, {formData.postCode}
              <br />
              <b>Sender Address: </b>
              {formData.senderAddressLineOne}, {formData.senderAddressLineTwo},{' '}
              {formData.senderPostCode}, {formData.senderCity}
              <br />
              <b>PDF file name: </b>
              {formData.pdfFile?.name}
            </Typography>
            <Typography
              className={styles.subtitle}
              variant="subtitle1"
              color="primary"
            >
              <b>Reference letterID: {success?.letterId}</b>
            </Typography>
            <Typography className={styles.subtitle} variant="subtitle1">
              ^ Please note down the reference letterID for follow-up inquiries.
            </Typography>
            <Button className={styles.modalButton} onClick={handleModalClose}>
              <Typography variant="subtitle2">Close</Typography>
            </Button>
          </div>
        }
      ></Modal>
    </div>
  );
};

export default PrescriptionEpostService;
