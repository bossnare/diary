import type { TaskInterface } from '@/app/types/task.type';
import { Task } from './Task';

export const TaskList = ({ tasks }: { tasks: TaskInterface[] }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};
