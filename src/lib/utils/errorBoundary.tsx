import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import Button from '../components/ui/Button';
import { AlertTriangle } from 'lucide-react';

function ErrorFallback({ error, resetErrorBoundary }: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="max-w-md w-full bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20">
        <div className="flex items-center justify-center mb-4">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-center mb-4">Something went wrong</h2>
        <pre className="text-sm bg-black/30 p-4 rounded-lg overflow-auto mb-4">
          {error.message}
        </pre>
        <Button
          variant="primary"
          onClick={resetErrorBoundary}
          className="w-full"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.href = '/';
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}