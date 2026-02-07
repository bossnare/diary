import { cn } from '@/app/lib/utils';
import { IconCheck } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';

export const SortingButton = () => {
  const sortingLabel = [
    { id: 1, label: 'recently edited', sort: 'updatedAt', order: 'desc' },
    { id: 3, label: 'date created', sort: 'createdAt', order: 'desc' },
    { id: 2, label: 'title', sort: 'title', order: 'asc' },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const activeSort = searchParams.get('sort') ?? 'updatedAt';

  const setOrder = (next: Record<string, string>) => {
    setSearchParams(
      (prev) => ({
        ...Object.fromEntries(prev),
        ...next,
      }),
      {
        replace: true,
      }
    );
  };

  return (
    <>
      {sortingLabel.map((l) => (
        <button
          onClick={() =>
            setOrder({
              sort: `${l.sort}`,
              order: `${l.order}`,
              sorting: 'undefined',
            })
          }
          className={cn(
            activeSort === l.sort ? 'text-chart-2' : '',
            'flex items-center justify-between w-full p-4 px-6 md:p-2 cursor-pointer active:bg-muted-foreground/30'
          )}
        >
          <span className="text-lg md:text-sm font-medium">By {l.label}</span>

          {activeSort === l.sort && (
            <span>
              <IconCheck className="stroke-4 md:size-4" />
            </span>
          )}
        </button>
      ))}
    </>
  );
};
