import { TrackingDataPoint } from '../types';

// TS definitions
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

export enum WaterTags {
  carbonated = 'carbonated',
  'non-carbonated' = 'non-carbonated',
}

export enum StoolTags {
  blood = 'blood',
  mucus = 'mucus',
  yellow = 'yellow',
  green = 'green',
  'partial evacuation' = 'partial evacuation',
  'full evacuation' = 'full evacuation',
  'not pooped' = 'not pooped',
  'extreme pressure' = 'extreme pressure',
  'huge pressure' = 'huge pressure',
  'medium pressure' = 'medium pressure',
  'a bit of pressure' = 'a bit of pressure',
  'hardly any pressure' = 'hardly any pressure',
  'no pressure' = 'no pressure',
}

export enum TummyPainTags {
  heartburn = 'heartburn',
  'acid reflux' = 'acid reflux',
  cramping = 'cramping',
  indigestion = 'indigestion',
}

export enum BloatingTags {
  gassy = 'gassy',
  wind = 'wind',
  nauseous = 'nauseous',
  burping = 'burping',
  vomiting = 'vomiting',
  'gurgling sound' = 'gurgling sound',
  'smelly gas' = 'smelly gas',
}

export enum MoodTags {
  anxious = 'anxious',
  lonely = 'lonely',
  melancholic = 'melancholic',
  hungover = 'hungover',
  depressed = 'depressed',
  excited = 'excited',
  nervous = 'nervous',
  worried = 'worried',
  panicked = 'panicked',
  annoyed = 'annoyed',
  frustrated = 'frustrated',
  fatigue = 'fatigue',
  sensitive = 'sensitive',
  grouchy = 'grouchy',
  active = 'active',
  restless = 'restless',
  'in love' = 'in love',
  'in thoughts' = 'in thoughts',
}

export enum StressTags {
  energized = 'energized',
  relieved = 'relieved',
  productive = 'productive',
  exhausted = 'exhausted',
  creative = 'creative',
  bored = 'bored',
  inspired = 'inspired',
  'good stress' = 'good stress',
  struggling = 'struggling',
  'over-tired' = 'over-tired',
  dizzy = 'dizzy',
  pressured = 'pressured',
  relaxed = 'relaxed',
  happy = 'happy',
  overwhelmed = 'overwhelmed',
  overworked = 'overworked',
}

export enum PeriodTags {
  sex = 'sex',
  PMS = 'PMS',
  pain = 'pain',
  cramps = 'cramps',
  'tender breasts' = 'tender breasts',
  ovulation = 'ovulation',
  fluid = 'fluid',
  'egg-white fluid' = 'egg-white fluid',
  'sticky fluid' = 'sticky fluid',
  'creamy fluid' = 'creamy fluid',
  'atypical fluid' = 'atypical fluid',
  spotting = 'spotting',
  'strong smell' = 'strong smell',
  sweating = 'sweating',
}

export enum SkinTags {
  good = 'good',
  clear = 'clear',
  'big pores' = 'big pores',
  itching = 'itching',
  'very dry' = 'very dry',
  pimples = 'pimples',
  dermatitis = 'dermatitis',
  rosacea = 'rosacea',
  redness = 'redness',
  'cold sores' = 'cold sores',
  infection = 'infection',
  allergy = 'allergy',
  swelling = 'swelling',
  pustule = 'pustule',
  eczema = 'eczema',
  hives = 'hives',
  acne = 'acne',
  dry = 'dry',
  oily = 'oily',
  rash = 'rash',
  wart = 'wart',
}

export enum WorkoutTags {
  'body weight workout' = 'body weight workout',
  biking = 'biking',
  spinning = 'spinning',
  dance = 'dance',
  boxing = 'boxing',
  kickboxing = 'kickboxing',
  indoor = 'indoor',
  outdoor = 'outdoor',
  walking = 'walking',
  poledance = 'poledance',
  bodybuilding = 'bodybuilding',
  cardio = 'cardio',
  'short & intense' = 'short & intense',
  'team sports' = 'team sports',
  running = 'running',
  swimming = 'swimming',
  crossfit = 'crossfit',
  'no workout' = 'no workout',
  short = 'short',
  medium = 'medium',
  gym = 'gym',
  yoga = 'yoga',
  HIIT = 'HIIT',
  long = 'long',
}

