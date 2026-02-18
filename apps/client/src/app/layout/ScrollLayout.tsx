import { ScrollArea } from '@/components/ui/scroll-area';

export const Scrolllayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollArea className="h-[calc(100dvh-120px)] md:h-[calc(100dvh-56px)]">
      {children}{' '}
    </ScrollArea>
  );
};
