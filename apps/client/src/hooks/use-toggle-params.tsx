import { useSearchParams } from 'react-router-dom';

type Config = Partial<{
  key: string;
  value: string;
}>;

// Params driven UI/UX state
export const useToggleParams = (config: Config) => {
  const { key, value = '1' } = config;
  const [searchParams, setParams] = useSearchParams();

  if (!key || !value) {
    console.log("useToggleParams isn't work without key, value.");
    return;
  }

  const isOpen = searchParams.get(key) === value;

  const open = () => {
    const p = new URLSearchParams(searchParams);
    p.set(key, value);
    setParams(p, { replace: true });
  };

  const close = () => {
    const p = new URLSearchParams(searchParams);
    p.delete(key);
    setParams(p, { replace: true });
  };

  const toggle = () => {
    if (isOpen) close();
    else open();
  };

  return { isOpen, open, close, toggle };
};