export enum SleepTags {
  tiring = 'tiring',
  insomnia = 'insomnia',
  'bad dream/nightmare' = 'bad dream/nightmare',
  'good dream' = 'good dream',
  'neutral dream' = 'neutral dream',
  'restful sleep' = 'restful sleep',
  'night shift' = 'night shift',
  restless = 'restless',
  'difficulty falling asleep' = 'difficulty falling asleep',
  'deep sleep' = 'deep sleep',
  'waking up during sleep' = 'waking up during sleep',
  'toss & turn' = 'toss & turn',
  'tired after waking up' = 'tired after waking up',
  'refreshed after waking up' = 'refreshed after waking up',
  sleepwalking = 'sleepwalking',
}

export enum HeadacheTags {
  migraine = 'migraine',
  pulsing = 'pulsing',
  tension = 'tension',
  'pain from neck' = 'pain from neck',
  'blurred vision' = 'blurred vision',
  nausea = 'nausea',
  'cluster headache' = 'cluster headache',
  'one sided' = 'one sided',
  sharp = 'sharp',
  burning = 'burning',
  'attack-like' = 'attack-like',
  'pressure-like' = 'pressure-like',
}

export enum OtherPainTags {
  back = 'back',
  knee = 'knee',
  joint = 'joint',
  bones = 'bones',
  muscles = 'muscles',
  soreness = 'soreness',
  injury = 'injury',
}

// intl helper for Tracking Type Label
export const getIntlLabelForTrackingType = (
  trackingType: TrackingType | null
) => {
  switch (trackingType) {
    case TrackingTypes.additionalSymptomsType:
      return 'common.additionalSymptoms';
    case TrackingTypes.bloatingType:
      return 'common.bloating';
    case TrackingTypes.foodType:
      return 'common.food';
    case TrackingTypes.headacheType:
      return 'common.headache';
    case TrackingTypes.medicationsType:
      return 'common.medication';
    case TrackingTypes.medicationsType2:
      return 'common.medication';
    case TrackingTypes.moodType:
      return 'common.mood';
    case TrackingTypes.notesType:
      return 'common.notes';
    case TrackingTypes.otherPainType:
      return 'common.otherPain';
    case TrackingTypes.tummyPainType:
      return 'common.pain';
    case TrackingTypes.periodType:
      return 'common.period';
    case TrackingTypes.skinType:
      return 'common.skin';
    case TrackingTypes.sleepType:
      return 'common.sleep';
    case TrackingTypes.stoolType:
      return 'common.stool';
    case TrackingTypes.stressType:
      return 'common.stress';
    case TrackingTypes.waterType:
      return 'common.water';
    case TrackingTypes.workoutType:
      return 'common.workout';
    default:
      return null;
  }
};

// intl helpers for Tags
const painValueText = (value: number) => {
  const labels = [
    'overview.tummyPain.noPain',
    'overview.tummyPain.mild',
    'overview.tummyPain.moderate',
    'overview.tummyPain.severe',
    'overview.tummyPain.extreme',
  ];
  const index = (value * (labels.length - 1)) / 100;
  return labels[index];
};

const bloatingValueText = (value: number) => {
  const labels = [
    'overview.bloating.noBloating',
    'overview.bloating.mild',
    'overview.bloating.moderate',
    'overview.bloating.severe',
    'overview.bloating.extreme',
  ];
  const index = (value * (labels.length - 1)) / 100;
  return labels[index];
};

const stressValueText = (value: number) => {
  const labels = [
    'overview.stress.noStress',
    'overview.stress.aLittle',
    'overview.stress.somewhat',
    'overview.stress.really',
    'overview.stress.extreme',
  ];
  const index = (value * (labels.length - 1)) / 100;
  return labels[index];
};

const stoolValueText = (value: number) => {
  const labels = {
    0: 'overview.stool.nothingButAir',
    14: 'overview.stool.separateHardLumps',
    28: 'overview.stool.lumpyAndSausageLike',
    42: 'overview.stool.sausageWithCracks',
    57: 'overview.stool.perfectlySmooth',
    71: 'overview.stool.softBlobs',
    85: 'overview.stool.mushyRaggedEdges',
    100: 'overview.stool.liquidNoSolidPieces',
  };
  return labels[value];
};

