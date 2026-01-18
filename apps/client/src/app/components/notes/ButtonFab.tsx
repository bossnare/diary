import { useLongPress } from '@/app/hooks/use-long-press';
import { useNoteServices } from '@/app/hooks/use-note-services';
import { Button } from '@/components/ui/button';
import { waitVibrate } from '@/shared/utils/vibration';
import { SquarePen } from 'lucide-react';

export function ButtonFab({ openChoose }: { openChoose?: () => void }) {
  const { openNewNote } = useNoteServices();
  const longPress = useLongPress({
    onLongPress: () => {
      openChoose?.();
      waitVibrate(350, 'low');
    },
  });

  return (
    <Button
      onClick={openNewNote}
      onTouchStart={longPress.handleTouchStart}
      onTouchEnd={longPress.handleTouchEnd}
      onTouchMove={longPress.handleTouchMove}
      onTouchCancel={longPress.handleTouchCancel}
      className="text-white rounded-full shadow-lg size-15 lg:size-14"
    >
      <SquarePen className="size-7 lg:size-6" />
    </Button>
  );
}
