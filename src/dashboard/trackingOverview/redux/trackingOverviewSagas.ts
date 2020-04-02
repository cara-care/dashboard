import { takeLatest, select, put, call } from 'redux-saga/effects';
import moment from 'moment';
import {
  fetchTrackingDataInit,
  fetchTrackingDataFailed,
  fetchTrackingDataInvalidToken,
  fetchTrackingDataPageSuccess,
  fetchTrackingDataSuccess,
  FetchTrackingDataPageSuccessAction,
  TrackingOverviewActionTypes,
} from './trackingOverviewActions';
import {
  getTrackingOverviewPage,
  getTrackingOverviewDate,
} from './trackingOverviewSelectors';
import { getPatientId } from '../../../auth';
import { getTrackingDataPoints } from '../../../utils/api';
import { RootActions } from '../../../utils/store';

const shouldFetchTrackingDataPage = (action: RootActions) =>
  action.type === TrackingOverviewActionTypes.FETCH_TRACKING_DATA_INIT ||
  (action.type ===
    TrackingOverviewActionTypes.FETCH_TRACKING_DATA_PAGE_SUCCESS &&
    !!action.next);

const didFetchAllPages = (action: FetchTrackingDataPageSuccessAction) =>
  action.type ===
    TrackingOverviewActionTypes.FETCH_TRACKING_DATA_PAGE_SUCCESS &&
  action.next === null;

export function* trackingOverviewRootSaga() {
  yield takeLatest(
    [TrackingOverviewActionTypes.SET_DATE],
    fetchTrackingDataInitSaga
  );
  yield takeLatest(shouldFetchTrackingDataPage, fetchTrackingDataPageSaga);
  yield takeLatest(didFetchAllPages, fetchTrackingDataSuccessSaga);
}

export function* fetchTrackingDataInitSaga() {
  yield put(fetchTrackingDataInit());
}

export function* fetchTrackingDataPageSaga() {
  const userId = yield select(getPatientId);
  const date = yield select(getTrackingOverviewDate);
  const currentPage = yield select(getTrackingOverviewPage);
  const start = moment(date).format().substr(0, 10);
  const limit = 100;
  const offset = currentPage * limit;

  if (currentPage !== null) {
    try {
      const res = yield call(() =>
        getTrackingDataPoints({ userId, start, end: start, limit, offset })
      );

      yield put(
        fetchTrackingDataPageSuccess({
          next: res.data.next ? currentPage + 1 : null,
          data: res.data.results,
        })
      );
    } catch (err) {
      if (err.response.status === 401) {
        yield put(fetchTrackingDataInvalidToken(err));
      } else {
        yield put(fetchTrackingDataFailed(err));
      }
    }
  } else {
    yield put(fetchTrackingDataFailed());
  }
}

export function* fetchTrackingDataSuccessSaga() {
  yield put(fetchTrackingDataSuccess());
}
