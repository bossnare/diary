import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const isSystemDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
  const isDark: Theme = isSystemDark ? 'dark' : 'light'; // get system theme to default

  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) ?? isDark
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isSystemDark);
    localStorage.setItem('theme', theme);
  }, [isSystemDark, theme]);

  return { theme, setTheme };
};
