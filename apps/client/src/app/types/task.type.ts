export interface TaskInterface {
  id: string;
  title: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'PENDING';
  updatedAt: string;
  createdAt: string;
}
