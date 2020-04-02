import React from 'react';
import configureStore from 'redux-mock-store';
import Warning from '@material-ui/icons/Warning';
import ChartOverview from '../ChartOverview';
import CombinedChart from '../CombinedChart';
import Spinner from '../../../components/Spinner';
import {
  getInitialDataSets,
  getInitialFiltersChartsFilters,
} from '../redux/chartOverview';
import { shallowWithIntl } from '../../../utils/intl-enzyme-test-helper';

const mockStore = configureStore();
const initialState = {
  chartOverview: {
    isFetching: false,
    data: [],
    dataSets: getInitialDataSets(),
    filters: getInitialFiltersChartsFilters(),
    startDate: new Date(),
    endDate: new Date(),
    error: null,
    page: null,
  },
  nutri: {
    isAuthenticated: false,
    isPatientAppUser: false,
  },
};
const store = mockStore(initialState);
describe('<ChartOverview', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowWithIntl(
      <ChartOverview
        // @ts-ignore
        store={store}
      />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  // FIXME: .dive().dive() -> the test depends on the react tree, which might change :(
  it.skip("renders a spinner when data isn't ready", () => {
    expect(wrapper.dive().dive().find(Spinner)).toHaveLength(1);
  });

  it.skip('renders <CombinedChart /> [user dashboard]', () => {
    expect(wrapper.dive().dive().find(CombinedChart)).toHaveLength(1);
  });

  it.skip('renders <CombinedChart /> for app users [nutri dashboard]', () => {
    wrapper.setProps({
      isNutriDashboard: true,
      isAppUser: true,
    });
    expect(wrapper.dive().dive().find(CombinedChart)).toHaveLength(1);
  });

  it.skip('renders warning for non-app users [nutri dashboard]', () => {
    wrapper.setProps({ isNutriDashboard: true });
    expect(wrapper.dive().dive().find(Warning)).toHaveLength(1);
  });
});
