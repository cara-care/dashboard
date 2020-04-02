import { TrackingDataPoint } from '../../types';

export enum TrackingOverviewActionTypes {
  SET_DATE = '[trackingOverview] SET_DATE',
  FETCH_TRACKING_DATA_INIT = '[trackingOverview] FETCH_TRACKING_DATA_INIT',
  FETCH_TRACKING_DATA_PAGE_SUCCESS = '[trackingOverview] FETCH_TRACKING_DATA_PAGE_SUCCESS',
  FETCH_TRACKING_DATA_FAILED = '[trackingOverview] FETCH_TRACKING_DATA_FAILED',
  FETCH_TRACKING_INVALID_TOKEN = '[trackingOverview] FETCH_TRACKING_INVALID_TOKEN',
  FETCH_TRACKING_DATA_SUCCESS = '[trackingOverview] FETCH_TRACKING_DATA_SUCCESS',
}

export interface FetchTrackingDataInitAction {
  type: TrackingOverviewActionTypes.FETCH_TRACKING_DATA_INIT;
}

export interface FetchTrackingDataPageSuccessAction {
  type: TrackingOverviewActionTypes.FETCH_TRACKING_DATA_PAGE_SUCCESS;
  next: number | null;
  data: TrackingDataPoint[];
}

export interface FetchTrackingDataFailedAction {
  type: TrackingOverviewActionTypes.FETCH_TRACKING_DATA_FAILED;
  error?: Error;
}

export interface FetchTrackingDataSuccessAction {
  type: TrackingOverviewActionTypes.FETCH_TRACKING_DATA_SUCCESS;
}

export interface SetDateAction {
  type: TrackingOverviewActionTypes.SET_DATE;
  date: Date;
}

export interface FetchTrackingInvalidTokenAction {
  type: TrackingOverviewActionTypes.FETCH_TRACKING_INVALID_TOKEN;
  error?: Error;
}

export type TrackingOverviewActions =
  | SetDateAction
  | FetchTrackingDataInitAction
  | FetchTrackingDataPageSuccessAction
  | FetchTrackingDataFailedAction
  | FetchTrackingDataSuccessAction
  | FetchTrackingInvalidTokenAction;

export const setDate = (date: Date): SetDateAction => ({
  type: TrackingOverviewActionTypes.SET_DATE,
  date: date,
});

export const fetchTrackingDataInit = (): FetchTrackingDataInitAction => ({
  type: TrackingOverviewActionTypes.FETCH_TRACKING_DATA_INIT,
});

export const fetchTrackingDataPageSuccess = ({
  next,
  data,
}: {
  next: number | null;
  data: TrackingDataPoint[];
}): FetchTrackingDataPageSuccessAction => ({
  type: TrackingOverviewActionTypes.FETCH_TRACKING_DATA_PAGE_SUCCESS,
  next,
  data,
});

export const fetchTrackingDataFailed = (
  error?: Error
): FetchTrackingDataFailedAction => ({
  type: TrackingOverviewActionTypes.FETCH_TRACKING_DATA_FAILED,
  error,
});

export const fetchTrackingDataSuccess = (): FetchTrackingDataSuccessAction => ({
  type: TrackingOverviewActionTypes.FETCH_TRACKING_DATA_SUCCESS,
});

export const fetchTrackingDataInvalidToken = (
  error?: Error
): FetchTrackingInvalidTokenAction => ({
  type: TrackingOverviewActionTypes.FETCH_TRACKING_INVALID_TOKEN,
  error,
});
