import { useTranslation } from 'react-i18next';

export const useLabel = () => {
  const { t } = useTranslation();

  const navbarLabel = [
    {
      id: 1,
      label: t('header.home'),
      route: '/',
    },
    {
      id: 2,
      label: t('header.about'),
      route: '/about',
    },
    {
      id: 3,
      label: t('header.pricing'),
      route: '/pricing',
    },
    {
      id: 4,
      label: t('header.contact'),
      route: '/contact',
    },
  ];

  return navbarLabel;
};
