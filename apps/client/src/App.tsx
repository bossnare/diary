import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { useEffect } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { AppRoutes } from './routes/router';
import { useIsPublicRoute } from './shared/hooks/useIsPublicRoute';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const isPublicRoute = useIsPublicRoute();

  // enable body scroll on public route (landing, login, signup), disable on /app
  useEffect(() => {
    if (isPublicRoute) {
      document.body.classList.remove('overflow-hidden', 'overscroll-none');
      document.body.classList.add('overscroll-contain', 'overflow-x-hidden');
    } else document.body.classList.add('overflow-hidden', 'overscroll-none');
  }, [isPublicRoute]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
      <Toaster />
      {/* vercel services */}
      <Analytics />
    </QueryClientProvider>
  );
}

export default App;