const moodValueText = (value: number) => {
  const labels = {
    0: 'overview.mood.veryGood',
    25: 'overview.mood.good',
    50: 'overview.mood.soSo',
    75: 'overview.mood.notGood',
    100: 'overview.mood.awful',
  };
  return labels[value];
};

const periodCycleValueText = (value: number) => {
  // Fix for wrong mapping from old android version
  if (value === 99) {
    value = 100;
  }
  const labels = {
    0: 'overview.period.noPeriod',
    33: 'overview.period.lightBleeding',
    66: 'overview.period.mediumBleeding',
    100: 'overview.period.heavyBleeding',
  };
  return labels[value];
};

const workoutValueText = (value: number) => {
  const labels = {
    0: 'overview.workout.easy',
    50: 'overview.workout.medium',
    100: 'overview.workout.hard',
  };
  return labels[value];
};

const sleepValueText = (value: number) => {
  const labels = {
    0: 'overview.sleep.lessThan2',
    25: 'overview.sleep.2To4',
    50: 'overview.sleep.4To6',
    75: 'overview.sleep.6T8',
    100: 'overview.sleep.moreThan8',
  };
  return labels[value];
};

const headacheValueText = (value: number) => {
  const labels = {
    0: 'overview.headache.noPain',
    25: 'overview.headache.mild',
    50: 'overview.headache.moderate',
    75: 'overview.headache.severe',
    100: 'overview.headache.extreme',
  };
  return labels[value];
};

const otherPainValueText = (value: number) => {
  const labels = {
    0: 'overview.otherPain.noPain',
    25: 'overview.otherPain.mildPain',
    50: 'overview.otherPain.moderatePain',
    75: 'overview.otherPain.severePain',
    100: 'overview.otherPain.extremePain',
  };
  return labels[value];
};

const medicationValueText = (trackingDataPoint: TrackingDataPoint) => {
  const { text, medicationUnit } = trackingDataPoint;

  let name = text;

  if (trackingDataPoint.value !== null && medicationUnit !== null) {
    return (
      name + ' ' + trackingDataPoint.value / 1000.0 + ' ' + medicationUnit!
    );
  }

  return name;
};

const waterValueText = (value: number) => {
  return 'overview.water.cup';
};

export const getArrayOfTags = (tags: string | null) => {
  if (!tags) return [];
  return tags.split(/\|/g);
};

export const getTrackingIconClassName = (
  trackingDataPoint: TrackingDataPoint
) => {
  const { value, type } = trackingDataPoint;
  switch (type) {
    case TrackingTypes.additionalSymptomsType:
      return 'bg-iCNAdditionalSymptoms';
    case TrackingTypes.bloatingType:
      return 'bg-iCNBloating';
    case TrackingTypes.foodType:
      return 'bg-iCNFood';
    case TrackingTypes.headacheType:
      return 'bg-iCNHeadache';
    case TrackingTypes.medicationsType:
      return 'bg-iCNMedication';
    case TrackingTypes.medicationsType2:
      return 'bg-iCNMedication';
    case TrackingTypes.moodType:
      switch (value) {
        case 1:
          return 'bg-iCNMoodVeryGood';
        case 2:
          return 'bg-iCNMoodGood';
        case 3:
          return 'bg-iCNMoodOkay';
        case 4:
          return 'bg-iCNMoodNotGood';
        case 5:
          return 'bg-iCNMoodAwful';
        default:
          return 'bg-iCNMoodEmpty';
      }
    case TrackingTypes.notesType:
      return 'bg-iCNNotes';
    case TrackingTypes.otherPainType:
      return 'bg-iCNOtherPain';
    case TrackingTypes.tummyPainType:
      return 'bg-iCNOtherPain';
    case TrackingTypes.periodType:
      return 'bg-iCNPeriod';
    case TrackingTypes.skinType:
      return 'bg-iCNSkin';
    case TrackingTypes.sleepType:
      return 'bg-iCNSleep';
    case TrackingTypes.stoolType:
      switch (value) {
        case 1:
          return 'bg-poop1';
        case 2:
          return 'bg-poop2';
        case 3:
          return 'bg-poop3';
        case 4:
          return 'bg-poop4';
        case 5:
          return 'bg-poop5';
        case 6:
          return 'bg-poop6';
        case 7:
          return 'bg-poop7';
        case 8:
          return 'bg-poop8';
        default:
          return 'bg-poop0';
      }
    case TrackingTypes.stressType:
      return 'bg-iCNStress';
    case TrackingTypes.waterType:
      return 'bg-iCNWater';
    case TrackingTypes.workoutType:
      return 'bg-iCNWorkout';
    default:
      return '';
  }
};

