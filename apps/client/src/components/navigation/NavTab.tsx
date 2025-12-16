import { NavLink } from 'react-router-dom';
import { tabLabel } from './navigation.label';
import { Tab } from './Tab';

export function NavTab() {
  return (
    <>
      {tabLabel.map((t) => (
        <li key={t.id}>
          <NavLink to={t.route} end={t.route === '/dashboard'}>
            {({ isActive }) => (
              <Tab isActive={isActive} Icon={t.icon} label={t.label} />
            )}
          </NavLink>
        </li>
      ))}
    </>
  );
}
