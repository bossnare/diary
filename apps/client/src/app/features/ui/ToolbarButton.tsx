import { Button } from '@/components/ui/button';
import { useButtonSize } from '@/shared/hooks/use-button-size';
import { handleWait } from '@/shared/utils/handle-wait';
import type React from 'react';

export type ActionKey = 'move' | 'delete' | 'pin';

type ActionLabel = {
  label: string;
  icon: React.ElementType;
  key: ActionKey;
};

type Props = React.HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean;
  onAction?: (actionKey: ActionKey) => void;
  labelItems?: ActionLabel[];
};

export function ToolbarButton({ onAction, disabled, labelItems }: Props) {
  const buttonSize = useButtonSize({ mobile: 'lg', landscape: 'default' });

  return (
    <>
      {labelItems?.map((t) => (
        <Button
          key={t.key}
          disabled={disabled}
          onClick={() => {
            handleWait(() => onAction?.(t.key), 200);
          }}
          className="inline-flex gap-1 hover:bg-transparent! active:opacity-50 dark:lg:active:bg-accent/40! lg:active:bg-muted-foreground/40! hover:not-focus:opacity-70 md:gap-2 flex-col md:flex-row"
          size={buttonSize}
          variant="ghost"
        >
          <t.icon className="size-6 md:size-4" />
          <span className="text-xs font-normal md:text-sm">{t.label}</span>
        </Button>
      ))}
    </>
  );
}
