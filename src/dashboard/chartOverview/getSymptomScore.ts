import each from 'lodash/each';
import { TrackingType, TrackingTypes, TrackingDataPoint } from '../types';

const multipleBonus = 10.0;
const multipleTolerance = 5.5;

export function aggregateScore(values: number[]): number {
  let maxValue = Math.max(...values);
  let maxOccurences: number;

  if (maxValue >= 10.0) {
    maxOccurences =
      values.filter((value: number) => {
        return value > maxValue - multipleTolerance;
      }).length - 1;
  } else {
    maxOccurences = 0;
  }
  return Math.min(maxValue + multipleBonus * maxOccurences, 100.0);
}

export function aggregateContributions(values: number[]): number[] {
  let maxValue = Math.max(...values);

  if (maxValue >= 10.0) {
    const valuesFiltered = values.filter((element: number) => {
      return element > maxValue - multipleTolerance;
    });
    return valuesFiltered.map((element) => {
      return values.indexOf(element);
    });
  } else {
    return [];
  }
}

export function computeMoodScore(
  trackingData: TrackingDataPoint[]
): number | undefined {
  const values: any = {
    '100': 50.0,
    '75': 25.0,
    '50': 12.5,
    '25': 0.0,
    '0': 0.0,
  };
  let b = trackingData.map((trackingPoint: TrackingDataPoint) => {
    return values[trackingPoint.value!.toString()];
  });
  if (b.length > 0) {
    return aggregateScore(b);
  } else {
    return undefined;
  }
}

export function computeSimplyScaledScore(
  scalingFactor: number
): (trackingData: TrackingDataPoint[]) => number | undefined {
  function scaleFunct(trackingData: TrackingDataPoint[]): number | undefined {
    let b = trackingData.map((trackingDataPoint: TrackingDataPoint) => {
      return scalingFactor * trackingDataPoint.value!;
    });
    if (b.length > 0) {
      return aggregateScore(b);
    } else {
      return undefined;
    }
  }
  return scaleFunct;
}

export function computeDiarrheaScore(
  trackingData: TrackingDataPoint[]
): number | undefined {
  const values: any = {
    '0': 0.0,
    '14': 0.0,
    '28': 0.0,
    '42': 0.0,
    '57': 0.0,
    '71': 10.0,
    '85': 20.0,
    '100': 20.0,
  };
  const b = trackingData.map((trackingPoint: TrackingDataPoint) => {
    return values[trackingPoint.value!.toString()];
  });
  if (b.length > 0) {
    return aggregateScore(b);
  } else {
    return undefined;
  }
}

export function computeConstipationScore(
  trackingData: TrackingDataPoint[]
): number | undefined {
  const values: any = {
    '0': 40.0,
    '14': 40.0,
    '28': 20.0,
    '42': 0.0,
    '57': 0.0,
    '71': 0.0,
    '85': 0.0,
    '100': 0.0,
  };
  const b = trackingData.map((trackingPoint: TrackingDataPoint) => {
    return values[trackingPoint.value!.toString()];
  });
  if (b.length > 0) {
    return aggregateScore(b);
  } else {
    return undefined;
  }
}

export enum ScoreComponent {
  score = 'score',
  mood = 'mood',
  tummyPain = 'pain',
  headache = 'headache',
  otherPain = 'otherPain',
  bloating = 'bloating',
  diarrhea = 'diarrhea',
  constipation = 'constipation',
}

interface ScoreComponentType {
  scoreComponent: ScoreComponent;
  trackingType: TrackingType;
  function: (trackingData: TrackingDataPoint[]) => number | undefined;
}

export const scoreComponents: ScoreComponentType[] = [
  {
    scoreComponent: ScoreComponent.mood,
    trackingType: TrackingTypes.moodType,
    function: computeMoodScore,
  },
  {
    scoreComponent: ScoreComponent.tummyPain,
    trackingType: TrackingTypes.tummyPainType,
    function: computeSimplyScaledScore(0.7),
  },

  {
    scoreComponent: ScoreComponent.headache,
    trackingType: TrackingTypes.headacheType,
    function: computeSimplyScaledScore(0.7),
  },
  {
    scoreComponent: ScoreComponent.otherPain,
    trackingType: TrackingTypes.otherPainType,
    function: computeSimplyScaledScore(0.7),
  },
  {
    scoreComponent: ScoreComponent.bloating,
    trackingType: TrackingTypes.bloatingType,
    function: computeSimplyScaledScore(0.5),
  },
  {
    scoreComponent: ScoreComponent.diarrhea,
    trackingType: TrackingTypes.stoolType,
    function: computeDiarrheaScore,
  },
  {
    scoreComponent: ScoreComponent.constipation,
    trackingType: TrackingTypes.stoolType,
    function: computeConstipationScore,
  },
];

export const scoreComponentsTypes = scoreComponents.map(
  (scoreComponent: any) => {
    return scoreComponent.scoreComponent;
  }
);

export function computeScoreComponents(
  trackingData: TrackingDataPoint[]
): { scoreComponent: ScoreComponent; value?: number }[] {
  let subscores = scoreComponents.map((scoreComponent: ScoreComponentType) => {
    return scoreComponent.function(
      trackingData.filter(
        (trackingDataPoint: TrackingDataPoint) =>
          trackingDataPoint.type === scoreComponent.trackingType
      )
    );
  });
  let nonNullScores = subscores
    .filter((element) => {
      return element != undefined; // eslint-disable-line eqeqeq
    })
    .map((element) => element!);

  let score =
    nonNullScores.length > 0 ? aggregateScore(nonNullScores) : undefined;
  var ret: { scoreComponent: ScoreComponent; value?: number }[] = [
    { scoreComponent: ScoreComponent.score, value: score },
  ];
  each(scoreComponentsTypes, (component, index) => {
    ret.push({ scoreComponent: component, value: subscores[index] });
  });
  return ret;
}

export function getSymptomScoresPerDay(trackingData: TrackingDataPoint[]) {
  const trackingDataPointsForDay: { [key: string]: TrackingDataPoint[] } = {};

  for (let trackingDataPoint of trackingData) {
    const day = trackingDataPoint.timestampTracking;
    const date = new Date(day).toISOString().substring(0, 10);
    if (trackingDataPointsForDay.hasOwnProperty(date)) {
      trackingDataPointsForDay[date].push(trackingDataPoint);
    } else {
      trackingDataPointsForDay[date] = [trackingDataPoint];
    }
  }

  const symptomScoreForDay: { [key: string]: number | null } = {};

  for (let day in trackingDataPointsForDay) {
    const symptomscoreComponent = computeScoreComponents(
      trackingDataPointsForDay[day]
    ).filter(
      (scoreComponent) => scoreComponent.scoreComponent === ScoreComponent.score
    )[0];

    if (symptomscoreComponent) {
      symptomScoreForDay[day] =
        typeof symptomscoreComponent.value !== 'undefined'
          ? symptomscoreComponent.value
          : null;
    } else {
      symptomScoreForDay[day] = null;
    }
  }

  return symptomScoreForDay;
}
