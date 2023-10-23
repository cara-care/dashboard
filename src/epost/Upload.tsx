import React, { useCallback, useEffect, useState } from 'react';

import {
  Button,
  makeStyles,
  TextField,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import AttachIcon from '@material-ui/icons/AttachFile';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { fetchInsurances, postDraftPrescription } from '../utils/api';
import IconButton from '@material-ui/core/IconButton';
import Modal from '../components/Modal';
import { RouterLinkWithPropForwarding as Link } from '../components/Link';
import { germanFormattedDate } from './utils';

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
  imageFile: File | null;
}

export interface EPostFormData extends FormData {
  imageFile: File;
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
    backgroundColor: theme.palette.background.paper,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
  },
  selectDropdown: {
    marginLeft: '10px',
  },
  dropdownContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginTop: '20px',
  },
  dropdownTextContainer: {
    alignSelf: 'center',
  },
  row: { display: 'flex', justifyContent: 'space-between' },
  modal: { padding: '20px' },
  loadingModal: {
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  modalButton: { marginTop: '20px', width: '100%', display: 'block' },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));

const Upload: React.FC<RouteComponentProps<{
  token?: string;
}>> = () => {
  const fileInput = React.useRef<HTMLInputElement>(null);
  const blankForm = {
    imageFile: null,
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
  const [formData, setFormData] = useState<InitialFormData>(blankForm);
  const [formHidden, setFormHidden] = useState<boolean>(true);
  const [insurances, setInsurances] = useState({});
  const [insurerNames, setInsurerNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [success, setSuccess] = useState<Success | null>(null);
  const [error, setError] = useState('');

  const handleFetchInsurances = () => {
    fetchInsurances().then((response) => {
      const insurances_data: { [key: string]: any } = {};
      response.data.forEach((insurance: { name: string | number }) => {
        insurances_data[insurance.name] = insurance;
      });

      setInsurances(insurances_data);
      setInsurerNames(Object.keys(insurances_data));
    });
  };

  useEffect(() => {
    handleFetchInsurances();
  }, []);

  const toggleSenderDetails = useCallback(() => {
    setFormHidden(!formHidden);
  }, [formHidden]);

  const handleInsurerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedInsurer = event.target.value;
    const selectedInsurerDetails = insurances[selectedInsurer];

    setFormData({
      ...formData,
      addressLineOne: selectedInsurer,
      addressLineTwo: selectedInsurerDetails.address,
      postCode: selectedInsurerDetails.post_code,
      city: selectedInsurerDetails.city,
    });
  };

  const handleFileInputChange = useCallback(() => {
    if (
      fileInput.current &&
      fileInput.current.files !== null &&
      fileInput.current.files.length
    ) {
      setError('');
      return setFormData({
        ...formData,
        imageFile: fileInput.current.files[0],
      });
    }
    return;
  }, [formData, fileInput]);

  const handleSubmit = useCallback(
    async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      setError('');

      const ePostForm = document.getElementById('ePostForm');
      if (formData.imageFile === null || ePostForm === null) {
        setError(
          'There was an error submitting the data. Image or form data is missing.'
        );
        return;
      }

      setLoading(true);

      const ePostFormData = new FormData(ePostForm as HTMLFormElement);

      try {
        const response = await postDraftPrescription(ePostFormData);
        setLoading(false);
        setSuccess({
          letterId: response.data.id,
          time: germanFormattedDate(),
        });
        setShowSuccessMessage(true);
      } catch (error) {
        setLoading(false);
        if (error.response) {
          setError(`Error: ${error.response.data.message}`);
        } else if (error.request) {
          setError('Request to the server failed. Please try again later.');
        } else {
          setError('An error occurred. Please try again later.');
        }
      }
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
      <Typography variant="h4">ePost Upload</Typography>
      <Typography className={styles.subtitle} variant="subtitle1">
        Draft an ePost letter using the form below. <br />
        Drafts can be reviewed and approved for final posting in the{' '}
        <Link className={styles.link} to="/nutri/epost-prescription/review">
          Review
        </Link>{' '}
        section.
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
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownTextContainer}>
          <Typography variant="body1">
            Select an insurer to auto-fill the address below:
          </Typography>
        </div>
        <div>
          <select
            className={styles.selectDropdown}
            onChange={handleInsurerChange}
            value={formData.addressLineOne}
          >
            <option value="" disabled>
              Select an Insurer
            </option>
            {insurerNames.map((insurerName, index) => (
              <option key={index} value={insurerName}>
                {insurerName}
              </option>
            ))}
          </select>
        </div>
      </div>

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
            fullWidth
            required
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
            Prescription Upload
          </Typography>
          <div className={styles.uploadBox}>
            <Typography component="h4" variant="body1">
              Choose a .png or .jpg image of the prescription to upload
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
              name="imageFile"
              accept=".png, .jpg, .jpeg"
              className={styles.fileInput}
              ref={fileInput}
              onChange={handleFileInputChange}
            />
            {!!formData.imageFile?.name ? (
              <div className={styles.row}>
                <Typography className={styles.fileName} variant="body1">
                  {formData.imageFile?.name}
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
          <b>Note:</b> Once the draft has been saved, a pdf will be generated{' '}
          and will be available for review in the{' '}
          <Link to="/nutri/epost-prescription/review">Review</Link> section.
        </Typography>
        <Typography
          className={styles.subtitle}
          variant="subtitle1"
          color="error"
        >
          {error}
        </Typography>
        <Button
          disabled={!formData.imageFile?.name}
          className={styles.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Save draft
        </Button>
      </form>
      <Modal open={loading} actions={null}>
        <div className={styles.loadingModal}>
          <Typography variant="h6">Loading...</Typography>
          <CircularProgress />
        </div>
      </Modal>
      <Modal
        open={showSuccessMessage}
        onClose={() => setShowSuccessMessage(false)}
        actions={
          <div className={styles.modal}>
            <Typography variant="h4" color="primary">
              Saved!
            </Typography>
            <Typography variant="subtitle1">
              Your draft is now ready for review and final approval in the
              "Review" section.
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
              <b>Image file name: </b>
              {formData.imageFile?.name}
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

export default Upload;
