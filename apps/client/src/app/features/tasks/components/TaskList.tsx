import { useTask, useCreateTask } from '@/app/hooks/use-task';
import { cn } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Spinner } from '@/shared/components/Spinner';
import { useToggle } from '@/shared/hooks/use-toggle';
import { Plus, Check, Maximize2 } from 'lucide-react';

export const TaskList = () => {
  const {
    value: isAddTask,
    setTrue: openAddTask,
    setFalse: closeAddTask,
  } = useToggle();

  const createTask = useCreateTask();

  const { data, isError, isPending, refetch } = useTask();
  const tasks = data ?? [];

  const completedTasks = tasks.filter((t) => t.status === 'COMPLETED');
  const pendingTasks = tasks.filter((t) => t.status === 'PENDING');
  const inProgressTasks = tasks.filter((t) => t.status === 'IN_PROGRESS');

  const handleCreateTask = (form: FormData) => {
    const task = form.get('newTask') as string;

    const body = {
      title: task,
    };

    if (!task || !task.trim()) return;

    createTask.mutateAsync(body);
  };

  const resolveStatus = () => {
    if (isPending) return 'isPending';
    if (isError) return 'isError';
    if (tasks.length <= 0) return 'isEmpty';

    return 'data';
  };

  const renderUIState = {
    isPending: (
      <div className="flex items-center justify-center pt-10 size-full">
        <Spinner size="sm" />
      </div>
    ),
    isError: (
      <div className="flex flex-col items-center justify-center gap-3 pt-10 size-full">
        <span className="block text-center">
          An error occured. Please try again.
        </span>
        <Button onClick={async () => refetch()}>Try again</Button>
      </div>
    ),
    isEmpty: (
      <div className="items-center justify-center px-6 pt-10 text-muted-foreground">
        <span className="block text-center">
          Task empty, start to create a task now.
        </span>
      </div>
    ),
    data: (
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label
              htmlFor="task"
              className="flex flex-wrap items-center gap-4 px-4 py-3 transition cursor-pointer select-none hover:bg-primary/16 active:opacity-50"
            >
              <span
                className={cn(
                  task.status === 'COMPLETED'
                    ? 'border-primary'
                    : 'border-foreground/70',
                  'overflow-hidden shrink-0 border rounded-full active:scale-98 size-[1.4rem]'
                )}
              >
                <span
                  className={cn(
                    task.status !== 'COMPLETED' ? 'size-0' : 'size-full',
                    'flex items-center justify-center text-white transition bg-primary'
                  )}
                >
                  <Check className="size-4 stroke-4" />
                </span>
              </span>
              <span
                className={cn(
                  task.status === 'COMPLETED'
                    ? 'line-through text-muted-foreground'
                    : '',
                  'font-medium truncate flex-1'
                )}
              >
                {task.title}
              </span>
            </label>
            <input id="task" hidden type="checkbox" name="task" value="task" />
          </li>
        ))}
      </ul>
    ),
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Task</h3>
        <Button
          disabled={isAddTask}
          onClick={openAddTask}
          className="bg-primary/30 hover:bg-primary/20! shadow-sm hover:text-foreground/80! text-foreground"
        >
          <Plus className="size-4" /> Add task
        </Button>
      </div>

      {/* add task */}
      {isAddTask && (
        <form action={handleCreateTask} className="flex flex-wrap gap-2">
          <Input
            type="text"
            name="newTask"
            placeholder="Try write task name/title ..."
            className="mx-1 focus:bg-background! focus-visible:border-primary! focus-visible:ring-primary/50"
          />
          <div className="flex justify-end flex-1 gap-2">
            <Button type="button" variant="outline" onClick={closeAddTask}>
              Cancel
            </Button>
            <Button>Create</Button>
          </div>
        </form>
      )}

      <ScrollArea className="overflow-hidden shadow-xs group h-60 rounded-xl bg-background">
        {renderUIState[resolveStatus()]}

        <div className="absolute transition scale-0 right-1 top-1 group-hover:scale-100">
          <Button size="icon" variant="ghost">
            <Maximize2 />
          </Button>
        </div>
        {/* fade out */}
        <div className="absolute inset-x-0 bottom-0 h-10 transition opacity-0 pointer-events-none group-hover:opacity-100 bg-linear-to-b from-transparent to-foreground/10"></div>
      </ScrollArea>
    </div>
  );
};
