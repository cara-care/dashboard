import { RootState } from '../../../utils/store';

export const getTrackingOverviewPage = (state: RootState) =>
  state.trackingOverview.page;

export const getTrackingOverviewDate = (state: RootState) =>
  state.trackingOverview.date;

export const getTrackingDataPointsByTimeDescendingSorted = (
  state: RootState
) => {
  return state.trackingOverview.data.sort(
    (trackingDataPoint1, trackingDataPoint2) => {
      if (
        trackingDataPoint1.timestampTracking >
        trackingDataPoint2.timestampTracking
      ) {
        return 1;
      } else if (
        trackingDataPoint1.timestampTracking <
        trackingDataPoint2.timestampTracking
      ) {
        return -1;
      } else if (trackingDataPoint1.type > trackingDataPoint2.type) {
        return 1;
      } else if (trackingDataPoint1.type < trackingDataPoint2.type) {
        return -1;
      }
      return 0;
    }
  );
};
