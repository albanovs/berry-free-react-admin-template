import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';

const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

const utilities = {
  id: 'utilities',
  type: 'group',
  children: [
    {
      id: 'fullfilment',
      title: 'Фулфилмент',
      type: 'item',
      url: '/fullfilment',
      icon: icons.IconPalette,
    },
    {
      id: 'otdely',
      title: 'Отделы',
      type: 'item',
      url: '/otdely',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'edit',
      title: 'Редактор',
      type: 'item',
      url: '/edit',
      icon: icons.IconShadow,
    }
  ]
};

export default utilities;
