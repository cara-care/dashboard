import { takeLatest, put, select, call } from 'redux-saga/effects';
import {
  QuestionnairesActionTypes,
  getSumbissionsLimit,
} from './questionnairesReducer';
import {
  FetchSubmissionsPageInitAction,
  fetchSubmissionsPageSuccess,
  fetchSubmissionsPageFailed,
} from './questionnairesActions';
import { getPatientId } from '../auth';
import { getQuestionnaires } from '../utils/api';

export function* watchSubmissionInitSaga() {
  yield takeLatest(
    QuestionnairesActionTypes.FETCH_SUBMISSIONS_PAGE_INIT,
    fetchSumbissionsSaga
  );
}

export function* fetchSumbissionsSaga(action: FetchSubmissionsPageInitAction) {
  try {
    const userId = yield select(getPatientId);
    const limit = yield select(getSumbissionsLimit);
    const currentPage = action.page;
    const offset = currentPage! * limit;
    if (userId) {
      const res = yield call(() =>
        getQuestionnaires({ userId, limit, offset })
      );
      yield put(
        fetchSubmissionsPageSuccess({
          submissions: res.data.results,
          count: res.data.count,
          previous: res.data.previous,
          next: res.data.next,
        })
      );
    } else {
      yield put(fetchSubmissionsPageFailed(Error('No patient selected')));
    }
  } catch (error) {
    yield put(fetchSubmissionsPageFailed(error));
  }
}
