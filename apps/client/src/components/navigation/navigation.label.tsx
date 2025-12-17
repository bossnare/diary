import {
  Archive,
  Bell,
  Layers,
  Settings,
  Tags,
  Trash,
  UserCog,
} from 'lucide-react';

import { MagnifyingGlassIcon } from '@phosphor-icons/react';

const kebabMenuLabel = [
  {
    id: 1,
    label: 'Workspace settings',
    icon: Settings,
  },
  {
    id: 2,
    label: 'Account health',
    icon: UserCog,
  },
  {
    id: 3,
    label: 'Archives',
    icon: Archive,
  },
  {
    id: 4,
    label: 'Trash',
    icon: Trash,
  },
];

const tabLabel = [
  {
    id: 1,
    label: 'Overview',
    icon: Layers,
    route: '/app',
  },
  {
    id: 2,
    label: 'Search',
    icon: MagnifyingGlassIcon,
    route: '/app/search',
  },
  {
    id: 1,
    label: 'Notofications',
    icon: Bell,
    route: '/app/notification',
  },
  {
    id: 1,
    label: 'Tags',
    icon: Tags,
    route: '/app/tags',
  },
];

export { kebabMenuLabel, tabLabel };
