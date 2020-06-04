import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
  Middleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import logger from 'redux-logger';
import {
  ChartOverviewState,
  chartOverview,
  chartOverviewInitialState,
} from '../dashboard/chartOverview/redux/chartOverview';
import {
  trackingOverviewReducer,
  TrackingOverviewState,
  trackingOverviewInitalState,
} from '../dashboard/trackingOverview/redux/trackingOverview';
import { ChartOverviewActions } from '../dashboard/chartOverview/redux/chartOverviewActions';
import { TrackingOverviewActions } from '../dashboard/trackingOverview/redux/trackingOverviewActions';
import {
  questionnairesReducer,
  QuestionnairesActions,
  QuestionnairesState,
  watchSubmissionInitSaga,
  questionnairesInitialState,
} from '../questionnaires';
import {
  authReducer,
  rootAuthSaga,
  AuthState,
  AuthActions,
  authInitialState,
} from '../auth';
import * as TrackingOverviewSagas from '../dashboard/trackingOverview/redux/trackingOverviewSagas';
import * as ChartOverviewSagas from '../dashboard/chartOverview/redux/chartSagas';
import { localeReducer, LocaleState, LocaleActions } from '../locale';

export interface RootState {
  locale: LocaleState;
  auth: AuthState;
  chartOverview: ChartOverviewState;
  trackingOverview: TrackingOverviewState;
  questionnaires: QuestionnairesState;
}

export type RootActions =
  | LocaleActions
  | AuthActions
  | ChartOverviewActions
  | TrackingOverviewActions
  | QuestionnairesActions;

export default function configureStore(preloadedLocale: string) {
  const rootReducer = combineReducers<RootState, RootActions>({
    locale: localeReducer,
    auth: authReducer,
    chartOverview,
    trackingOverview: trackingOverviewReducer,
    questionnaires: questionnairesReducer,
  });

  function* rootSaga() {
    yield all([
      watchSubmissionInitSaga(),
      rootAuthSaga(),
      ChartOverviewSagas.chartOverviewRootSaga(),
      TrackingOverviewSagas.trackingOverviewRootSaga(),
    ]);
  }

  // Redux devtools
  const composeEnhancers =
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    process.env.NODE_ENV !== 'production'
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const sagaMiddleware = createSagaMiddleware();

  const middlewares: Middleware[] = [sagaMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  const store = createStore<RootState, RootActions, {}, {}>(
    rootReducer,
    {
      locale: { locale: preloadedLocale },
      auth: authInitialState,
      chartOverview: chartOverviewInitialState,
      questionnaires: questionnairesInitialState,
      trackingOverview: trackingOverviewInitalState,
    },
    composeEnhancers(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
