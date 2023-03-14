import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';

import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import AttachIcon from '@material-ui/icons/AttachFile';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { sendPrescription } from '../utils/api';
import IconButton from '@material-ui/core/IconButton';
import Modal from '../components/Modal';

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
  inputBase: {
    marginLeft: '10px',
    ml: 10,
    flex: 1,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
  row: { display: 'flex', justifyContent: 'space-between' },
  modal: { padding: '20px' },
  modalButton: { marginTop: '20px', width: '100%', display: 'block' },
}));

const PrescriptionEpostService: React.FC<RouteComponentProps<{
  token?: string;
}>> = () => {
  const fileInput = React.useRef<HTMLInputElement>(null);

  const styles = useStyles();
  const intl = useIntl();
  const blankForm = {
    pdfFile: null,
    addressLineOne: '',
    addressLineTwo: '',
    postCode: '',
    city: '',
    senderAddressLineOne: '',
    senderAddressLineTwo: '',
    senderPostCode: '',
    senderCity: '',
  };

  const [formData, setFormData] = useState<InitialFormData>(blankForm);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState('');
  const [pdfName, setPdfName] = React.useState('');

  const handleFileInputChange = useCallback(() => {
    if (
      fileInput.current &&
      fileInput.current.files !== null &&
      fileInput.current.files.length
    ) {
      setError('');
      setFormData({ ...formData, pdfFile: fileInput.current.files[0] });
      return setPdfName(fileInput.current.files[0].name);
    }
    return;
  }, [formData]);

  const handleSubmit = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      if (formData.pdfFile === null) {
        return;
      }
      setShowSuccessMessage(true);
      sendPrescription({ ...formData, pdfFile: formData.pdfFile })
        .then((res: any) => {
          setError('');
          setShowSuccessMessage(true);
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
    setFormData((formData) => blankForm);
    setPdfName('');
    setShowSuccessMessage(false);
  }, [blankForm]);

  return (
    <div className={styles.wrapper}>
      <Typography variant="h4">ePost Prescription</Typography>
      <Typography className={styles.subtitle} variant="subtitle1">
        Post a prescription to an insurance provider using the form below.
      </Typography>
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
            name="addressOne"
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
            name="addressTwo"
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
            name="postcode"
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
          <Typography className={styles.subHeader} variant="h6">
            Sender details
          </Typography>
          <Typography variant="subtitle1" className={styles.italicText}>
            The address of the patient who got the prescription
          </Typography>
          <TextField
            id="senderAddressLineOne"
            name="senderAddressOne"
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
            name="addressTwo"
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
            name="city"
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
            name="postcode"
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
              name="upload"
              accept=".pdf"
              className={styles.fileInput}
              ref={fileInput}
              onChange={handleFileInputChange}
            />
            {!!pdfName ? (
              <div className={styles.row}>
                <Typography className={styles.fileName} variant="body1">
                  {pdfName}
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
          disabled={!pdfName}
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
              {`Address: ${formData.addressLineOne}, ${formData.addressLineTwo}, ${formData.city}, ${formData.postCode}`}
              <br />
              {`Sender Address: ${formData.senderAddressLineOne}, ${formData.senderAddressLineTwo}, ${formData.senderCity}, ${formData.senderPostCode}`}
              <br />
              {`PDF file name: ${pdfName}`}
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
