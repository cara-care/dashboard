import React, { useCallback, useEffect, useState } from 'react';

import { Button, makeStyles, Typography } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import { EpostStatus, Prescription, ReviewType } from './types';
import {
  deleteDraftPrescription,
  postFinalPrescription,
  RESULTS_PER_PAGE,
} from '../utils/api';
import { RouterLinkWithPropForwarding as Link } from '../components/Link';
import useSearchPrescriptions from './useSearchPrescriptions';
import { PRIMARY_COLOR } from '../theme';
import ReviewModal from './ReviewModal';

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
  row: {
    marginBottom: '20px',
    backgroundColor: '#f1f1f1',
    display: 'flex',
    flexDirection: 'row',
  },
  results: {
    marginTop: '20px',
    border: '1px solid black',
    padding: '20px 20px 0 20px',
  },
  detailsContainer: {
    flex: 1,
  },
  textContainer: {
    marginBottom: '30px',
  },
  redText: {
    color: '#FA5544',
  },
  placeholder: {
    marginBottom: '20px',
  },
  subtitle: {
    paddingTop: '20px',
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    margin: '10px',
  },
  warningButton: {
    margin: '10px',
    backgroundColor: '#FA5544',
    color: 'white',
  },
  pageButtonContainer: {
    marginBottom: '40px',
    marginTop: '20px',
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
}));

interface ReviewItem {
  item: Prescription;
  action: ReviewType;
}

const Review: React.FC<RouteComponentProps<{}>> = () => {
  const styles = useStyles();
  const { prescriptions, fetchPrescriptions } = useSearchPrescriptions({
    initialStatus: EpostStatus.PENDING_APPROVAL,
  });
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageTotal, setPageTotal] = useState<number>(1);
  const [error, setError] = useState('');
  const [actionConfirmed, setActionConfirmed] = React.useState<boolean>(false);
  const [itemInReview, setItemInReview] = React.useState<
    ReviewItem | undefined
  >(undefined);

  const loadingDrafts = prescriptions === undefined;
  const noDrafts = prescriptions && prescriptions.results.length === 0;
  const showDeleteModal =
    itemInReview && itemInReview.action === ReviewType.DELETE ? true : false;
  const showPostModal =
    itemInReview && itemInReview.action === ReviewType.POST ? true : false;
  const content = itemInReview?.item;

  const trimText = (text: string) => {
    if (text.length <= 30) {
      return text;
    } else {
      return `${text.substring(0, 30)}...`;
    }
  };

  useEffect(() => {
    if (prescriptions) {
      setPageTotal(Math.ceil(prescriptions.count / RESULTS_PER_PAGE));
    }
  }, [prescriptions]);

  useEffect(() => {
    fetchPrescriptions({
      page: currentPage,
      status: EpostStatus.PENDING_APPROVAL,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleReviewItem = (id: number, action: ReviewType) => {
    const item = prescriptions?.results.find((item) => item.id === id);
    if (!item) {
      return;
    }
    setItemInReview({ item, action });
  };

  const closeReviewModal = () => {
    setActionConfirmed(false);
    setItemInReview(undefined);
  };

  const handleReview = useCallback(
    (action: ReviewType) => {
      if (!itemInReview) {
        return;
      }
      setActionConfirmed(false);
      const updateBackend =
        action === ReviewType.DELETE
          ? deleteDraftPrescription
          : postFinalPrescription;
      updateBackend(itemInReview?.item.id)
        .then((res: any) => {
          setItemInReview(undefined);
          fetchPrescriptions({ status: EpostStatus.PENDING_APPROVAL });
          setError('');
        })
        .catch((error: any) => {
          const errorMessage = JSON.stringify(error.response.data);
          setError(`An error occurred: ${errorMessage}. Please try again.`);
        });
    },
    [fetchPrescriptions, itemInReview]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.textContainer}>
        <Typography variant="h4">Review</Typography>
        <Typography className={styles.subtitle} variant="subtitle1">
          Below is a list of draft letters that were uploaded using{' '}
          <Link to="/nutri/epost-prescription/upload">this form</Link>. <br />
          You can approve or delete pending drafts. <br />
          Once approved, the letter will be sent to the specified address via
          the ePost service. <br />
          Track the status of posted letters{' '}
          <Link to="/nutri/epost-prescription/track">here</Link>.
        </Typography>
        <Typography
          className={styles.subtitle}
          variant="subtitle1"
          color="error"
        >
          {error}
        </Typography>
      </div>
      <div className={styles.results}>
        {loadingDrafts && (
          <Typography className={styles.placeholder}>Loading...</Typography>
        )}
        {noDrafts && (
          <Typography className={styles.placeholder}>
            No drafts to review
          </Typography>
        )}
        {!!prescriptions &&
          prescriptions.results.map((draft) => (
            <div className={styles.row} key={draft.id}>
              <div className={styles.detailsContainer}>
                <Typography variant="body1">Id: {draft.id}</Typography>
                <Typography variant="body1">
                  To: {trimText(draft.letterReceiver)}
                </Typography>
                <Typography variant="body1">
                  Date uploaded: {new Date(draft.uploaded).toUTCString()}
                </Typography>
                <Typography variant="body1">
                  Uploaded by: {draft.uploader.name}
                </Typography>
              </div>
              <div className={styles.buttonContainer}>
                <div className={styles.buttonRow}>
                  <Button
                    className={styles.button}
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => handleReviewItem(draft.id, ReviewType.POST)}
                  >
                    Review
                  </Button>
                  <Button
                    className={styles.warningButton}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      handleReviewItem(draft.id, ReviewType.DELETE)
                    }
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className={styles.pageButtonContainer}>
        <Typography variant="body1">
          Pages:{' '}
          {pageTotal > 0
            ? Array.from({ length: pageTotal }, (_, index) => {
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
              })
            : 'No results'}
        </Typography>
      </div>
      <ReviewModal
        isOpen={showPostModal}
        title={'Review letter'}
        subtitle={'Please review the details below before posting.'}
        confirmText={'I approve this letter to be posted via the ePost service'}
        content={content}
        reviewConfirmed={actionConfirmed}
        theme={'primary'}
        onClose={closeReviewModal}
        onConfirm={setActionConfirmed}
        onSubmit={() => handleReview(ReviewType.POST)}
      />
      <ReviewModal
        isOpen={showDeleteModal}
        title={'Delete draft'}
        subtitle={
          'Please confirm that you want to permanently delete this draft.'
        }
        confirmText={'I confirm that I want to delete this draft'}
        content={content}
        reviewConfirmed={actionConfirmed}
        theme={'warning'}
        onClose={closeReviewModal}
        onConfirm={setActionConfirmed}
        onSubmit={() => handleReview(ReviewType.DELETE)}
      />
    </div>
  );
};

export default Review;
