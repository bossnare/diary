export interface TaskInterface {
  id: string;
  title: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'PENDING';
  updatedAt: string;
  createdAt: string;
}

export type Create = Pick<TaskInterface, 'title'>;

export type UpdateToggle = Pick<TaskInterface, 'status'>;
