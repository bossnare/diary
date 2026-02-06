import page404 from '@/assets/page_404.svg';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { handleWait } from '../utils/handle-wait';

export const NotFound = () => {
  const pathname = location.pathname;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <img
        src={page404}
        alt="404_page_not_found"
        className="size-100 dark:invert"
      />
      <div className="text-center">
        <span className="font-bold">{pathname}</span> is not found !
      </div>
      <Button
        className="font-semibold"
        size="lg"
        onClick={() =>
          handleWait(() => navigate('/app', { replace: true }), 200)
        }
      >
        Return to Dashboard
      </Button>
    </div>
  );
};
