import { Submission } from './questionnairesReducer';

export enum QuestionnairesActionTypes {
  FETCH_SUBMISSIONS_PAGE_INIT = '[questionnaires] FETCH_SUBMISSIONS_PAGE_INIT',
  FETCH_SUBMISSIONS_PAGE_SUCCESS = '[questionnaires] FETCH_SUBMISSIONS_PAGE_SUCCESS',
  FETCH_SUBMISSIONS_PAGE_FAILED = '[questionnaires] FETCH_SUBMISSIONS_PAGE_FAILED',
}

export interface FetchSubmissionsPageInitAction {
  type: QuestionnairesActionTypes.FETCH_SUBMISSIONS_PAGE_INIT;
  page: number;
}

export const fetchSubmissionsPageInit = (
  page: number
): FetchSubmissionsPageInitAction => ({
  type: QuestionnairesActionTypes.FETCH_SUBMISSIONS_PAGE_INIT,
  page,
});

export interface FetchSumbissionsPageSuccessAction {
  type: QuestionnairesActionTypes.FETCH_SUBMISSIONS_PAGE_SUCCESS;
  submissions: Submission[];
  count: number;
  previous: string | null;
  next: string | null;
}

export const fetchSubmissionsPageSuccess = ({
  submissions,
  count,
  previous,
  next,
}: {
  submissions: Submission[];
  count: number;
  previous: string | null;
  next: string | null;
}): FetchSumbissionsPageSuccessAction => ({
  type: QuestionnairesActionTypes.FETCH_SUBMISSIONS_PAGE_SUCCESS,
  submissions,
  count,
  previous,
  next,
});

export interface FetchSubmissionsPageFailedAction {
  type: QuestionnairesActionTypes.FETCH_SUBMISSIONS_PAGE_FAILED;
  error: Error;
}

export const fetchSubmissionsPageFailed = (
  error: Error
): FetchSubmissionsPageFailedAction => ({
  type: QuestionnairesActionTypes.FETCH_SUBMISSIONS_PAGE_FAILED,
  error,
});

export type QuestionnairesActions =
  | FetchSubmissionsPageInitAction
  | FetchSumbissionsPageSuccessAction
  | FetchSubmissionsPageFailedAction;
