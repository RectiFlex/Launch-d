import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig, queryClient } from './lib/web3';
import { AIProvider } from './lib/ai/AIProvider';
import { ErrorBoundary } from './lib/utils/errorBoundary';
import AppRoutes from './routes';
import LoadingScreen from './components/LoadingScreen';

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <AIProvider>
            <Router>
              <Suspense fallback={<LoadingScreen />}>
                <AppRoutes />
              </Suspense>
            </Router>
          </AIProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;