import { useId } from 'react';
import { SearchIcon } from 'lucide-react';

export function Search() {
  const inputId = useId();

  return (
    <div className="px-3 pt-8 space-y-4 md:px-6">
      <div className="flex h-12 px-2 rounded-md bg-input dark:bg-secondary gap-2 md:hidden md:w-[50%] lg:w-[36%] items-center shrink-0">
        <label htmlFor={inputId}>
          <SearchIcon className="text-muted-foreground size-5 dark:text-secondary-foreground" />
        </label>
        <input
          id={inputId}
          type="text"
          spellCheck={false}
          name="current-search"
          className="focus:outline-none h-full pl-0.5 text-foreground/90 dark:text-secondary-foreground grow dark:caret-secondary-foreground placeholder:text-sm dark:placeholder:text-secondary-foreground placeholder:text-muted-foreground"
          placeholder="Search your notes, workspaces, ..."
        />
      </div>

      <div>Nothing search history yet</div>
    </div>
  );
}
