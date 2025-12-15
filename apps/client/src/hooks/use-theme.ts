import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    return saved ?? 'system'; // set system to default
  });

  // get selected theme or system theme
  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme, resolvedTheme]);

  return { theme, setTheme, resolvedTheme };
};
