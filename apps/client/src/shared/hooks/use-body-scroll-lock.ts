import { useEffect } from 'react';

export const useBodyScrollLock = (enabled: boolean) => {
  useEffect(() => {
    const body = document.body;
    const enableAdded = ['overscroll-contain', 'overflow-x-hidden'];
    const disableAdded = ['overflow-hidden', 'overscroll-none'];

    if (enabled) {
      body.classList.remove(...disableAdded);
      body.classList.add(...enableAdded);
    } else {
      body.classList.remove(...enableAdded);
      body.classList.add(...disableAdded);
    }

    // cleanup on normal state
    return () => body.classList.remove(...enableAdded, ...disableAdded);
  }, [enabled]);
};
