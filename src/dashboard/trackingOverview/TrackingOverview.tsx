import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import Warning from '@material-ui/icons/Warning';
import { v1 } from 'uuid';
import NonFoodTrackingCard from './components/NonFoodTrackingCard';
import FoodTrackingCard from './components/FoodTrackingCard';
import TrackingOverviewHeader from './components/TrackingOverviewHeader';
import { TrackingTypes } from './trackingOverviewUtils';
import { setDate as setDateAction } from './redux/trackingOverviewActions';
import { getTrackingDataPointsByTimeDescendingSorted } from './redux/trackingOverviewSelectors';
import Spinner from '../../components/Spinner';
import { TrackingDataPoint } from '../types';
import { RootState, RootActions } from '../../utils/store';
import { subDays, addDays } from 'date-fns';

const styles = (): StyleRules => ({
  placeholderRow: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '130px',
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: 'center',
    fontSize: '13px',
  },
  scrollY: {
    maxHeight: 'calc(100vh - 200px)',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      height: '6px',
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f4f4f4',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#00b3a5',
    },
  },
});

interface StateProps {
  isFetching: boolean;
  invalidToken: boolean;
  date: Date;
  trackingDataPoints: TrackingDataPoint[];
}

interface DispatchProps {
  setDate: (date: Date) => void;
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

const TrackingOverview: React.FC<Props> = ({
  classes,
  isFetching,
  invalidToken,
  trackingDataPoints,
  date,
  setDate,
}) => {
  const showPreviousDay = () => {
    setDate(subDays(date, 1));
  };

  const showNextDay = () => {
    setDate(addDays(date, 1));
  };

  const updateDate = (date: Date) => {
    setDate(date);
  };

  let body = null;

  if (invalidToken) {
    body = (
      <div className={classes.placeholderRow}>
        <Warning color="error" />
        <Typography variant="h6" component="h6">
          <FormattedMessage id="_.common.error" defaultMessage="Error" />
        </Typography>
        <Typography variant="body2">
          <FormattedMessage id="overview.invalidExportToken" />
        </Typography>
      </div>
    );
  } else if (isFetching) {
    body = (
      <div className={classes.placeholderRow}>
        <Spinner />
      </div>
    );
  } else if (trackingDataPoints.length === 0) {
    body = (
      <div className={classes.placeholderRow}>
        <Typography variant="body2">
          <FormattedMessage id="overview.trackingOverview.noTrackingData" />
        </Typography>
      </div>
    );
  } else {
    body = (
      <div className={classes.scrollY}>
        {trackingDataPoints.map((trackingDataPoint) =>
          trackingDataPoint.type !== TrackingTypes.foodType ? (
            <NonFoodTrackingCard
              key={v1()}
              trackingDataPoint={trackingDataPoint}
            />
          ) : (
            <FoodTrackingCard
              key={v1()}
              trackingDataPoint={trackingDataPoint}
            />
          )
        )}
      </div>
    );
  }

  return (
    <Paper>
      <TrackingOverviewHeader
        handleLeftArrowClick={showPreviousDay}
        handleRightArrowClick={showNextDay}
        updateDate={updateDate}
        currentDate={date}
        disabled={invalidToken}
      />
      {body}
    </Paper>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    isFetching: state.trackingOverview.isFetching,
    invalidToken: state.trackingOverview.invalidToken,
    date: state.trackingOverview.date,
    trackingDataPoints: getTrackingDataPointsByTimeDescendingSorted(state),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<RootActions>
): DispatchProps => ({
  setDate(date: Date) {
    dispatch(setDateAction(date));
  },
});

export default connect<StateProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TrackingOverview));
