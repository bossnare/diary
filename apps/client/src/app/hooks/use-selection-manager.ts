import { useQueryToggle } from '@/shared/hooks/use-query-toggle';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type SelectionMode = 'none' | 'single' | 'multiple';
export type useSelectionManagerOptions = {
  initialMode: SelectionMode;
  queryKey?: string;
};

// usage sync by useQueryToggle (query ui driven state)
export function useSelectionManager<T extends string | number = string>(
  options: useSelectionManagerOptions
) {
  const { initialMode = 'none', queryKey } = options;

  const query = useQueryToggle({
    key: queryKey ?? 'selectionMode',
    value: '1',
  });

  const [mode, setMode] = useState<SelectionMode>(initialMode);
  const [selected, setSelected] = useState<Set<T>>(new Set());
  const count = selected.size;

  // auto clear selected when selection mode by quey params isOpen
  useEffect(() => {
    if (!query.isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelected(new Set());
    }
  }, [query.isOpen]);

  const openSelectionMode = useCallback(
    (m: SelectionMode = 'multiple') => {
      setMode(m);
      query.open();
    },
    [query]
  );

  const closeSelection = useCallback(() => {
    setMode('none');
    query.close();
  }, [query]);

  const toggleSelectAll = useCallback(
    (allIds: T[]) => {
      console.log(mode);

      if (mode === 'multiple') {
        setSelected((prev) => {
          const isAllSelected = prev.size === allIds.length;
          if (isAllSelected) {
            return new Set(); // clear all
          }
          return new Set(allIds); // set all
        });
      } else return;
    },
    [mode]
  );

  const toggleSelect = useCallback(
    (id: T) => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (mode === 'single') {
          if (next.has(id)) next.clear();
          else {
            next.clear();
            next.add(id);
          }
        } else {
          // multiple
          if (next.has(id)) next.delete(id);
          else next.add(id);
        }
        return next;
      });
    },
    [mode]
  );

  const clear = useCallback(() => setSelected(new Set()), []);

  const isSelectionMode = query.isOpen && mode !== 'none';
  const selectedArray = useMemo(() => Array.from(selected), [selected]);
  const isHasSelected = useMemo(() => count > 0, [count]);

  return {
    mode,
    setMode,
    count,
    isSelectionMode,
    isHasSelected,
    selected,
    selectedArray,
    openSelectionMode,
    closeSelection,
    toggleSelect,
    toggleSelectAll,
    clear,
  } as const;
}

export type SelectionManager<T extends string | number = string> = ReturnType<
  typeof useSelectionManager<T>
>;
