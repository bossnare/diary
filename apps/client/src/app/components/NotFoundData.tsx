import { Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const NotFoundData = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl w-[90%] mx-auto">
      <div className="flex flex-col items-center w-full gap-4 p-8 mt-20 rounded-3xl bg-muted dark:bg-sidebar">
        <Database className="size-26" />
        <h3 className="text-lg font-bold">Data not found</h3>
        <p className="text-center text-muted-foreground">
          Cannot load this note data or it was deleted. Please try again in a
          moment.
        </p>
        <div className="flex flex-col items-center w-full gap-2 mt-4">
          <Button
            onClick={() => navigate('/app', { replace: true })}
            className="relative overflow-hidden w-full border-2 font-bold rounded-full md:w-1/2 border-foreground!"
            variant="outline"
            size="xl"
          >
            Back to home
            <div className="absolute inset-0 bg-primary/10"></div>
          </Button>
          <Button
            onClick={() => navigate(-1) || navigate('/app', { replace: true })}
            className="w-full font-bold rounded-full md:w-1/3"
            variant="ghost"
            size="xl"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};