export const getTextForNonTranslatableDataValue = (
  trackingDataPoint: TrackingDataPoint
) => {
  const { text, type } = trackingDataPoint;
  switch (type) {
    case TrackingTypes.additionalSymptomsType:
      return text;
    case TrackingTypes.notesType:
      return text;
    case TrackingTypes.medicationsType:
      return text;
    case TrackingTypes.medicationsType2:
      return medicationValueText(trackingDataPoint);
    default:
      return null;
  }
};

export const getTranslatedTextIdForTrackingDataValue = (
  trackingDataPoint: TrackingDataPoint
): string | null => {
  const { value, type } = trackingDataPoint;
  if (value === null) return null;
  switch (type) {
    case TrackingTypes.additionalSymptomsType:
      return null;
    case TrackingTypes.bloatingType:
      return bloatingValueText(value);
    case TrackingTypes.foodType:
      return null;
    case TrackingTypes.headacheType:
      return headacheValueText(value);
    case TrackingTypes.medicationsType:
      return null;
    case TrackingTypes.medicationsType2:
      return null;
    case TrackingTypes.moodType:
      return moodValueText(value);
    case TrackingTypes.notesType:
      return null;
    case TrackingTypes.otherPainType:
      return otherPainValueText(value);
    case TrackingTypes.tummyPainType:
      return painValueText(value);
    case TrackingTypes.periodType:
      return periodCycleValueText(value);
    case TrackingTypes.skinType:
      return null;
    case TrackingTypes.sleepType:
      return sleepValueText(value);
    case TrackingTypes.stoolType:
      return stoolValueText(value);
    case TrackingTypes.stressType:
      return stressValueText(value);
    case TrackingTypes.waterType:
      return waterValueText(value);
    case TrackingTypes.workoutType:
      return workoutValueText(value);
    default:
      return null;
  }
};

// intl helpers for Tracking Tags
const getLocalizedTagIdForWaterTag = (tag: string | null) => {
  switch (tag) {
    case WaterTags.carbonated:
      return 'overview.water.carbonated';
    case WaterTags['non-carbonated']:
      return 'overview.water.nonCarbonated';
    default:
      return null;
  }
};

const getLocalizedTagIdForStoolTag = (tag: string | null) => {
  switch (tag) {
    case StoolTags.blood:
      return 'overview.stool.blood';
    case StoolTags.mucus:
      return 'overview.stool.mucus';
    case StoolTags.yellow:
      return 'overview.stool.yellow';
    case StoolTags.green:
      return 'overview.stool.green';
    case StoolTags['partial evacuation']:
      return 'overview.stool.partialEvacuation';
    case StoolTags['full evacuation']:
      return 'overview.stool.fullEvacuation';
    case StoolTags['not pooped']:
      return 'overview.stool.notPooped';
    case StoolTags['extreme pressure']:
      return 'overview.stool.extremePressure';
    case StoolTags['huge pressure']:
      return 'overview.stool.hugePressure';
    case StoolTags['medium pressure']:
      return 'overview.stool.mediumPressure';
    case StoolTags['a bit of pressure']:
      return 'overview.stool.aBitOfPressure';
    case StoolTags['hardly any pressure']:
      return 'overview.stool.hardlyAnyPressure';
    case StoolTags['no pressure']:
      return 'overview.stool.noPressure';
    default:
      return null;
  }
};

const getLocalizedTagIdForBloatingTag = (tag: string | null) => {
  switch (tag) {
    case BloatingTags.burping:
      return 'overview.bloating.burping';
    case BloatingTags.gassy:
      return 'overview.bloating.gassy';
    case BloatingTags['gurgling sound']:
      return 'overview.bloating.gurglingSound';
    case BloatingTags.nauseous:
      return 'overview.bloating.nauseous';
    case BloatingTags['smelly gas']:
      return 'overview.bloating.smellyGas';
    case BloatingTags.vomiting:
      return 'overview.bloating.vomiting';
    case BloatingTags.wind:
      return 'overview.bloating.wind';
    default:
      return null;
  }
};

