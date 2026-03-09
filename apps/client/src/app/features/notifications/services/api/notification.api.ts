import { fetcher } from '@/app/lib/fetcher';

export const findAll = async () => {
  const res = await fetcher('/notifications');

  return res.data; // {..., data}
};
