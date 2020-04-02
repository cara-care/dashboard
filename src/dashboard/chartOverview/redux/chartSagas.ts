import { takeLatest, select, put, call } from 'redux-saga/effects';
import moment from 'moment';
import { getTimeFrame, getChartDataPage } from './chartOverview';
import {
  ChartOverviewActionTypes,
  fetchChartDataInit,
  fetchChartDataPageSuccess,
  fetchChartDataFailed,
  fetchChartDataInvalidTokenAction,
  fetchChartDataSuccess,
  FetchChartDataPageSuccessAction,
} from './chartOverviewActions';
import { getPatientId } from '../../../auth';
import { getTrackingDataPoints } from '../../../utils/api';
import { RootActions } from '../../../utils/store';

const shouldFetchTrackingDataPage = (action: RootActions) =>
  action.type === ChartOverviewActionTypes.FETCH_CHART_DATA_INIT ||
  (action.type === ChartOverviewActionTypes.FETCH_CHART_DATA_PAGE_SUCCESS &&
    !!action.next);

const didFetchAllPages = (action: FetchChartDataPageSuccessAction) =>
  action.type === ChartOverviewActionTypes.FETCH_CHART_DATA_PAGE_SUCCESS &&
  action.next === null;

export function* chartOverviewRootSaga() {
  yield takeLatest(
    [
      ChartOverviewActionTypes.UPDATE_START_DATE,
      ChartOverviewActionTypes.UPDATE_END_DATE,
    ],
    fetchChartDataInitSaga
  );
  yield takeLatest(shouldFetchTrackingDataPage, fetchChartDataPageSaga);
  yield takeLatest(didFetchAllPages, fetchChartDataSuccessSaga);
}

export function* fetchChartDataInitSaga() {
  yield put(fetchChartDataInit());
}

export function* fetchChartDataPageSaga() {
  const userId = yield select(getPatientId);
  const { startDate, endDate } = yield select(getTimeFrame);
  const currentPage = yield select(getChartDataPage);
  const start = moment(startDate).format().substring(0, 10);
  const end = moment(endDate).format().substring(0, 10);
  const limit = 100;
  const offset = currentPage * limit;

  if (currentPage !== null) {
    try {
      const res = yield call(() =>
        getTrackingDataPoints({
          userId,
          start,
          end,
          limit,
          offset,
        })
      );

      yield put(
        fetchChartDataPageSuccess({
          next: res.data.next ? currentPage + 1 : null,
          data: res.data.results,
        })
      );
    } catch (err) {
      if (err.response.status === 401) {
        yield put(fetchChartDataInvalidTokenAction(err));
      } else {
        yield put(fetchChartDataFailed(err));
      }
    }
  } else {
    yield put(fetchChartDataFailed());
  }
}

export function* fetchChartDataSuccessSaga() {
  yield put(fetchChartDataSuccess());
}
