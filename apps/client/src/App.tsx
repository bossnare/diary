import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { useAuth } from './hooks/use-auth';
import { AppRoutes } from './routes/Routes';

function App() {
  const queryClient = new QueryClient();
  const { pending } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      {pending ? (
        // is pending auth
        <div className="inset-0 flex items-center justify-center px-4 min-h-dvh z-100">
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
            <span className="rounded-full size-8 md:size-6 border-3 border-foreground border-t-muted animate-spin"></span>
            <span className="text-lg font-semibold tracking-tighter">
              Authentication...
            </span>
          </div>
        </div>
      ) : (
        <AppRoutes />
      )}

      {/* vercel services */}
      <Analytics />
    </QueryClientProvider>
  );
}

export default App;
