import { IconDashboard } from '@tabler/icons-react';
const icons = { IconDashboard };

const dashboard = {
  id: 'dashboard',
  title: 'Статистика',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Статистика',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
