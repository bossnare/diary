import { useNavigate } from 'react-router-dom';
import { useUser } from './use-user';

export const useProfileServices = () => {
  const navigate = useNavigate();
  const { data: user } = useUser();

  const openProfile = () => {
    if (!user) return;
    navigate(`/${user.username}`);
  };

  return { openProfile };
};
