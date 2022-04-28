import React from 'react';
import {
  Login,
  SelectPatient,
  ForgotPassword,
  ResetPassword,
  ChangePassword,
} from '../auth';
import NotFound from './NotFound';

const Dashboard = React.lazy(() => import('../dashboard/Dashboard'));
const RevokeAccess = React.lazy(() => import('../users/RevokeAccess'));
const UserQrCode = React.lazy(() => import('../users/UserQrCode'));
const Questionnaires = React.lazy(() =>
  import('../questionnaires/pages/Questionnaires')
);
const Questionnaire = React.lazy(() =>
  import('../questionnaires/pages/Questionnaire')
);
const Programs = React.lazy(() => import('../programs/pages/Programs'));
const Inbox = React.lazy(() => import('../chat/pages/Inbox'));

const routes = [
  {
    path: '/export/:token',
    component: Dashboard,
    exact: false,
    authRequired: false,
  },
  {
    path: '/nutri',
    component: Login,
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
    path: '/nutri/forgot-password',
    component: ForgotPassword,
    exact: false,
    authRequired: false,
  },
  {
    path: '/nutri/reset-password',
    component: ResetPassword,
    exact: false,
    authRequired: false,
  },
  {
    path: '/nutri/change-password',
    component: ChangePassword,
    exact: false,
    authRequired: false,
  },
  {
    path: '/nutri/select-patient',
    component: SelectPatient,
    exact: false,
    authRequired: false,
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
    path: '/nutri/programs',
    component: Programs,
    exact: false,
    authRequired: true,
  },
  {
    path: '/nutri/dashboard',
    component: Dashboard,
    exact: false,
    authRequired: true,
  },
  {
    path: '/nutri/revoke-access',
    component: RevokeAccess,
    exact: false,
    authRequired: true,
  },
  {
    path: '/nutri/user-qr-code',
    component: UserQrCode,
    exact: false,
    authRequired: true,
  },
  {
    path: '/nutri/inbox/:inboxSlug/:roomId?',
    component: Inbox,
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

export default routes;
