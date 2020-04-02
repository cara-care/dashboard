import { getSymptomScoresPerDay } from '../getSymptomScore';
import trackingData from './trackingData.test.json';

const mapTrackingDataToDataPointsResponse = (td: any) => ({
  ...td,
  type: td.trackingType,
  timestampTracking: td.timestamptracking,
  timestampEntry: td.timestampentry,
});

describe('getSymptomScore', () => {
  it('gives same result as django ', () => {
    const symptomScore = getSymptomScoresPerDay(
      trackingData.map(mapTrackingDataToDataPointsResponse)
    );
    expect(symptomScore).toEqual({
      '2019-11-12': 80,
      '2019-11-13': 70,
      '2019-11-14': 70,
      '2019-11-15': 70,
      '2019-11-16': 70,
      '2019-11-17': 70,
    });
  });
});
