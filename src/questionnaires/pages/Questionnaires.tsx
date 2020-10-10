import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import NoResults from '../../components/NoResults';
import NutriNavigation from '../../components/NutriNavigation';
import Pagination from '../../components/Pagination';
import Placeholder from '../../components/Placeholder';
import { formatDate } from '../../utils/dateUtils';
import { RootState } from '../../utils/store';
import ErrorMessage from '../components/ErrorMessage';
import { fetchSubmissionsPageInit } from '../questionnairesActions';
import { getSubmissions, Submission } from '../questionnairesReducer';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // 100vh - (header height + container padding + nuriNavigation Height)px
    height: `calc(100vh - ${theme.spacing(8) + theme.spacing(3) + 67}px)`,
  },
  card: {
    padding: theme.spacing(2),
    height: '100%',
    boxShadow: '0 2px 13px 0 rgba(0,0,0,0.10)',
  },
  link: {
    textDecoration: 'none',
  },
}));

const Questionnaires = () => {
  const { locale } = useIntl();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const match = useRouteMatch();
  const isFetching = useSelector<RootState, boolean>(
    (state) => state.questionnaires.isFetching
  );
  const submissions = useSelector<RootState, Submission[]>(getSubmissions);
  const count = useSelector<RootState, number>(
    (state) => state.questionnaires.count
  );
  const limit = useSelector<RootState, number>(
    (state) => state.questionnaires.limit
  );
  const error = useSelector<RootState, Error | null>(
    (state) => state.questionnaires.error
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubmissionsPageInit(page));
  }, [dispatch, page]);

  const handleOnClickPrev = () => {
    setPage(page - 1);
  };

  const handleOnClickNext = () => {
    setPage(page + 1);
  };

  return (
    <>
      <NutriNavigation />
      <Container className={classes.container}>
        {isFetching ? (
          <div className={classes.content}>
            <Placeholder />
          </div>
        ) : error ? (
          <ErrorMessage message={error.message} />
        ) : (
          <Grid container spacing={2}>
            {submissions.length ? (
              <>
                {submissions.map((submission) => (
                  <Grid key={submission.id} item xs={12} md={6} lg={4}>
                    <Link
                      to={`${match ? match.path : ''}/${submission.id}`}
                      className={classes.link}
                    >
                      <Paper elevation={0} className={classes.card}>
                        <Typography variant="h6">{submission.name}</Typography>
                        <Typography variant="body2">
                          <FormattedMessage
                            id="questionnaires.started"
                            defaultMessage="Started: {date}"
                            values={{
                              date: formatDate(
                                submission.started,
                                'LLL',
                                locale
                              ),
                            }}
                          />
                        </Typography>
                        <Typography variant="body2">
                          <FormattedMessage
                            id="questionnaires.completed"
                            defaultMessage="Completed: {date}"
                            values={{
                              date: formatDate(
                                submission.completed,
                                'LLL',
                                locale
                              ),
                            }}
                          />
                        </Typography>
                      </Paper>
                    </Link>
                  </Grid>
                ))}
                {count > submissions.length && (
                  <Grid item xs={12}>
                    <Pagination
                      count={count}
                      page={page}
                      limit={limit}
                      onClickPrev={handleOnClickPrev}
                      onClickNext={handleOnClickNext}
                    />
                  </Grid>
                )}
              </>
            ) : (
              <NoResults />
            )}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Questionnaires;
