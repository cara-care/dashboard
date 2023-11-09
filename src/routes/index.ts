import React from 'react';
import {
  Login,
  SelectPatient,
  ForgotPassword,
  ResetPassword,
  ChangePassword,
} from '../auth';
import PrescriptionEpostService from '../epost/PrescriptionEpostService';
import NotFound from './NotFound';
import Upload from '../epost/Upload';
import Review from '../epost/Review';
import Track from '../epost/Track';

const AnalyticsHome = React.lazy(() => import('../analytics/AnalyticsHome'));
const Chat = React.lazy(() => import('../chat/pages/Chat'));
const Dashboard = React.lazy(() => import('../dashboard/Dashboard'));
const HomeDashboard = React.lazy(() => import('../home/HomeDashboard'));
const Programs = React.lazy(() => import('../programs/pages/Programs'));
const ProfileSettings = React.lazy(() =>
  import('../components/ProfileSettings')
);
const Questionnaires = React.lazy(() =>
  import('../questionnaires/pages/Questionnaires')
);
const Questionnaire = React.lazy(() =>
  import('../questionnaires/pages/Questionnaire')
);
const RevokeAccess = React.lazy(() => import('../users/RevokeAccess'));
const UserQrCode = React.lazy(() => import('../users/UserQrCode'));

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
    path: '/nutri/analytics',
    component: AnalyticsHome,
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
    path: '/nutri/profile-settings',
    component: ProfileSettings,
    exact: true,
    authRequired: true,
  },
  {
    path: '/nutri/change-password',
    component: ChangePassword,
    exact: true,
    authRequired: true,
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
    path: '/nutri/home',
    component: HomeDashboard,
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
    path: '/nutri/epost-prescription',
    component: PrescriptionEpostService,
    exact: true,
    authRequired: true,
  },
  {
    path: '/nutri/epost-prescription/upload',
    component: Upload,
    exact: true,
    authRequired: true,
  },
  {
    path: '/nutri/epost-prescription/review',
    component: Review,
    exact: true,
    authRequired: true,
  },
  {
    path: '/nutri/epost-prescription/track',
    component: Track,
    exact: true,
    authRequired: true,
  },
  {
    path: '/nutri/inbox/:inboxSlug/:roomId?',
    component: Chat,
    exact: false,
    authRequired: false,
  },
  {
    path: undefined,
    component: NotFound,
    exact: false,
    authRequired: false,
  },
];

export default routes;
