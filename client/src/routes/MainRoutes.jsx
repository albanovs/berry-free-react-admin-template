import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const Otdels = Loadable(lazy(() => import('views/pages/otdely')))
const LeaderPage = Loadable(lazy(() => import('views/pages/otdely/leader')))
const Edits = Loadable(lazy(() => import('views/pages/edit')))
const Fulfilments = Loadable(lazy(() => import('views/pages/fulfilments')))
const InstagraSlot = Loadable(lazy(() => import('views/pages/slots/instagramslot')))
const TelegramSlot = Loadable(lazy(() => import('views/pages/slots/telegramslot')))

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
      element: <Otdels />,
    },
    {
      path: 'leader',
      element: <LeaderPage />
    },
    {
      path: 'edit',
      element: <Edits />
    },
    {
      path: 'fullfilment',
      element: <Fulfilments />
    },
    {
      path: 'instagramslot',
      element: <InstagraSlot />
    },
    {
      path: 'telegramslot',
      element: <TelegramSlot />
    }
  ]
};

export default MainRoutes;
