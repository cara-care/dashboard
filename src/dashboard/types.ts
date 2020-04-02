export enum TrackingTypes {
  additionalSymptomsType = 'additionalSymptoms',
  bloatingType = 'bloating',
  foodType = 'food',
  headacheType = 'headache',
  medicationsType = 'medications',
  medicationsType2 = 'medications2',
  moodType = 'mood',
  notesType = 'notes',
  otherPainType = 'otherPain',
  tummyPainType = 'pain',
  periodType = 'periodCycle',
  skinType = 'skin',
  sleepType = 'sleep',
  stoolType = 'stool',
  stressType = 'stress',
  waterType = 'water',
  workoutType = 'workout',
}

export type TrackingType =
  | TrackingTypes.additionalSymptomsType
  | TrackingTypes.bloatingType
  | TrackingTypes.foodType
  | TrackingTypes.headacheType
  | TrackingTypes.medicationsType
  | TrackingTypes.medicationsType2
  | TrackingTypes.moodType
  | TrackingTypes.notesType
  | TrackingTypes.otherPainType
  | TrackingTypes.periodType
  | TrackingTypes.skinType
  | TrackingTypes.sleepType
  | TrackingTypes.stoolType
  | TrackingTypes.stressType
  | TrackingTypes.tummyPainType
  | TrackingTypes.waterType
  | TrackingTypes.workoutType;

export interface TrackingDataPoint {
  type: TrackingType;
  timestampTracking: string | Date;
  timestampEntry: string | Date;
  timestampLastModified: Date | null;
  userDateTracking: Date | null;
  value: number | null;
  text: string | null;
  tags: string | null;
  mealItems: {
    hasImage: boolean;
    name: string;
    realmIdString: string;
    customFoodItems: any[];
    foodItems: any[];
  }[];
  medicationUnit?: string;
}
