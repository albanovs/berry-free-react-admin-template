import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProtectedRoute from './ProtectedRoute';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const Otdels = Loadable(lazy(() => import('views/pages/otdely')));
const LeaderPage = Loadable(lazy(() => import('views/pages/otdely/leader')));
const AddLeaderOtchet = Loadable(lazy(() => import('views/pages/otdely/leader/createOtchet')));
const ViewOtchetLeader = Loadable(lazy(() => import('views/pages/otdely/leader/viewOtchet')));
const DetailList = Loadable(lazy(() => import('views/pages/otdely/leader/detailviewOtchet')));
const LibertyPage = Loadable(lazy(() => import('views/pages/otdely/liberty')));
const AddLibertyOtchet = Loadable(lazy(() => import('views/pages/otdely/liberty/createOtchet')));
const ViewOtchetLiberty = Loadable(lazy(() => import('views/pages/otdely/liberty/viewOtchet')));
const DetailListLiberty = Loadable(lazy(() => import('views/pages/otdely/liberty/detailviewOtchet')));
const MonacoPage = Loadable(lazy(() => import('views/pages/otdely/monaco')));
const AddMonacoOtchet = Loadable(lazy(() => import('views/pages/otdely/monaco/createOtchet')));
const ViewOtchetMonaco = Loadable(lazy(() => import('views/pages/otdely/monaco/viewOtchet')));
const DetailListMonaco = Loadable(lazy(() => import('views/pages/otdely/monaco/detailviewOtchet')));
const TuranPage = Loadable(lazy(() => import('views/pages/otdely/turan')));
const AddTuranOtchet = Loadable(lazy(() => import('views/pages/otdely/turan/createOtchet')));
const ViewOtchetTuran = Loadable(lazy(() => import('views/pages/otdely/turan/viewOtchet')));
const DetailListTuran = Loadable(lazy(() => import('views/pages/otdely/turan/detailviewOtchet')));
const Edits = Loadable(lazy(() => import('views/pages/edit')));
const Fulfilments = Loadable(lazy(() => import('views/pages/fulfilments')));
const InstagraSlot = Loadable(lazy(() => import('views/pages/slots/instagramslot')));
const TelegramSlot = Loadable(lazy(() => import('views/pages/slots/telegramslot')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'otdely',
      element: <Otdels />
    },
    {
      path: 'leader',
      element: <ProtectedRoute allowedRoles={['admin', 'leader']} element={<LeaderPage />} />
    },
    {
      path: 'leader-add-otchet',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'leader']} element={<AddLeaderOtchet />} />
      )
    },
    {
      path: 'leader-view-otchet',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'leader']} element={<ViewOtchetLeader />} />
      )
    },
    {
      path: '/detail-list-leader/:id',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'leader']} element={<DetailList />} />
      )
    },
    {
      path: 'liberty',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'liberty']} element={<LibertyPage />} />
      )
    },
    {
      path: 'liberty-add-otchet',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'liberty']} element={<AddLibertyOtchet />} />
      )
    },
    {
      path: 'liberty-view-otchet',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'liberty']} element={<ViewOtchetLiberty />} />
      )
    },
    {
      path: '/detail-list-liberty/:id',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'liberty']} element={<DetailListLiberty />} />
      )
    },
    {
      path: 'monaco',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'monaco']} element={<MonacoPage />} />
      )
    },
    {
      path: 'monaco-add-otchet',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'monaco']} element={<AddMonacoOtchet />} />
      )
    },
    {
      path: 'monaco-view-otchet',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'monaco']} element={<ViewOtchetMonaco />} />
      )
    },
    {
      path: '/detail-list-monaco/:id',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'monaco']} element={<DetailListMonaco />} />
      )
    },
    {
      path: 'turan',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'turan']} element={<TuranPage />} />
      )
    },
    {
      path: 'turan-add-otchet',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'turan']} element={<AddTuranOtchet />} />
      )
    },
    {
      path: 'turan-view-otchet',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'turan']} element={<ViewOtchetTuran />} />
      )
    },
    {
      path: '/detail-list-turan/:id',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'turan']} element={<DetailListTuran />} />
      )
    },
    {
      path: 'edit',
      element: (
        <ProtectedRoute allowedRoles={['admin']} element={<Edits />} />
      )
    },
    {
      path: 'fullfilment',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'manager']} element={<Fulfilments />} />
      )
    },
    {
      path: 'instagramslot',
      element: <InstagraSlot />
    },
    {
      path: 'telegramslot',
      element: <TelegramSlot />
    }
  ],
};

export default MainRoutes;