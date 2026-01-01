import { useLocation } from 'react-router-dom';

export const usePathname = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const getCleanPathname = () => {
    const segments = location.pathname.split('/').filter(Boolean);
    return segments[0];
  };

  const cleanPathname = getCleanPathname();

  return { cleanPathname, pathname };
};
