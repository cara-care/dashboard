import React, { useCallback, useEffect, useState } from 'react';

import { makeStyles, Typography, Button } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import useSearchPrescriptions from './useSearchPrescriptions';
import { PRIMARY_COLOR } from '../theme';
import { EpostStatus, Prescription } from './types';
import { RESULTS_PER_PAGE } from '../utils/api';
import Modal from '../components/Modal';

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
  subtitle: {
    paddingTop: '20px',
  },
  header: {
    fontWeight: 'bold',
  },
  results: {
    marginTop: '20px',
    border: '1px solid black',
    padding: '20px',
    marginBottom: '40px',
  },
  modalButton: { marginTop: '20px', width: '100%', display: 'block' },
  detailsContainer: {
    flex: 1,
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    marginBottom: '20px',
  },
  smallColumn: {
    flex: 1,
  },
  column: {
    flex: 3,
    marginLeft: 10,
  },
  filterContainer: {
    marginTop: '20px',
    marginBottom: '20px',
    backgroundColor: '#f1f1f1',
    border: `1px solid ${PRIMARY_COLOR}`,
    padding: '20px',
  },
  filterText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: PRIMARY_COLOR,
    marginBottom: '15px',
  },
  filterSetting: {
    marginTop: '20px',
    flex: 1,
  },
  label: {
    marginRight: '10px',
  },
  input: {
    marginRight: '10px',
  },
  pageButton: {
    backgroundColor: PRIMARY_COLOR,
    color: 'white',
    border: 'none',
    padding: '5px',
    marginRight: '5px',
  },
  pageButtonDisabled: {
    backgroundColor: 'grey',
    color: 'white',
    border: 'none',
    padding: '5px',
    marginRight: '5px',
  },
  pageButtonContainer: {
    marginBottom: '40px',
  },
  modal: { padding: '20px' },
  pdfContainer: {
    marginTop: '20px',
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

const Track: React.FC<RouteComponentProps<{}>> = () => {
  const styles = useStyles();
  const { prescriptions, fetchPrescriptions } = useSearchPrescriptions({});

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageTotal, setPageTotal] = useState<number>(1);
  const [reviewItem, setReviewItem] = useState<Prescription | undefined>(
    undefined
  );

  const loadingDrafts = prescriptions === undefined;
  const noDrafts = prescriptions && prescriptions.results.length === 0;

  useEffect(() => {
    if (prescriptions) {
      setPageTotal(Math.ceil(prescriptions.count / RESULTS_PER_PAGE));
    }
  }, [prescriptions]);

  useEffect(() => {
    fetchPrescriptions({ page: currentPage });
  }, [currentPage, fetchPrescriptions]);

  const handleSubmit = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      const status = (document.getElementById('status') as HTMLInputElement)
        .value;
      const query = (document.getElementById('search') as HTMLInputElement)
        .value;
      const afterDate = (document.getElementById(
        'afterDate'
      ) as HTMLInputElement).value;
      const beforeDate = (document.getElementById(
        'beforeDate'
      ) as HTMLInputElement).value;
      fetchPrescriptions({
        query,
        afterDate,
        beforeDate,
        status: status === 'All' ? undefined : status,
      });
    },
    [fetchPrescriptions]
  );

  const clearInput = () => {
    (document.getElementById('search') as HTMLInputElement).value = '';
  };

  return (
    <div className={styles.wrapper}>
      <Typography variant="h4">Track</Typography>
      <Typography className={styles.subtitle} variant="subtitle1">
        See the status of posted prescriptions
      </Typography>
      <div className={styles.filterContainer}>
        <Typography className={styles.filterText} variant="subtitle1">
          Filters
        </Typography>
        <form id="filtersForm" onSubmit={handleSubmit}>
          <div className={styles.filterSetting}>
            <label className={styles.label}>Status:</label>
            <select name="status" id="status">
              <option value={undefined}>All</option>
              {Object.values(EpostStatus).map((status, index) => (
                <option key={`${index}${status}`} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterSetting}>
            <label className={styles.label}>Search:</label>
            <input
              onClick={clearInput}
              type="text"
              id="search"
              name="search"
            ></input>
          </div>
          <div className={styles.filterSetting}>
            <Typography variant="body1">Letters posted between:</Typography>
            <label className={styles.label}>Start date:</label>
            <input
              className={styles.input}
              type="date"
              id="afterDate"
              name="afterDate"
            ></input>
            <label className={styles.label}>End date:</label>
            <input type="date" id="beforeDate" name="beforeDate"></input>
          </div>
          <div className={styles.filterSetting}>
            <input type="submit" value="Submit"></input>
          </div>
        </form>
      </div>
      <div className={styles.results}>
        <div className={styles.headerRow}>
          <div className={styles.smallColumn}>
            <div className={styles.detailsContainer}>
              <Typography className={styles.header} variant="body1">
                Id
              </Typography>
            </div>
          </div>
          <div className={styles.column}>
            <Typography className={styles.header} variant="body1">
              Postal address
            </Typography>
          </div>
          <div className={styles.column}>
            <Typography className={styles.header} variant="body1">
              Status
            </Typography>
          </div>
          <div className={styles.column}>
            <Typography className={styles.header} variant="body1">
              Date uploaded
            </Typography>
          </div>
        </div>
        {loadingDrafts && <Typography>Loading...</Typography>}
        {noDrafts && <Typography>No results</Typography>}
        {!!prescriptions &&
          prescriptions.results.map((item, index) => (
            <div
              key={index}
              onClick={() => setReviewItem(item)}
              className={styles.row}
            >
              <div className={styles.smallColumn}>
                <div className={styles.detailsContainer}>
                  <Typography variant="body1">{item.id}</Typography>
                </div>
              </div>
              <div className={styles.column}>
                <Typography variant="body1">{item.letterReceiver}</Typography>
              </div>
              <div className={styles.column}>
                <Typography variant="body1">{item.status}</Typography>
              </div>
              <div className={styles.column}>
                <Typography variant="body1">
                  {new Date(item.uploaded).toLocaleDateString('en-GB')}
                </Typography>
                <Typography variant="body1">
                  Uploaded by: {item.uploader.name}
                </Typography>
              </div>
            </div>
          ))}
      </div>
      <div className={styles.pageButtonContainer}>
        <Typography variant="body1">
          Pages:{' '}
          {Array.from({ length: pageTotal }, (_, index) => {
            const isDisabled = index === currentPage;
            return (
              <button
                className={
                  isDisabled ? styles.pageButtonDisabled : styles.pageButton
                }
                disabled={isDisabled}
                key={index}
                onClick={() => setCurrentPage(index)}
              >
                {index + 1}
              </button>
            );
          })}
        </Typography>
      </div>
      <Modal
        open={reviewItem !== undefined}
        onClose={() => setReviewItem(undefined)}
        actions={
          <div className={styles.modal}>
            {reviewItem && (
              <div>
                <Typography variant="h4" color="primary">
                  ID {reviewItem?.id}
                </Typography>
                <Typography className={styles.subtitle} variant="body1">
                  <b>Status: </b>
                  {reviewItem.status}
                  <br />
                  <b>Recipient Address: </b>
                  {reviewItem.letterReceiver}
                  <br />
                  <b>Sender Address: </b>
                  {reviewItem.letterSender}
                  <br />
                  <b>Uploaded by: </b>
                  {reviewItem.uploader.name}
                  <br />
                  <b>Uploaded on: </b>
                  {new Date(reviewItem.uploaded).toUTCString()}
                  <br />
                  <b>Approved by: </b>
                  {reviewItem.approver
                    ? reviewItem.approver.name
                    : 'Pending approval'}
                  <br />
                  <b>Approved on: </b>
                  {reviewItem.approved
                    ? new Date(reviewItem.uploaded).toUTCString()
                    : 'Pending approval'}
                  <div className={styles.pdfContainer}>
                    <a href={`/api/${reviewItem?.pdfFile}`} download>
                      <p>View PDF</p>
                    </a>
                  </div>
                </Typography>
              </div>
            )}
            <Button
              className={styles.modalButton}
              onClick={() => setReviewItem(undefined)}
            >
              <Typography variant="subtitle2">Close</Typography>
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default Track;