const getLocalizedTagIdForPainTag = (tag: string | null) => {
  switch (tag) {
    case TummyPainTags['acid reflux']:
      return 'overview.tummyPain.heartburn';
    case TummyPainTags.cramping:
      return 'overview.tummyPain.cramping';
    case TummyPainTags.heartburn:
      return 'overview.tummyPain.heartburn';
    case TummyPainTags.indigestion:
      return 'overview.tummyPain.indigestion';
    default:
      return null;
  }
};

const getLocalizedTagIdForMoodTag = (tag: string | null) => {
  switch (tag) {
    case MoodTags.active:
      return 'overview.mood.active';
    case MoodTags.annoyed:
      return 'overview.mood.annoyed';
    case MoodTags.depressed:
      return 'overview.mood.depressed';
    case MoodTags.excited:
      return 'overview.mood.excited';
    case MoodTags.fatigue:
      return 'overview.mood.fatigue';
    case MoodTags.frustrated:
      return 'overview.mood.frustrated';
    case MoodTags.grouchy:
      return 'overview.mood.grouchy';
    case MoodTags.hungover:
      return 'overview.mood.hungover';
    case MoodTags['in love']:
      return 'overview.mood.inLove';
    case MoodTags['in thoughts']:
      return 'overview.mood.inThoughts';
    case MoodTags.lonely:
      return 'overview.mood.lonely';
    case MoodTags.melancholic:
      return 'overview.mood.melancholic';
    case MoodTags.nervous:
      return 'overview.mood.nervous';
    case MoodTags.panicked:
      return 'overview.mood.panicked';
    case MoodTags.restless:
      return 'overview.mood.restless';
    case MoodTags.sensitive:
      return 'overview.mood.sensitive';
    case MoodTags.worried:
      return 'overview.mood.worried';
    default:
      return null;
  }
};

const getLocalizedTagIdForStressTag = (tag: string | null) => {
  switch (tag) {
    case StressTags.bored:
      return 'overview.stress.bored';
    case StressTags.creative:
      return 'overview.stress.creative';
    case StressTags.dizzy:
      return 'overview.stress.dizzy';
    case StressTags.energized:
      return 'overview.stress.energized';
    case StressTags.exhausted:
      return 'overview.stress.exhausted';
    case StressTags['good stress']:
      return 'overview.stress.goodStress';
    case StressTags.happy:
      return 'overview.stress.happy';
    case StressTags.inspired:
      return 'overview.stress.inspired';
    case StressTags['over-tired']:
      return 'overview.stress.overTired';
    case StressTags.overwhelmed:
      return 'overview.stress.overwhelmed';
    case StressTags.overworked:
      return 'overview.stress.overworked';
    case StressTags.pressured:
      return 'overview.stress.pressured';
    case StressTags.productive:
      return 'overview.stress.productive';
    case StressTags.relaxed:
      return 'overview.stress.relaxed';
    case StressTags.relieved:
      return 'overview.stress.relieved';
    case StressTags.struggling:
      return 'overview.stress.struggling';
    default:
      return null;
  }
};

const getLocalizedTagIdForPeriodTag = (tag: string | null) => {
  switch (tag) {
    case PeriodTags.PMS:
      return 'overview.period.PMS';
    case PeriodTags['atypical fluid']:
      return 'overview.period.atypicalFluid';
    case PeriodTags.cramps:
      return 'overview.period.cramps';
    case PeriodTags['creamy fluid']:
      return 'overview.period.creamyFluid';
    case PeriodTags['egg-white fluid']:
      return 'overview.period.eggWhiteFluid';
    case PeriodTags.fluid:
      return 'overview.period.fluid';
    case PeriodTags.ovulation:
      return 'overview.period.ovulation';
    case PeriodTags.pain:
      return 'overview.period.pain';
    case PeriodTags.sex:
      return 'overview.period.sex';
    case PeriodTags.spotting:
      return 'overview.period.spotting';
    case PeriodTags['sticky fluid']:
      return 'overview.period.stickyFluid';
    case PeriodTags['strong smell']:
      return 'overview.period.strongSmell';
    case PeriodTags.sweating:
      return 'overview.period.sweating';
    case PeriodTags['tender breasts']:
      return 'overview.period.tenderBreasts';
    default:
      return null;
  }
};

