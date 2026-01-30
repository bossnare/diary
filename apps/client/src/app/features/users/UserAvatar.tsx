import { cn } from '@/app/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/app/utils/get-name.strings';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';
import type { UserInterface } from '@/app/types/user.type';

export const UserAvatar = ({
  user,
  fallback,
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  fallback?: string;
  user?: UserInterface | null;
}) => {
  const username = getInitials(user?.displayName.split('(')[0]);

  return (
    <Avatar {...props} className={cn('size-10 shrink-0', className)}>
      <AvatarImage
        loading="lazy"
        alt="user_avatar"
        src={user?.avatarUrl}
      ></AvatarImage>
      <AvatarFallback className="font-bold">
        {getInitials(fallback) || username || 'U'}
      </AvatarFallback>
    </Avatar>
  );
};
