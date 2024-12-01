import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProtectedRoute from './ProtectedRoute';
import ProtectedRouteGlobal from './globalProtected';
import SimCardLeader from 'views/pages/edit/manager_sim/leader';
import SimCardMonaco from 'views/pages/edit/manager_sim/monaco';
import SimCardIlyas from 'views/pages/edit/manager_sim/ilyas';
import SimCardLiberty from 'views/pages/edit/manager_sim/liberty';
import SimCardTuran from 'views/pages/edit/manager_sim/turan';
import SimCardLeaderAdmin from 'views/pages/edit/admin_sim/leader';
import SimCardMonacoAdmin from 'views/pages/edit/admin_sim/monaco';
import SimCardIlyasAdmin from 'views/pages/edit/admin_sim/ilyas';
import SimCardLibertyAdmin from 'views/pages/edit/admin_sim/liberty';
import SimCardTuranAdmin from 'views/pages/edit/admin_sim/turan';
import SimcardLogistAndAdmin from 'views/pages/edit/adminlogist_sim/adminlogist';
import IlyasPage from 'views/pages/otdely/ilyas';
import AddIlyasOtchet from 'views/pages/otdely/ilyas/createOtchet';
import ViewOtchetIlyas from 'views/pages/otdely/ilyas/viewOtchet';
import DetailListIlyas from 'views/pages/otdely/ilyas/detailviewOtchet';

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
      element: <ProtectedRouteGlobal element={<DashboardDefault />} />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <ProtectedRouteGlobal element={<DashboardDefault />} />
        }
      ]
    },
    {
      path: 'otdely',
      element: <ProtectedRouteGlobal element={<Otdels />} />
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
      path: 'detail-list-leader/:id',
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
      path: 'detail-list-liberty/:id',
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
      path: 'detail-list-monaco/:id',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'monaco']} element={<DetailListMonaco />} />
      )
    },
    {
      path: 'ilyas',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'ilyas']} element={<IlyasPage />} />
      )
    },
    {
      path: 'ilyas-add-otchet',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'ilyas']} element={<AddIlyasOtchet />} />
      )
    },
    {
      path: 'ilyas-view-otchet',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'ilyas']} element={<ViewOtchetIlyas />} />
      )
    },
    {
      path: 'detail-list-ilyas/:id',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'ilyas']} element={<DetailListIlyas />} />
      )
    },
    {
      path: 'edit/admin-logist',
      element: <ProtectedRoute allowedRoles={['admin', 'admin.sim']} element={<SimcardLogistAndAdmin />} />
    },
    {
      path: 'edit',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'admin.sim']} element={<Edits />} />
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
      element: <ProtectedRouteGlobal element={<InstagraSlot />} />
    },
    {
      path: 'telegramslot',
      element: <ProtectedRouteGlobal element={<TelegramSlot />} />
    },
    {
      path: 'edit/leader-simcard',
      element: <ProtectedRoute allowedRoles={['admin', 'admin.sim']} element={<SimCardLeader />} />
    },
    {
      path: 'edit/monaco-simcard',
      element: <ProtectedRoute allowedRoles={['admin', 'admin.sim']} element={<SimCardMonaco />} />
    },
    {
      path: 'edit/ilyas-simcard',
      element: <ProtectedRoute allowedRoles={['admin', 'admin.sim']} element={<SimCardIlyas />} />
    },
    {
      path: 'edit/liberty-simcard',
      element: <ProtectedRoute allowedRoles={['admin', 'admin.sim']} element={<SimCardLiberty />} />
    },
    {
      path: 'edit/turan-simcard',
      element: <ProtectedRoute allowedRoles={['admin', 'admin.sim']} element={<SimCardTuran />} />
    },


    {
      path: 'edit/leader-simcard-admin',
      element: <ProtectedRoute allowedRoles={['admin', 'admin.sim']} element={<SimCardLeaderAdmin />} />
    },
    {
      path: 'edit/monaco-simcard-admin',
      element: <ProtectedRoute allowedRoles={['admin', 'admin.sim']} element={<SimCardMonacoAdmin />} />
    },
    {
      path: 'edit/ilyas-simcard-admin',
      element: <ProtectedRoute allowedRoles={['admin', 'admin.sim']} element={<SimCardIlyasAdmin />} />
    },
    {
      path: 'edit/liberty-simcard-admin',
      element: <ProtectedRoute allowedRoles={['admin', 'admin.sim']} element={<SimCardLibertyAdmin />} />
    },
    {
      path: 'edit/turan-simcard-admin',
      element: <ProtectedRoute allowedRoles={['admin', 'admin.sim']} element={<SimCardTuranAdmin />} />
    },
    {
      path: 'edit/admin-logist',
      element: <ProtectedRoute allowedRoles={['admin', 'admin.sim']} element={<SimcardLogistAndAdmin />} />
    },
  ],
};

export default MainRoutes;