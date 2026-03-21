import { useRef, useState } from 'react';

export const useDragDrop = <T extends Element = HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [isDrag, setIsDrag] = useState(false);

  return { isDrag, setIsDrag, ref };
};
