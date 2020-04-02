import { ChartTrackingType } from '../chartOverviewUtils';
import { TrackingDataPoint } from '../../types';

export enum ChartOverviewActionTypes {
  TOGGLE_CHART = '[chartOverview] TOGGLE_CHART',
  UPDATE_START_DATE = '[chartOverview] UPDATE_START_DATE',
  UPDATE_END_DATE = '[chartOverview] UPDATE_END_DATE',
  FETCH_CHART_DATA_INIT = '[chartOverview] FETCH_CHART_DATA_INIT',
  FETCH_CHART_DATA_PAGE_SUCCESS = '[chartOverview] FETCH_CHART_DATA_PAGE_SUCCESS',
  FETCH_CHART_DATA_FAILED = '[chartOverview] FETCH_CHART_DATA_FAILED',
  FETCH_CHART_DATA_SUCCESS = '[chartOverview] FETCH_CHART_DATA_SUCCESS',
  FETCH_CHART_DATA_INVALID_TOKEN = '[chartOverview] FETCH_CHART_DATA_INVALID_TOKEN',
}

interface UpdateStartDateAction {
  type: ChartOverviewActionTypes.UPDATE_START_DATE;
  startDate: Date;
}

interface UpdateEndDateAction {
  type: ChartOverviewActionTypes.UPDATE_END_DATE;
  endDate: Date;
}

interface ToggleChartAction {
  type: ChartOverviewActionTypes.TOGGLE_CHART;
  chartTrackingType: ChartTrackingType;
}

export interface FetchChartDataInitAction {
  type: ChartOverviewActionTypes.FETCH_CHART_DATA_INIT;
}

export interface FetchChartDataPageSuccessAction {
  type: ChartOverviewActionTypes.FETCH_CHART_DATA_PAGE_SUCCESS;
  next: number | null;
  data: TrackingDataPoint[];
}

export interface FetchChartDataFailedAction {
  type: ChartOverviewActionTypes.FETCH_CHART_DATA_FAILED;
  error?: Error;
}

export interface FetchChartDataSuccessAction {
  type: ChartOverviewActionTypes.FETCH_CHART_DATA_SUCCESS;
}

export type ChartOverviewActions =
  | UpdateStartDateAction
  | UpdateEndDateAction
  | ToggleChartAction
  | FetchChartDataInitAction
  | FetchChartDataPageSuccessAction
  | FetchChartDataFailedAction
  | FetchChartDataSuccessAction
  | FetchChartDataInvalidTokenAction;

export const updateStartDateActionCreator = (
  startDate: Date
): UpdateStartDateAction => ({
  type: ChartOverviewActionTypes.UPDATE_START_DATE,
  startDate: startDate,
});

export const updateEndDateActionCreator = (
  endDate: Date
): UpdateEndDateAction => ({
  type: ChartOverviewActionTypes.UPDATE_END_DATE,
  endDate: endDate,
});

export const toggleChartActionCreator = (
  chartTrackingType: ChartTrackingType
): ToggleChartAction => ({
  type: ChartOverviewActionTypes.TOGGLE_CHART,
  chartTrackingType,
});

export const fetchChartDataInit = (): FetchChartDataInitAction => ({
  type: ChartOverviewActionTypes.FETCH_CHART_DATA_INIT,
});

export const fetchChartDataPageSuccess = ({
  next,
  data,
}: {
  next: number | null;
  data: TrackingDataPoint[];
}): FetchChartDataPageSuccessAction => ({
  type: ChartOverviewActionTypes.FETCH_CHART_DATA_PAGE_SUCCESS,
  next,
  data,
});

export const fetchChartDataFailed = (
  error?: Error
): FetchChartDataFailedAction => ({
  type: ChartOverviewActionTypes.FETCH_CHART_DATA_FAILED,
  error,
});

export const fetchChartDataSuccess = (): FetchChartDataSuccessAction => ({
  type: ChartOverviewActionTypes.FETCH_CHART_DATA_SUCCESS,
});

export interface FetchChartDataInvalidTokenAction {
  type: ChartOverviewActionTypes.FETCH_CHART_DATA_INVALID_TOKEN;
  error?: Error;
}

export const fetchChartDataInvalidTokenAction = (
  error?: Error
): FetchChartDataInvalidTokenAction => ({
  type: ChartOverviewActionTypes.FETCH_CHART_DATA_INVALID_TOKEN,
  error,
});
