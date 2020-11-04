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
import {
  chatReducer,
  rootChatSaga,
  ChatState,
  ChatActions,
  chatInitialState,
} from '../chat';
import { localeReducer, LocaleState, LocaleActions } from '../locale';
import { themeReducer, ThemeState, ThemeActions } from '../theme';

export interface RootState {
  locale: LocaleState;
  auth: AuthState;
  chartOverview: ChartOverviewState;
  trackingOverview: TrackingOverviewState;
  questionnaires: QuestionnairesState;
  chat: ChatState;
  theme: ThemeState;
}

export type RootActions =
  | LocaleActions
  | AuthActions
  | ChartOverviewActions
  | TrackingOverviewActions
  | QuestionnairesActions
  | ChatActions
  | ThemeActions;

export default function configureStore({
  preloadedLocale,
  preloadedTheme,
  preloadedState = {},
}: {
  preloadedLocale: string;
  preloadedTheme: 'dark' | 'light' | undefined | null;
  preloadedState?: Partial<RootState>;
}) {
  const rootReducer = combineReducers<RootState, RootActions>({
    locale: localeReducer,
    auth: authReducer,
    chartOverview,
    trackingOverview: trackingOverviewReducer,
    questionnaires: questionnairesReducer,
    chat: chatReducer,
    theme: themeReducer,
  });

  function* rootSaga() {
    yield all([
      watchSubmissionInitSaga(),
      rootAuthSaga(),
      ChartOverviewSagas.chartOverviewRootSaga(),
      TrackingOverviewSagas.trackingOverviewRootSaga(),
      rootChatSaga(),
    ]);
  }

  // Redux devtools
  const composeEnhancers =
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    process.env.NODE_ENV === 'development'
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const sagaMiddleware = createSagaMiddleware();

  const middlewares: Middleware[] = [sagaMiddleware];

  if (process.env.NODE_ENV === 'development') {
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
      chat: chatInitialState,
      theme: { theme: preloadedTheme },
      ...preloadedState,
    },
    composeEnhancers(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