const getLocalizedTagIdForWorkoutTag = (tag: string | null) => {
  switch (tag) {
    case WorkoutTags.HIIT:
      return 'overview.workout.HIIT';
    case WorkoutTags.biking:
      return 'overview.workout.biking';
    case WorkoutTags['body weight workout']:
      return 'overview.workout.bodyWeightWorkout';
    case WorkoutTags.bodybuilding:
      return 'overview.workout.bodybuilding';
    case WorkoutTags.boxing:
      return 'overview.workout.boxing';
    case WorkoutTags.cardio:
      return 'overview.workout.cardio';
    case WorkoutTags.crossfit:
      return 'overview.workout.crossfit';
    case WorkoutTags.dance:
      return 'overview.workout.dance';
    case WorkoutTags.gym:
      return 'overview.workout.gym';
    case WorkoutTags.indoor:
      return 'overview.workout.indoor';
    case WorkoutTags.kickboxing:
      return 'overview.workout.kickboxing';
    case WorkoutTags.long:
      return 'overview.workout.long';
    case WorkoutTags.medium:
      return 'overview.workout.medium';
    case WorkoutTags['no workout']:
      return 'overview.workout.noWorkout';
    case WorkoutTags.outdoor:
      return 'overview.workout.outdoor';
    case WorkoutTags.poledance:
      return 'overview.workout.poledance';
    case WorkoutTags.running:
      return 'overview.workout.running';
    case WorkoutTags.short:
      return 'overview.workout.short';
    case WorkoutTags['short & intense']:
      return 'overview.workout.short&Intense';
    case WorkoutTags.spinning:
      return 'overview.workout.spinning';
    case WorkoutTags.swimming:
      return 'overview.workout.swimming';
    case WorkoutTags['team sports']:
      return 'overview.workout.teamSports';
    case WorkoutTags.walking:
      return 'overview.workout.walking';
    case WorkoutTags.yoga:
      return 'overview.workout.yoga';
    default:
      return null;
  }
};

const getLocalizedTagIdForSkinTag = (tag: string | null) => {
  switch (tag) {
    case SkinTags.acne:
      return 'overview.skin.acne';
    case SkinTags.allergy:
      return 'overview.skin.allergy';
    case SkinTags['big pores']:
      return 'overview.skin.bigPores';
    case SkinTags.clear:
      return 'overview.skin.clear';
    case SkinTags['cold sores']:
      return 'overview.skin.coldSores';
    case SkinTags.dermatitis:
      return 'overview.skin.dermatitis';
    case SkinTags.dry:
      return 'overview.skin.dry';
    case SkinTags.eczema:
      return 'overview.skin.eczema';
    case SkinTags.good:
      return 'overview.skin.good';
    case SkinTags.hives:
      return 'overview.skin.hives';
    case SkinTags.infection:
      return 'overview.skin.infection';
    case SkinTags.itching:
      return 'overview.skin.itching';
    case SkinTags.oily:
      return 'overview.skin.oily';
    case SkinTags.pimples:
      return 'overview.skin.pimples';
    case SkinTags.pustule:
      return 'overview.skin.pustule';
    case SkinTags.rash:
      return 'overview.skin.rash';
    case SkinTags.redness:
      return 'overview.skin.redness';
    case SkinTags.rosacea:
      return 'overview.skin.rosacea';
    case SkinTags.swelling:
      return 'overview.skin.swelling';
    case SkinTags['very dry']:
      return 'overview.skin.veryDry';
    case SkinTags.wart:
      return 'overview.skin.wart';
    default:
      return null;
  }
};

