import { QuestionnairesActionTypes, Submission } from './questionnairesReducer';

export interface FetchSubmissionsPageInitAction {
  type: QuestionnairesActionTypes.FETCH_SUBMISSIONS_PAGE_INIT;
  page: number;
}

export interface FetchSumbissionsPageSuccessAction {
  type: QuestionnairesActionTypes.FETCH_SUBMISSIONS_PAGE_SUCCESS;
  submissions: Submission[];
  count: number;
  previous: string | null;
  next: string | null;
}

export interface FetchSubmissionsPageFailedAction {
  type: QuestionnairesActionTypes.FETCH_SUBMISSIONS_PAGE_FAILED;
  error: Error;
}

export type QuestionnairesActions =
  | FetchSubmissionsPageInitAction
  | FetchSumbissionsPageSuccessAction
  | FetchSubmissionsPageFailedAction;

export const fetchSubmissionsPageInit = (
  page: number
): FetchSubmissionsPageInitAction => ({
  type: QuestionnairesActionTypes.FETCH_SUBMISSIONS_PAGE_INIT,
  page,
});

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

export const fetchSubmissionsPageFailed = (
  error: Error
): FetchSubmissionsPageFailedAction => ({
  type: QuestionnairesActionTypes.FETCH_SUBMISSIONS_PAGE_FAILED,
  error,
});
