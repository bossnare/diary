import { useTask } from '@/app/hooks/use-task';
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

  const { data, isError, isPending, refetch } = useTask();
  const tasks = data ?? [];

  const addTaskAction = () => {
    return;
  };

  const resolveStatus = () => {
    if (isPending) return 'isPending';
    if (isError) return 'isError';
    if (tasks.length <= 0) return 'isEmpty';

    return 'data';
  };

  const renderData = {
    isPending: (
      <div className="flex items-center justify-center size-full">
        <Spinner />
      </div>
    ),
    isError: (
      <div className="flex flex-col items-center justify-center size-full">
        An error occured. Please try again.
        <Button onClick={async () => refetch()}>Try again</Button>
      </div>
    ),
    isEmpty: (
      <div className="flex items-center justify-center px-6 text-muted-foreground">
        Task is empty, start create a task now.
      </div>
    ),
    data: (
      <ul className="flex flex-col">
        {tasks.map((task) => (
          <li key={task.id}>
            <label
              htmlFor="task"
              className="flex items-center gap-4 px-4 py-3 transition cursor-pointer select-none hover:bg-primary/16 active:opacity-50"
            >
              <span className="overflow-hidden border rounded-sm active:scale-98 size-[1.3rem] border-border">
                <span className="flex items-center justify-center text-white size-full bg-primary">
                  <Check className="size-4" />
                </span>
              </span>
              <span className="font-medium">{task.title}</span>
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
          onClick={openAddTask}
          className="bg-primary/30 hover:bg-primary/20! shadow-sm hover:text-foreground/80! text-foreground"
        >
          <Plus className="size-4" /> Add task
        </Button>
      </div>

      {/* add task */}
      {isAddTask && (
        <form action={addTaskAction} className="flex flex-wrap gap-2">
          <Input
            type="text"
            name="newTask"
            placeholder="Try write task name/title ..."
            className="mx-1"
          />
          <div className="flex justify-end flex-1 gap-2">
            <Button>Create</Button>
            <Button variant="outline" onClick={closeAddTask}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <ScrollArea className="overflow-hidden shadow-xs group h-50 rounded-xl bg-background">
        {renderData[resolveStatus()]}

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
