import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TrackingOverview from './trackingOverview/TrackingOverview';
import ChartOverview from './chartOverview/ChartOverview';
import Container from '../components/Container';
import NutriNavigation from '../components/NutriNavigation';
import { hasPatientId } from '../auth';
import { fetchTrackingDataInit } from './trackingOverview/redux/trackingOverviewActions';
import { fetchChartDataInit } from './chartOverview/redux/chartOverviewActions';
import api from '../utils/api';
import CheckPatientWrapper from '../components/IsPatientWrapper';

const useStyles = makeStyles({
  trackingOverview: {
    marginTop: 64,
  },
});

const Dashboard: React.FC<RouteComponentProps<{
  token?: string;
}>> = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { token } = match.params;
  const isPatientSelected = useSelector(hasPatientId);
  const fetchTrackingData = useCallback(() => {
    dispatch(fetchTrackingDataInit());
  }, [dispatch]);
  const fetchChartData = useCallback(() => {
    dispatch(fetchChartDataInit());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      api.defaults.headers['X-Token'] = token;
    } else {
      delete api.defaults.headers['X-Token'];
    }
    fetchTrackingData();
    fetchChartData();
  }, [token, fetchTrackingData, fetchChartData, isPatientSelected]);

  return (
    <CheckPatientWrapper route="/nutri/dashboard">
      <NutriNavigation />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <ChartOverview />
          </Grid>
          <Grid item xs={12} md={4} className={classes.trackingOverview}>
            <TrackingOverview />
          </Grid>
        </Grid>
      </Container>
    </CheckPatientWrapper>
  );
};

export default Dashboard;
