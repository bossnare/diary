type Props = {
  children: React.ReactNode;
};

export const SideBarTabWrapper = ({ children }: Props) => {
  return (
    <button className="flex items-center justify-start w-full gap-3 px-2 rounded-sm text-sidebar-foreground/80 lg:hover:text-sidebar-foreground active:text-sidebar-foreground h-9 lg:hover:bg-muted active:bg-muted lg:active:text-sidebar-foreground/70">
      {children}
    </button>
  );
};
