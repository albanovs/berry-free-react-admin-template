import { IconKey } from '@tabler/icons-react';
const icons = {
  IconKey
};

const pages = {
  id: 'pages',
  title: 'Слоты',
  type: 'group',
  children: [
    {
      id: 'instagramslot',
      url: '/instagramslot',
      title: 'Инстаграм слоты',
      type: 'item',
      icon: icons.IconKey,
    },
    {
      id: 'telegramslot',
      url: '/telegramslot',
      title: 'Телеграм слоты',
      type: 'item',
      icon: icons.IconKey,
    },
  ]
};

export default pages;
