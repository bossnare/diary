import { useInView } from 'motion/react';
import { useRef, type RefObject } from 'react';

export const useReveal = <T extends Element = HTMLElement>(
  options: { once?: boolean; amount?: number } = { once: true, amount: 0.9 }
) => {
  const ref = useRef<T | null>(null);
  const isInView = useInView(ref as unknown as RefObject<Element>, options);
  return { ref, isInView };
};
