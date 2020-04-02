import { Reducer } from 'redux';
import moment from 'moment';
import {
  ChartOverviewActionTypes,
  ChartOverviewActions,
} from './chartOverviewActions';
import {
  getCategoryTypeForChartTrackingType,
  symptomsChartTrackingTypesOrdered,
  factorsChartTrackingTypesOrdered,
  ChartTrackingTypes,
  ChartTrackingCategory,
  ChartTypes,
  ChartFilter,
  DataSet,
} from '../chartOverviewUtils';
import { newDate, addDays } from '../../../utils/dateUtils';
import { RootState } from '../../../utils/store';
import TrackingDatasetCreator from '../ChartTrackingDatasetCreator';
import { getSymptomScoresPerDay } from '../getSymptomScore';

export interface ChartOverviewState {
  startDate: Date;
  endDate: Date;
  isFetching: boolean;
  invalidToken: boolean;
  error?: Error | null;
  page: number | null;
  data: any[];
  dataSets: DataSet[];
  filters: ChartFilter[];
}

export const getInitialDataSets = () => {
  return Object.keys(ChartTrackingTypes).map((key) => {
    return {
      chartTrackingType: ChartTrackingTypes[key] as ChartTrackingTypes,
      graphType: ChartTypes.line,
      yAxisID: '',
      fill: false,
      lineTension: 0.2,
      backgroundColor: '',
      borderColor: '',
      data: [],
    };
  });
};

export const getInitialFiltersChartsFilters = () => {
  return symptomsChartTrackingTypesOrdered
    .concat(factorsChartTrackingTypesOrdered)
    .map((chartTrackingType) => ({
      chartTrackingType: chartTrackingType,
      active: chartTrackingType === ChartTrackingTypes.symptomScore,
    }));
};

const initialState: ChartOverviewState = {
  startDate: newDate(-6, new Date()),
  endDate: newDate(0, new Date()),
  isFetching: false,
  invalidToken: false,
  error: null,
  page: 0,
  data: [],
  dataSets: getInitialDataSets(),
  filters: getInitialFiltersChartsFilters(),
};

export const chartOverview: Reducer<
  ChartOverviewState,
  ChartOverviewActions
> = (state = initialState, action) => {
  let startDate, endDate;
  switch (action.type) {
    case ChartOverviewActionTypes.FETCH_CHART_DATA_INIT:
      return {
        ...state,
        isFetching: true,
        data: [],
        error: null,
      };
    case ChartOverviewActionTypes.FETCH_CHART_DATA_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case ChartOverviewActionTypes.FETCH_CHART_DATA_INVALID_TOKEN:
      return {
        ...state,
        isFetching: false,
        invalidToken: true,
        error: action.error,
      };
    case ChartOverviewActionTypes.FETCH_CHART_DATA_PAGE_SUCCESS:
      return {
        ...state,
        page: action.next,
        data: state.data.concat(action.data),
      };
    case ChartOverviewActionTypes.FETCH_CHART_DATA_SUCCESS:
      const newDataSets = state.dataSets.map((dataSet) => {
        if (dataSet.chartTrackingType === 'symptomScore') {
          return TrackingDatasetCreator.createSymptomScoreDataset(
            getSymptomScoresPerDay(state.data)
          );
        }
        return TrackingDatasetCreator.createDataSet(
          dataSet.chartTrackingType,
          state.data
        );
      });
      return {
        ...state,
        isFetching: false,
        page: 0,
        dataSets: newDataSets as DataSet[],
      };
    case ChartOverviewActionTypes.UPDATE_START_DATE:
      startDate = action.startDate;
      endDate = state.endDate;
      if (moment(startDate).isSameOrAfter(moment(endDate))) {
        endDate = addDays(startDate, 1);
        return { ...state, startDate, endDate };
      }
      return { ...state, startDate };
    case ChartOverviewActionTypes.UPDATE_END_DATE:
      endDate = action.endDate;
      startDate = state.startDate;
      if (moment(endDate).isSameOrBefore(moment(startDate))) {
        startDate = addDays(endDate, -1);
        return { ...state, startDate, endDate };
      }
      return { ...state, endDate };
    case ChartOverviewActionTypes.TOGGLE_CHART:
      let filters = state.filters.map((filter) => {
        return filter.chartTrackingType === action.chartTrackingType
          ? { ...filter, active: !filter.active }
          : filter;
      });
      return { ...state, filters };
    default:
      return state;
  }
};

export const getActiveChartTrackingTypes = (
  charts: ChartFilter[]
): ChartTrackingTypes[] => {
  return charts
    .filter((chart) => chart.active === true)
    .map((chart) => chart.chartTrackingType);
};

export const getTimeFrame = (state: RootState) => {
  return {
    startDate: state.chartOverview.startDate,
    endDate: state.chartOverview.endDate,
  };
};

export const getSymptomsCheckboxes = (filters: ChartFilter[]) => {
  let symptomsCheckboxStatus = filters.filter(
    (filter) =>
      getCategoryTypeForChartTrackingType(filter.chartTrackingType) ===
      ChartTrackingCategory.symptoms
  );
  return symptomsCheckboxStatus.map((chart) => {
    return { chartTrackingType: chart.chartTrackingType, active: chart.active };
  });
};

export const getFactorsCheckboxes = (filters: ChartFilter[]) => {
  let factorsCheckboxStatus = filters.filter(
    (filter) =>
      getCategoryTypeForChartTrackingType(filter.chartTrackingType) ===
      ChartTrackingCategory.factors
  );
  return factorsCheckboxStatus.map((chart) => {
    return { chartTrackingType: chart.chartTrackingType, active: chart.active };
  });
};

export const getChartDataPage = (state: RootState) => state.chartOverview.page;

export const getDataSetForChartTrackingType = (
  chartTrackingType: ChartTrackingTypes,
  dataSets: DataSet[]
) => {
  return dataSets.filter(
    (dataSet) => dataSet.chartTrackingType === chartTrackingType
  )[0];
};

const addZerosToBarDataSets = (
  dataset: any,
  startDate: Date,
  endDate: Date
) => {
  let data = [];
  if (dataset.type === 'bar') {
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      let day = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
      let index = dataset.data.findIndex(
        (datapoint: any) => datapoint.x.getTime() === day.getTime()
      );
      if (index === -1) {
        data.push({ x: day, y: 0, tag: 'No tag' });
      } else {
        data.push(dataset.data[index]);
      }
    }
    return { ...dataset, data: data };
  } else {
    return dataset;
  }
};

export const getActiveTimeFilteredDataSets = (
  activeChartTrackingTypes: ChartTrackingTypes[],
  dataSets: DataSet[],
  startDate: Date,
  endDate: Date
) => {
  const activeDataSet = activeChartTrackingTypes.map((chartTrackingType) => {
    const dataSet = getDataSetForChartTrackingType(chartTrackingType, dataSets);
    const filteredData = dataSet.data.filter(
      (data: any) =>
        moment(data.x).isSameOrAfter(startDate) &&
        moment(data.x).isSameOrBefore(endDate)
    );
    let newDataSet = { ...dataSet, data: filteredData };
    newDataSet = addZerosToBarDataSets(newDataSet, startDate, endDate);
    return newDataSet;
  });
  return activeDataSet;
};
