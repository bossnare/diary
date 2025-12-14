import { Search, BellIcon, Layers, Tags } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function NavTab() {
  return (
    <>
      <li>
        <NavLink to="/dashboard">
          {({ isActive }) => (
            <button className="relative flex items-center justify-center w-full gap-2 p-4 font-semibold rounded-full cursor-pointer md:px-2 active:bg-muted text-sidebar-foreground md:rounded-md md:justify-start md:bg-background/50 md:px-3 md:h-9">
              <Layers className="md:size-5" />{' '}
              <span className="hidden md:block">Overview</span>
              {/* underline */}
              {isActive && (
                <span className="absolute w-1/3 h-1.4 rounded-full md:hidden -bottom-1 bg-sidebar-foreground"></span>
              )}
            </button>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">
          <button className="flex items-center w-full gap-2 px-2 font-medium cursor-pointer md:px-3 md:hover:opacity-80 text-foreground/80 h-9">
            <Search className="md:size-5" />{' '}
            <span className="hidden md:block">Search</span>
          </button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">
          <button className="flex items-center w-full gap-2 px-2 font-medium cursor-pointer md:px-3 md:hover:opacity-80 text-foreground/80 h-9">
            <BellIcon className="md:size-5" />{' '}
            <span className="hidden md:block">Notifications</span>
          </button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">
          <button className="flex items-center w-full gap-2 px-2 font-medium cursor-pointer md:px-3 md:hover:opacity-80 text-foreground/80 h-9">
            <Tags className="md:size-5" />{' '}
            <span className="hidden md:block">Tags</span>
          </button>
        </NavLink>
      </li>
    </>
  );
}
