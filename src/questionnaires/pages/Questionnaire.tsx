import React, { useReducer, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { useParams } from 'react-router-dom';
import { v1 } from 'uuid';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import NutriNavigation from '../../components/NutriNavigation';
import ErrorMessage from '../components/ErrorMessage';
import Placeholder from '../../components/Placeholder';
import GroupCard from '../components/GroupCard';
import Score from '../components/Score';
import Link from '../../components/Link';
import { getPatientId } from '../../auth';
import { getQuestionnaire } from '../../utils/api';
import { QUESTIONNAIRE_NAME } from '../../utils/test-helpers';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3),
  },
  backLinkInner: {
    display: 'flex',
    alignItems: 'center',
  },
}));

interface QuestionnaireState {
  isFetching: boolean;
  name: string;
  groups: any[];
  scoreQOL: number | null;
  scoreSSS: number | null;
  started: Date | null;
  completed: Date | null;
  error: Error | null;
}

const initialState = {
  isFetching: false,
  name: '',
  scoreQOL: null,
  scoreSSS: null,
  groups: [],
  started: null,
  completed: null,
  error: null,
};

enum QuestionnaireActionType {
  INIT_FETCH = 'INIT_FETCH',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_FAILED = 'FETCH_FAILED',
}

type QuestionnaireActionTypes =
  | QuestionnaireActionType.INIT_FETCH
  | QuestionnaireActionType.FETCH_SUCCESS
  | QuestionnaireActionType.FETCH_FAILED;

interface SumbissionAction {
  type: QuestionnaireActionTypes;
  payload?: any;
}

function reducer(state: QuestionnaireState, action: SumbissionAction) {
  switch (action.type) {
    case QuestionnaireActionType.INIT_FETCH:
      return {
        ...state,
        isFetching: true,
      };
    case QuestionnaireActionType.FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        name: action.payload.name,
        scoreQOL: action.payload.scoreQOL,
        scoreSSS: action.payload.scoreSSS,
        groups: action.payload.groups,
        started: action.payload.started,
        completed: action.payload.completed,
      };
    case QuestionnaireActionType.FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

const Questionnaire = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const patientId = useSelector(getPatientId);
  const { id } = useParams();
  const classes = useStyles();
  const fetchQuestionnaire = useCallback(
    async ({
      submissionId,
      userId,
    }: {
      submissionId: string;
      userId: number;
    }) => {
      dispatch({ type: QuestionnaireActionType.INIT_FETCH });
      try {
        const res = await getQuestionnaire({
          userId,
          submissionId,
        });
        dispatch({
          type: QuestionnaireActionType.FETCH_SUCCESS,
          payload: res.data,
        });
      } catch (err) {
        dispatch({
          type: QuestionnaireActionType.FETCH_FAILED,
          payload: err,
        });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (id && patientId) {
      fetchQuestionnaire({ submissionId: id, userId: patientId });
    }
  }, [id, patientId, fetchQuestionnaire]);

  return (
    <>
      <NutriNavigation />
      <Container className={classes.container}>
        {state.isFetching ? (
          <Placeholder />
        ) : state.error ? (
          <ErrorMessage message={state.error.message} />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Link to="/nutri/questionnaires">
                <span className={classes.backLinkInner}>
                  <ArrowBack />
                  <FormattedMessage id="common.back" defaultMessage="Back" />
                </span>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Typography data-testid={QUESTIONNAIRE_NAME} variant="h6">
                {state.name}
              </Typography>
              <Typography variant="body2">
                <FormattedMessage
                  id="questionnaires.started"
                  defaultMessage="Started: {date}"
                  values={{
                    date: moment(state.started).format('LLL'),
                  }}
                />
              </Typography>
              <Typography variant="body2">
                <FormattedMessage
                  id="questionnaires.completed"
                  defaultMessage="Completed: {date}"
                  values={{
                    date: moment(state.completed).format('LLL'),
                  }}
                />
              </Typography>
            </Grid>
            {(state.scoreQOL !== null || state.scoreSSS !== null) && (
              <>
                {state.scoreSSS !== null && (
                  <Grid item xs={12} md={6} lg={4}>
                    <Score
                      title={
                        <FormattedMessage
                          id="questionnaires.symptomSeverityIBS-SSS"
                          defaultMessage="Score IBS-SSS"
                        />
                      }
                      subtitle={
                        <FormattedMessage
                          id="irritableBowelSyndromeSeverityScoringSystem-SSS"
                          defaultMessage="(Irritable Bowel Syndrome Severity Scoring System)"
                        />
                      }
                      score={state.scoreSSS}
                      total={500}
                      inverted
                    />
                  </Grid>
                )}
                {state.scoreQOL !== null && (
                  <Grid item xs={12} md={6} lg={4}>
                    <Score
                      title={
                        <FormattedMessage
                          id="questionnaires.qualityOfLife-IBS-QOL"
                          defaultMessage="Score QOL (Quality of Life)"
                        />
                      }
                      subtitle={
                        <FormattedMessage
                          id="questionnaires.qualityOfLife"
                          defaultMessage="(Quality of Life)"
                        />
                      }
                      score={state.scoreQOL}
                      total={100}
                    />
                  </Grid>
                )}
              </>
            )}
            {state.groups.map((group: any) => (
              <Grid key={v1()} item xs={12} md={6} lg={4}>
                <GroupCard name={group.name} fields={group.fields} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Questionnaire;