const getLocalizedTagIdForSleepTag = (tag: string | null) => {
  switch (tag) {
    case SleepTags['bad dream/nightmare']:
      return 'overview.sleep.badDreamNightmare';
    case SleepTags['deep sleep']:
      return 'overview.sleep.deepSleep';
    case SleepTags['difficulty falling asleep']:
      return 'overview.sleep.difficultyFallingAsleep';
    case SleepTags['good dream']:
      return 'overview.sleep.goodDream';
    case SleepTags.insomnia:
      return 'overview.sleep.insomnia';
    case SleepTags['neutral dream']:
      return 'overview.sleep.neutralDream';
    case SleepTags['night shift']:
      return 'overview.sleep.nightShift';
    case SleepTags['refreshed after waking up']:
      return 'overview.sleep.refreshedAfterWakingUp';
    case SleepTags['restful sleep']:
      return 'overview.sleep.restfulSleep';
    case SleepTags.restless:
      return 'overview.sleep.restless';
    case SleepTags.sleepwalking:
      return 'overview.sleep.sleepwalking';
    case SleepTags['tired after waking up']:
      return 'overview.sleep.tiredAfterWakingUp';
    case SleepTags.tiring:
      return 'overview.sleep.tiring';
    case SleepTags['toss & turn']:
      return 'overview.sleep.toss&Turn';
    case SleepTags['waking up during sleep']:
      return 'overview.sleep.wakingUpDuringSleep';
    default:
      return null;
  }
};

const getLocalizedTagIdForHeadacheTag = (tag: string | null) => {
  switch (tag) {
    case HeadacheTags['attack-like']:
      return 'overview.headache.attackLike';
    case HeadacheTags['blurred vision']:
      return 'overview.headache.blurredVision';
    case HeadacheTags.burning:
      return 'overview.headache.burning';
    case HeadacheTags['cluster headache']:
      return 'overview.headache.clusterHeadache';
    case HeadacheTags.migraine:
      return 'overview.headache.migraine';
    case HeadacheTags.nausea:
      return 'overview.headache.nausea';
    case HeadacheTags['one sided']:
      return 'overview.headache.oneSided';
    case HeadacheTags['pain from neck']:
      return 'overview.headache.painFromNeck';
    case HeadacheTags['pressure-like']:
      return 'overview.headache.pressureLike';
    case HeadacheTags.pulsing:
      return 'overview.headache.pulsing';
    case HeadacheTags.sharp:
      return 'overview.headache.sharp';
    case HeadacheTags.tension:
      return 'overview.headache.tension';
    default:
      return null;
  }
};

const getLocalizedTagIdForOtherPainTag = (tag: string | null) => {
  switch (tag) {
    case OtherPainTags.back:
      return 'overview.otherpain.bones';
    case OtherPainTags.injury:
      return 'overview.otherpain.injury';
    case OtherPainTags.joint:
      return 'overview.otherpain.joint';
    case OtherPainTags.knee:
      return 'overview.otherpain.knee';
    case OtherPainTags.muscles:
      return 'overview.otherpain.muscles';
    case OtherPainTags.soreness:
      return 'overview.otherpain.soreness';
    default:
      return null;
  }
};

export const getLocalizedTagId = (
  tag: string | null,
  trackingType: TrackingType
) => {
  switch (trackingType) {
    case TrackingTypes.waterType:
      return getLocalizedTagIdForWaterTag(tag);
    case TrackingTypes.stoolType:
      return getLocalizedTagIdForStoolTag(tag);
    case TrackingTypes.tummyPainType:
      return getLocalizedTagIdForPainTag(tag);
    case TrackingTypes.bloatingType:
      return getLocalizedTagIdForBloatingTag(tag);
    case TrackingTypes.moodType:
      return getLocalizedTagIdForMoodTag(tag);
    case TrackingTypes.stressType:
      return getLocalizedTagIdForStressTag(tag);
    case TrackingTypes.periodType:
      return getLocalizedTagIdForPeriodTag(tag);
    case TrackingTypes.skinType:
      return getLocalizedTagIdForSkinTag(tag);
    case TrackingTypes.workoutType:
      return getLocalizedTagIdForWorkoutTag(tag);
    case TrackingTypes.sleepType:
      return getLocalizedTagIdForSleepTag(tag);
    case TrackingTypes.headacheType:
      return getLocalizedTagIdForHeadacheTag(tag);
    case TrackingTypes.otherPainType:
      return getLocalizedTagIdForOtherPainTag(tag);
    default:
      return null;
  }
};
