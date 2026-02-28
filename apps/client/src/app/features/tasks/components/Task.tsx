import { useUpdateToggle } from '@/app/hooks/use-task';
import type { TaskInterface } from '@/app/types/task.type';
import { Button } from '@/components/ui/button';
import { Check, Ellipsis, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function Task({ task }: { task: TaskInterface }) {
  const [checked, setChecked] = useState(task.status === 'COMPLETED');
  const updateToggleStatus = useUpdateToggle();

  const handleToggle = () => {
    const newChecked = !checked;

    setChecked((prev) => {
      const next = !prev;

      updateToggleStatus.mutateAsync({
        id: task.id,
        data: { status: newChecked ? 'COMPLETED' : 'PENDING' },
      });

      return next;
    }); // update UI instant
  };

  return (
    <>
      <label
        htmlFor={task.id}
        className="relative flex flex-wrap items-center gap-4 px-4 py-3 transition cursor-pointer select-none group/item hover:bg-primary/16 active:opacity-50"
      >
        <input
          id={task.id}
          checked={checked}
          type="checkbox"
          onChange={handleToggle}
          className="sr-only peer"
        />

        <span className="peer-checked:border-0 border-foreground/70 overflow-hidden shrink-0 border rounded-full active:scale-98 size-[1.3rem] *:size-0 peer-checked:*:size-full peer-checked:*:bg-primary">
          <span className="flex items-center justify-center text-white transition">
            <Check className="size-4 stroke-4" />
          </span>
        </span>
        <span className="peer-checked:line-through peer-checked:text-muted-foreground font-medium truncate flex-1 lg:group-hover/item:max-w-[66%] text-sm">
          {task.title}
        </span>

        <span className="absolute hidden transition scale-0 right-0.5 lg:inline group-hover/item:scale-100">
          <Button size="icon-sm" variant="ghost">
            <Trash2 />
          </Button>
          <Button size="icon-sm" variant="ghost">
            <Ellipsis />
          </Button>
        </span>
      </label>
    </>
  );
}
