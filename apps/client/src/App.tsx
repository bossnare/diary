import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoutes } from './Routes';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />

      {/* vercel services */}
      <Analytics />
    </QueryClientProvider>
  );
}

export default App;
