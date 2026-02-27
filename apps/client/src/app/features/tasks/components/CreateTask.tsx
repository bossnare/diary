import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToggle } from '@/shared/hooks/use-toggle';
import { CirclePlus } from 'lucide-react';

export function CreateTask({
  onCreate,
}: {
  onCreate: (form: FormData) => void;
}) {
  const {
    value: isAddTask,
    setTrue: openAddTask,
    setFalse: closeAddTask,
  } = useToggle();

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Tasks</h3>
        <Button
          disabled={isAddTask}
          onClick={openAddTask}
          className="shadow-sm"
        >
          <CirclePlus className="size-4" /> Add task
        </Button>
      </div>

      {/* add task */}
      {isAddTask && (
        <form action={onCreate} className="flex flex-wrap gap-2">
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
    </>
  );
}
