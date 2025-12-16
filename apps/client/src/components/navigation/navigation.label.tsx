import {
  Settings,
  UserCog,
  Trash,
  Archive,
  Bell,
  Layers,
  Search,
  Tags,
} from 'lucide-react';

const miniNavLabel = [
  {
    id: 1,
    label: 'Worksape settings',
    icon: Settings,
  },
  {
    id: 2,
    label: 'Account health',
    icon: UserCog,
  },
  {
    id: 1,
    label: 'Archives',
    icon: Archive,
  },
  {
    id: 1,
    label: 'Trash',
    icon: Trash,
  },
];

const tabLabel = [
  {
    id: 1,
    label: 'Overview',
    icon: Layers,
    route: '/dashboard',
  },
  {
    id: 2,
    label: 'Search',
    icon: Search,
    route: '/dashboard/search',
  },
  {
    id: 1,
    label: 'Notofications',
    icon: Bell,
    route: '/dashboard/notification',
  },
  {
    id: 1,
    label: 'Tags',
    icon: Tags,
    route: '/dashboard/tags',
  },
];

export { miniNavLabel, tabLabel };
