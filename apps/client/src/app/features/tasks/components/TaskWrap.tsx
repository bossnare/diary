import { useCreateTask, useTask } from '@/app/hooks/use-task';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Spinner } from '@/shared/components/Spinner';
import { Maximize2 } from 'lucide-react';
import { CreateTask } from './CreateTask';
import { TaskList } from './TaskList';
import { toast } from 'sonner';

export const TaskWrap = () => {
  const createTask = useCreateTask();

  const { data, isError, isPending, refetch } = useTask();
  const tasks = data ?? [];

  const completedTasks = tasks.filter((t) => t.status === 'COMPLETED');
  const pendingTasks = tasks.filter((t) => t.status === 'PENDING');
  // const inProgressTasks = tasks.filter((t) => t.status === 'IN_PROGRESS');

  const handleCreateTask = (form: FormData) => {
    const task = form.get('newTask') as string;

    const body = {
      title: task,
    };

    if (!task || !task.trim()) return;

    try {
      createTask.mutateAsync(body);
    } catch {
      toast.error('Error when creating a task');
    }
  };

  const resolveStatus = () => {
    if (isPending) return 'isPending';
    if (isError) return 'isError';
    if (tasks.length <= 0) return 'isEmpty';

    return 'data';
  };

  const renderUIState = {
    isPending: (
      <div className="flex items-center justify-center h-56 rounded-xl bg-background size-full">
        <Spinner size="sm" />
      </div>
    ),
    isError: (
      <div className="flex flex-col items-center justify-center h-56 gap-3 rounded-xl bg-background size-full">
        <span className="block text-center lg:text-sm">
          An error occured. Please try again.
        </span>
        <Button onClick={async () => refetch()}>Try again</Button>
      </div>
    ),
    isEmpty: (
      <div className="items-center justify-center h-56 px-6 rounded-xl bg-background text-muted-foreground">
        <span className="block text-center lg:text-sm">
          Task empty, start to create a task now.
        </span>
      </div>
    ),
    data: null,
  };

  return (
    <div className="space-y-3">
      <CreateTask onCreate={handleCreateTask} />

      <Tabs defaultValue="all">
        <TabsList variant="line" className="w-full group">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          {/* maximize - minimize button */}
          <div className="transition scale-0 group-hover:scale-100">
            <Button size="icon" variant="ghost">
              <Maximize2 />
            </Button>
          </div>
        </TabsList>

        {resolveStatus() !== 'data' ? (
          <div>{renderUIState[resolveStatus()]}</div>
        ) : (
          <ScrollArea className="h-56 overflow-hidden shadow-xs group rounded-xl bg-background">
            <TabsContent value="all">
              <TaskList tasks={tasks} />
            </TabsContent>
            <TabsContent value="pending">
              <TaskList tasks={pendingTasks} />
            </TabsContent>
            <TabsContent value="completed">
              <TaskList tasks={completedTasks} />
            </TabsContent>
            {/* fade out */}
            <div className="absolute inset-x-0 bottom-0 h-10 transition opacity-0 pointer-events-none group-hover:opacity-100 bg-linear-to-b from-transparent to-foreground/10"></div>
          </ScrollArea>
        )}
      </Tabs>
    </div>
  );
};
