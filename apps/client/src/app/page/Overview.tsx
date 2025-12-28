import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Paragraphe } from '@/shared/components/Paragraphe';
import { X } from 'lucide-react';

function Overview() {
  const { user } = useAuth();
  // const { data: me } = useMe();
  // const notes: NoteInterface[] = me?.data?.notes;

  return (
    <>
      <div className="py-2 space-y-4">
        <div className="relative flex flex-col w-full gap-2 p-4 rounded-lg shadow-xs md:p-3 bg-muted dark:bg-muted/60">
          <h4 className="font-bold">Complete your profile</h4>
          <div className="flex flex-col justify-center gap-3 md:items-center md:flex-row md:justify-between">
            <Paragraphe className="cursor-pointer text-muted-foreground md:text-sm">
              {user?.user_metadata.name.split(' (')[0]} If you know, you know.
              As a social media fan, you maybe know it.
            </Paragraphe>
            <div className="flex justify-end gap-4">
              <Button size="sm" variant="secondary">
                Configure
              </Button>
            </div>
          </div>

          {/* skip */}
          <span className="right-1 top-0.5 absolute">
            <Button size="icon-sm" variant="ghost">
              <X className="" />
            </Button>
          </span>
        </div>

        {/* content */}
        <div className="grid grid-cols-2 md:grid-cols-4 pt-4 gap-3 flex-wrap *:bg-muted dark:*:bg-muted/40  *:rounded-lg *:h-20">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Overview;
