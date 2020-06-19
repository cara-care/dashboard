import React, { useCallback } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps,
} from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Warning from '@material-ui/icons/Warning';
import {
  StyleRules,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import moment from 'moment';
import DoubleDatePicker from './DoubleDatePicker';
import CombinedChart from './CombinedChart';
import ChartCheckboxes from './ChartCheckboxes';
import Spinner from '../../components/Spinner';
import {
  getSymptomsCheckboxes,
  getFactorsCheckboxes,
  getActiveChartTrackingTypes,
  getActiveTimeFilteredDataSets,
} from './redux/chartOverview';
import {
  toggleChartActionCreator,
  updateStartDateActionCreator,
  updateEndDateActionCreator,
} from './redux/chartOverviewActions';
import { RootState, RootActions } from '../../utils/store';
import { ChartTrackingType, ChartFilter } from './chartOverviewUtils';
import { EXPORT_TOKEN_INVALID } from '../../utils/test-helpers';

const styles = (theme: Theme): StyleRules => ({
  chartPaper: {
    position: 'relative',
  },
  loaderWrapper: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  checkboxesRow: {
    marginTop: theme.spacing(),
  },
  errorRoot: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minHeight: 200,
  },
  errorIcon: {
    marginBottom: theme.spacing(),
  },
});

interface StateProps {
  dataReady: boolean;
  invalidToken: boolean;
  dataSets: any[];
  symptomsCheckboxes: ChartFilter[];
  factorsCheckboxes: ChartFilter[];
  startDate: Date;
  endDate: Date;
}
interface DispatchProps {
  toggleChart: (chartTrackingType: ChartTrackingType) => void;
  updateStartDate: (startDate: Date) => void;
  updateEndDate: (endDate: Date) => void;
}

type Props = StateProps &
  DispatchProps &
  WrappedComponentProps &
  WithStyles<typeof styles>;

const ChartOverviewPresenter: React.FC<Props> = ({
  classes,
  intl,
  startDate,
  endDate,
  dataSets,
  dataReady,
  symptomsCheckboxes,
  factorsCheckboxes,
  invalidToken,
  toggleChart,
  updateStartDate,
  updateEndDate,
}) => {
  const onCheckboxClick = useCallback(
    (chartTrackingType: ChartTrackingType) => {
      toggleChart(chartTrackingType);
    },
    [toggleChart]
  );

  const symptomsTitle = intl.formatMessage({
    id: 'overview.chartPicker.symptoms',
    defaultMessage: 'Symptoms',
  });

  const factorsTitle = intl.formatMessage({
    id: 'overview.chartPicker.factors',
    defaultMessage: 'Factors',
  });

  return (
    <>
      <Grid item xs={12}>
        <DoubleDatePicker
          disablePickers={invalidToken}
          startDate={startDate}
          endDate={endDate}
          updateStartDate={updateStartDate}
          updateEndDate={updateEndDate}
        />
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.chartPaper}>
          {invalidToken ? (
            <div
              data-testid={EXPORT_TOKEN_INVALID}
              className={classes.errorRoot}
            >
              <Warning color="error" className={classes.errorIcon} />
              <Typography variant="h6" component="h6">
                <FormattedMessage id="_.common.error" defaultMessage="Error" />
              </Typography>
              <Typography variant="body2">
                <FormattedMessage id="overview.invalidExportToken" />
              </Typography>
            </div>
          ) : (
            <>
              {!dataReady && (
                <div className={classes.loaderWrapper}>
                  <Spinner size={52} />
                </div>
              )}
              <CombinedChart
                displayGrids={dataReady}
                data={dataReady ? dataSets : []}
                startDate={startDate}
                endDate={endDate}
              />
            </>
          )}
        </Paper>
      </Grid>
      <Grid
        container
        spacing={2}
        item
        xs={12}
        className={classes.checkboxesRow}
      >
        <Grid item xs={6}>
          <ChartCheckboxes
            row={true}
            handleClick={onCheckboxClick}
            title={symptomsTitle}
            checkboxes={dataReady ? symptomsCheckboxes : null}
          />
        </Grid>
        <Grid item xs={6}>
          <ChartCheckboxes
            handleClick={onCheckboxClick}
            title={factorsTitle}
            checkboxes={dataReady ? factorsCheckboxes : null}
          />
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    dataReady: !state.chartOverview.isFetching,
    invalidToken: state.chartOverview.invalidToken,
    dataSets: getActiveTimeFilteredDataSets(
      getActiveChartTrackingTypes(state.chartOverview.filters),
      state.chartOverview.dataSets,
      state.chartOverview.startDate,
      moment(state.chartOverview.endDate).add(1, 'd').toDate()
    ),
    symptomsCheckboxes: getSymptomsCheckboxes(state.chartOverview.filters),
    factorsCheckboxes: getFactorsCheckboxes(state.chartOverview.filters),
    startDate: state.chartOverview.startDate,
    endDate: state.chartOverview.endDate,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootActions>): DispatchProps => {
  return {
    toggleChart: (chartTrackingType: ChartTrackingType) => {
      dispatch(toggleChartActionCreator(chartTrackingType));
    },
    updateStartDate: (startDate: Date) => {
      dispatch(updateStartDateActionCreator(startDate));
    },
    updateEndDate: (endDate: Date) => {
      dispatch(updateEndDateActionCreator(endDate));
    },
  };
};

export default connect<StateProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withStyles(styles)(ChartOverviewPresenter)));
