import {
  ChartTrackingTypes,
  chartTypeForChartTrackingType,
} from './chartOverviewUtils';
import { TrackingDataPoint, TrackingType, TrackingTypes } from '../types';
import { parse, parseISO } from 'date-fns';

function parseDate(dateString: string, format: string) {
  return parse(dateString, format, new Date());
}

function getDayKey(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return year + '-' + month + '-' + day;
}

const stoolValuePerDay = (
  stoolType: string,
  trackingDataPoints: TrackingDataPoint[]
) => {
  let numberOfPoints = trackingDataPoints.length;
  let stoolValueTotal = trackingDataPoints.reduce(function (sum, elem) {
    let mappedValue = mapStoolValue(stoolType, elem);
    if (mappedValue === undefined) {
      numberOfPoints -= 1;
      return sum;
    } else {
      return sum + (mappedValue || 0);
    }
  }, 0);

  if (numberOfPoints === 0) {
    return 0;
  } else {
    return stoolValueTotal / numberOfPoints;
  }
};

const aggregateTrackingDataPointsByDay = (
  trackingDataPoints: TrackingDataPoint[]
): { [key: string]: TrackingDataPoint[] } => {
  let trackingDataPointsByDay = {};
  trackingDataPoints.forEach((trackingDataPoint) => {
    const date =
      typeof trackingDataPoint.timestampTracking === 'string'
        ? parseISO(trackingDataPoint.timestampTracking)
        : trackingDataPoint.timestampTracking;

    if (trackingDataPointsByDay[getDayKey(date)] === undefined) {
      trackingDataPointsByDay[getDayKey(date)] = [trackingDataPoint];
    } else {
      trackingDataPointsByDay[getDayKey(date)].push(trackingDataPoint);
    }
  });
  return trackingDataPointsByDay;
};

const mapStoolValue = (
  stoolType: string,
  trackingDataPoint: TrackingDataPoint
) => {
  switch (stoolType) {
    case 'C':
      switch (trackingDataPoint.value) {
        case 0:
          return 99;
        case 14:
          return 66;
        case 28:
          return 33;
        case 42:
          return 0;
        case 57:
          return 0;
        default:
          return undefined;
      }
    case 'D':
      switch (trackingDataPoint.value) {
        case 42:
          return 0;
        case 57:
          return 0;
        case 71:
          return 33;
        case 85:
          return 66;
        case 100:
          return 99;
        default:
          return undefined;
      }
    default:
      return trackingDataPoint.value;
  }
};

const createSymptomScoreDataset = (symptomScoresPerDay: {
  [key: string]: number | null;
}) => {
  // Compute value per day depending on type
  let dataSetPoints = Object.keys(symptomScoresPerDay).map(function (day) {
    return {
      x: parseDate(day, 'yyyy-MM-dd'),
      y: symptomScoresPerDay[day],
    };
  });

  // Sort data set points by time
  let dataSet = dataSetPoints.sort((scoreDataPoint1, scoreDataPoint2) => {
    if (scoreDataPoint1.x > scoreDataPoint2.x) {
      return 1;
    } else if (scoreDataPoint1.x < scoreDataPoint2.x) {
      return -1;
    }
    return 0;
  });

  return {
    chartTrackingType: ChartTrackingTypes.symptomScore,
    graphType: chartTypeForChartTrackingType(ChartTrackingTypes.symptomScore),
    yAxisID: 'value',
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(255,99,132,0.8)',
    borderColor: 'rgba(255,99,132,1)',
    data: dataSet,
  };
};

const createDataSet = (
  chartTrackingType: ChartTrackingTypes,
  data: TrackingDataPoint[]
) => {
  let trackingType: ChartTrackingTypes | TrackingType = chartTrackingType;
  if (trackingType === 'symptomScore') {
    return {
      data: [],
    };
  }
  let stoolType = '';
  let yAxisID = 'value';
  if (trackingType.includes('stool')) {
    stoolType = trackingType[5];
    trackingType = TrackingTypes.stoolType;
    if (stoolType === 'B') {
      yAxisID = 'bowel';
    }
  }
  if (trackingType === 'water') {
    yAxisID = 'water';
  }

  // Filter to keep only current tracking type data points
  let trackingDataPoints = data.filter(
    (trackingDataPoint) => trackingDataPoint.type === trackingType
  );

  // Aggregate tracking data points by day
  let trackingDataPointsByDay = aggregateTrackingDataPointsByDay(
    trackingDataPoints
  );

  // Compute value per day depending on type
  let dataSetPoints = Object.keys(trackingDataPointsByDay).map(function (day) {
    let value = 0;
    if (stoolType !== '') {
      if (stoolType === 'B') {
        value = trackingDataPointsByDay[day].length;
      } else {
        value = stoolValuePerDay(stoolType, trackingDataPointsByDay[day]);
      }
    } else {
      if (
        chartTypeForChartTrackingType(
          (trackingType + stoolType) as
            | ChartTrackingTypes.bowelMovements
            | ChartTrackingTypes.constipation
            | ChartTrackingTypes.diarrhoea
        ) === 'line'
      ) {
        value =
          trackingDataPointsByDay[day].reduce(function (sum, elem) {
            return sum + (elem.value || 0);
          }, 0) / trackingDataPointsByDay[day].length;
      } else {
        value = trackingDataPointsByDay[day].reduce(function (sum, elem) {
          return sum + (elem.value || 0);
        }, 0);
        if (trackingType === 'water') {
          value = trackingDataPointsByDay[day].reduce(function (sum, elem) {
            return sum + ((elem.value || 0) + 25) / 25;
          }, 0);
        }
      }
    }
    let tag: string | undefined = '';
    trackingDataPointsByDay[day].forEach((trackingPoint: TrackingDataPoint) => {
      if (trackingPoint.tags != null) {
        tag = tag + trackingPoint.tags;
      }
    });

    if (tag === '') {
      tag = 'No tag';
    }
    tag = tag.replace(/\|/g, ', ');

    if (stoolType === 'B') {
      tag = undefined;
    }

    return {
      x: parseDate(day, 'yyyy-MM-dd'),
      y: value,
      tag: tag,
    };
  });

  // Sort data set points by time
  let dataSet = dataSetPoints.sort((trackingDataPoint1, trackingDataPoint2) => {
    if (trackingDataPoint1.x > trackingDataPoint2.x) {
      return 1;
    } else if (trackingDataPoint1.x < trackingDataPoint2.x) {
      return -1;
    }
    return 0;
  });

  let s = 255;
  let colorR = Math.round(Math.random() * s);
  let colorG = Math.round(Math.random() * s);
  let colorB = Math.round(Math.random() * s);

  return {
    chartTrackingType: chartTrackingType,
    graphType: chartTypeForChartTrackingType(chartTrackingType),
    yAxisID: yAxisID,
    fill: false,
    lineTension: 0.2,
    backgroundColor: 'rgba(' + colorR + ',' + colorG + ',' + colorB + ',0.5)',
    borderColor: 'rgba(' + colorR + ',' + colorG + ',' + colorB + ',1)',
    data: dataSet,
  };
};

let TrackingDatasetCreator = {
  createDataSet,
  createSymptomScoreDataset,
};

export default TrackingDatasetCreator;
