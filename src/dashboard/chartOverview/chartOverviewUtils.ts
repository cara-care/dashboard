import { MessageDescriptor } from 'react-intl';

export enum ChartTrackingTypes {
  bloating = 'bloating',
  bowelMovements = 'stoolB',
  constipation = 'stoolC',
  diarrhoea = 'stoolD',
  headache = 'headache',
  mood = 'mood',
  otherPain = 'otherPain',
  pain = 'pain',
  period = 'periodCycle',
  sleep = 'sleep',
  stress = 'stress',
  symptomScore = 'symptomScore',
  water = 'water',
  workout = 'workout',
}

export enum ChartTrackingCategory {
  factors = 'Factors',
  symptoms = 'Symptoms',
}

export enum ChartTypes {
  line = 'line',
  bar = 'bar',
}

export interface ChartFilter {
  chartTrackingType: ChartTrackingTypes;
  active: boolean;
}

export type ChartTrackingType =
  | ChartTrackingTypes.bloating
  | ChartTrackingTypes.bowelMovements
  | ChartTrackingTypes.constipation
  | ChartTrackingTypes.diarrhoea
  | ChartTrackingTypes.headache
  | ChartTrackingTypes.mood
  | ChartTrackingTypes.otherPain
  | ChartTrackingTypes.pain
  | ChartTrackingTypes.period
  | ChartTrackingTypes.sleep
  | ChartTrackingTypes.stress
  | ChartTrackingTypes.symptomScore
  | ChartTrackingTypes.water
  | ChartTrackingTypes.workout;

export const symptomsChartTrackingTypesOrdered = [
  ChartTrackingTypes.symptomScore,
  ChartTrackingTypes.diarrhoea,
  ChartTrackingTypes.constipation,
  ChartTrackingTypes.bowelMovements,
  ChartTrackingTypes.bloating,
  ChartTrackingTypes.pain,
  ChartTrackingTypes.mood,
  ChartTrackingTypes.headache,
  ChartTrackingTypes.otherPain,
];

export const factorsChartTrackingTypesOrdered = [
  ChartTrackingTypes.water,
  ChartTrackingTypes.period,
  ChartTrackingTypes.workout,
  ChartTrackingTypes.sleep,
  ChartTrackingTypes.stress,
];

export const translateKeyForTrackingCategory = (
  chartTrackingCategory: ChartTrackingCategory
) => {
  switch (chartTrackingCategory) {
    case ChartTrackingCategory.factors:
      return 'overview.chartPicker.factors';
    case ChartTrackingCategory.symptoms:
      return 'overview.chartPicker.symptoms';
    default:
      return null;
  }
};

export const chartTypeForChartTrackingType = (
  chartTrackingType: ChartTrackingType
) => {
  switch (chartTrackingType) {
    case ChartTrackingTypes.bloating:
      return ChartTypes.line;
    case ChartTrackingTypes.bowelMovements:
      return ChartTypes.bar;
    case ChartTrackingTypes.constipation:
      return ChartTypes.line;
    case ChartTrackingTypes.diarrhoea:
      return ChartTypes.line;
    case ChartTrackingTypes.headache:
      return ChartTypes.line;
    case ChartTrackingTypes.mood:
      return ChartTypes.line;
    case ChartTrackingTypes.otherPain:
      return ChartTypes.line;
    case ChartTrackingTypes.pain:
      return ChartTypes.line;
    case ChartTrackingTypes.period:
      return ChartTypes.line;
    case ChartTrackingTypes.sleep:
      return ChartTypes.bar;
    case ChartTrackingTypes.stress:
      return ChartTypes.line;
    case ChartTrackingTypes.symptomScore:
      return ChartTypes.line;
    case ChartTrackingTypes.water:
      return ChartTypes.bar;
    case ChartTrackingTypes.workout:
      return ChartTypes.bar;
    default:
      return null;
  }
};

