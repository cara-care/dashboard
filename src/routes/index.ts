import React from 'react';
import { Login, SelectPatient } from '../auth';
import NotFound from './NotFound';

const Dashboard = React.lazy(() => import('../dashboard/Dashboard'));
const Questionnaires = React.lazy(() =>
  import('../questionnaires/pages/Questionnaires')
);
const Questionnaire = React.lazy(() =>
  import('../questionnaires/pages/Questionnaire')
);

export default [
  {
    path: '/export/:token',
    component: Dashboard,
    exact: false,
    authRequired: false,
  },
  {
    path: '/nutri',
    component: Dashboard,
    exact: true,
    authRequired: true,
  },
  {
    path: '/nutri/login',
    component: Login,
    exact: false,
    authRequired: false,
  },
  {
    path: '/nutri/select-patient',
    component: SelectPatient,
    exact: false,
    authRequired: true,
  },
  {
    path: '/nutri/questionnaires',
    component: Questionnaires,
    exact: true,
    authRequired: true,
  },
  {
    path: '/nutri/questionnaires/:id',
    component: Questionnaire,
    exact: false,
    authRequired: true,
  },
  {
    path: undefined,
    component: NotFound,
    exact: false,
    authRequired: false,
  },
];
