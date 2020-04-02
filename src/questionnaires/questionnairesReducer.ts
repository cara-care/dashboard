import { Reducer } from 'redux';
import { QuestionnairesActions } from './questionnairesActions';
import { RootState } from '../utils/store';

export interface Submission {
  id: number;
  name: string;
  started: Date;
  completed: Date;
}

export interface QuestionnairesState {
  isFetching: boolean;
  error: Error | null;
  submissions: Submission[];
  nextPage: string | null;
  previousPage: string | null;
  count: number;
  limit: number;
}

export const questionnairesInitialState = {
  isFetching: false,
  error: null,
  submissions: [],
  count: 0,
  limit: 100,
  nextPage: null,
  previousPage: null,
};

export enum QuestionnairesActionTypes {
  FETCH_SUBMISSIONS_PAGE_INIT = '[questionnaires] FETCH_SUBMISSIONS_PAGE_INIT',
  FETCH_SUBMISSIONS_PAGE_SUCCESS = '[questionnaires] FETCH_SUBMISSIONS_PAGE_SUCCESS',
  FETCH_SUBMISSIONS_PAGE_FAILED = '[questionnaires] FETCH_SUBMISSIONS_PAGE_FAILED',
}

export const questionnairesReducer: Reducer<
  QuestionnairesState,
  QuestionnairesActions
> = (state = questionnairesInitialState, action) => {
  switch (action.type) {
    case QuestionnairesActionTypes.FETCH_SUBMISSIONS_PAGE_INIT:
      return {
        ...state,
        isFetching: true,
      };
    case QuestionnairesActionTypes.FETCH_SUBMISSIONS_PAGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        submissions: action.submissions,
        count: action.count,
        previous: action.previous,
        next: action.next,
      };
    case QuestionnairesActionTypes.FETCH_SUBMISSIONS_PAGE_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getSubmissions = (state: RootState) =>
  state.questionnaires.submissions;

export const getSumbissionsLimit = (state: RootState) =>
  state.questionnaires.limit;
