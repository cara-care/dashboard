import { Reducer } from 'redux';
import {
  TrackingOverviewActionTypes,
  TrackingOverviewActions,
} from './trackingOverviewActions';
import { TrackingDataPoint } from '../../types';
import { newDate } from '../../../utils/dateUtils';

export interface TrackingOverviewState {
  date: Date;
  isFetching: boolean;
  invalidToken: boolean;
  page: number | null;
  error?: Error | null;
  data: TrackingDataPoint[];
}

export const trackingOverviewInitalState = {
  date: newDate(0),
  isFetching: false,
  invalidToken: false,
  page: 0,
  data: [],
  error: null,
};

export const trackingOverviewReducer: Reducer<
  TrackingOverviewState,
  TrackingOverviewActions
> = (state = trackingOverviewInitalState, action) => {
  switch (action.type) {
    case TrackingOverviewActionTypes.FETCH_TRACKING_DATA_INIT:
      return {
        ...state,
        isFetching: true,
        data: [],
        error: null,
      };
    case TrackingOverviewActionTypes.FETCH_TRACKING_INVALID_TOKEN:
      return {
        ...state,
        isFetching: false,
        invalidToken: true,
        error: action.error,
      };
    case TrackingOverviewActionTypes.FETCH_TRACKING_DATA_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case TrackingOverviewActionTypes.FETCH_TRACKING_DATA_PAGE_SUCCESS:
      return {
        ...state,
        page: action.next,
        data: state.data.concat(action.data),
      };
    case TrackingOverviewActionTypes.FETCH_TRACKING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        page: 0,
      };
    case TrackingOverviewActionTypes.SET_DATE:
      return {
        ...state,
        date: action.date,
      };
    default:
      return state;
  }
};
