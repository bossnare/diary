// import api from '../lib/api';
import { fetcher } from '../lib/fetcher';

export const findAll = async () => {
  const res = await fetcher('tasks');

  return res.data;
};