export const getCategoryTypeForChartTrackingType = (
  chartTrackingType: ChartTrackingType
) => {
  switch (chartTrackingType) {
    case ChartTrackingTypes.bloating:
      return ChartTrackingCategory.symptoms;
    case ChartTrackingTypes.bowelMovements:
      return ChartTrackingCategory.symptoms;
    case ChartTrackingTypes.constipation:
      return ChartTrackingCategory.symptoms;
    case ChartTrackingTypes.diarrhoea:
      return ChartTrackingCategory.symptoms;
    case ChartTrackingTypes.headache:
      return ChartTrackingCategory.symptoms;
    case ChartTrackingTypes.mood:
      return ChartTrackingCategory.symptoms;
    case ChartTrackingTypes.otherPain:
      return ChartTrackingCategory.symptoms;
    case ChartTrackingTypes.pain:
      return ChartTrackingCategory.symptoms;
    case ChartTrackingTypes.period:
      return ChartTrackingCategory.factors;
    case ChartTrackingTypes.sleep:
      return ChartTrackingCategory.factors;
    case ChartTrackingTypes.stress:
      return ChartTrackingCategory.factors;
    case ChartTrackingTypes.symptomScore:
      return ChartTrackingCategory.symptoms;
    case ChartTrackingTypes.workout:
      return ChartTrackingCategory.factors;
    case ChartTrackingTypes.water:
      return ChartTrackingCategory.factors;
    default:
      return ChartTrackingCategory.symptoms;
  }
};

export const getIntlContentForChartTrackingType = (
  chartTrackingType: string
): MessageDescriptor => {
  switch (chartTrackingType) {
    case ChartTrackingTypes.bloating:
      return {
        id: 'common.bloating',
        defaultMessage: 'Bloating',
      };
    case ChartTrackingTypes.bowelMovements:
      return {
        id: 'common.bowelMovements',
        defaultMessage: 'Bowel Movements',
      };
    case ChartTrackingTypes.constipation:
      return {
        id: 'common.constipation',
        defaultMessage: 'Constipation',
      };
    case ChartTrackingTypes.diarrhoea:
      return {
        id: 'common.diarrhoea',
        defaultMessage: 'Diarrhoea',
      };
    case ChartTrackingTypes.headache:
      return {
        id: 'common.headache',
        defaultMessage: 'Headache',
      };
    case ChartTrackingTypes.mood:
      return {
        id: 'common.mood',
        defaultMessage: 'Mood',
      };
    case ChartTrackingTypes.otherPain:
      return {
        id: 'common.otherPain',
        defaultMessage: 'Other Pain',
      };
    case ChartTrackingTypes.pain:
      return {
        id: 'common.pain',
        defaultMessage: 'Tummy Pain',
      };
    case ChartTrackingTypes.period:
      return {
        id: 'common.period',
        defaultMessage: 'Period',
      };
    case ChartTrackingTypes.sleep:
      return {
        id: 'common.sleep',
        defaultMessage: 'Sleep',
      };
    case ChartTrackingTypes.stress:
      return {
        id: 'common.stress',
        defaultMessage: 'Stress',
      };
    case ChartTrackingTypes.symptomScore:
      return {
        id: 'common.symptomScore',
        defaultMessage: 'Symptom Score',
      };
    case ChartTrackingTypes.workout:
      return {
        id: 'common.workout',
        defaultMessage: 'Workout',
      };
    case ChartTrackingTypes.water:
      return {
        id: 'common.water',
        defaultMessage: 'Water',
      };
    default:
      return {
        id: '',
        defaultMessage: '',
      };
  }
};

// dataSets
export interface DataSet {
  chartTrackingType: ChartTrackingTypes;
  graphType: ChartTypes;
  yAxisID: string;
  fill: boolean;
  lineTension: number;
  backgroundColor: string;
  borderColor: string;
  data: any[]; // FIXME: typing
}

export const getInitialDataSets = (): DataSet[] => {
  return Object.keys(ChartTrackingTypes).map((key) => {
    return {
      chartTrackingType: ChartTrackingTypes[key],
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
