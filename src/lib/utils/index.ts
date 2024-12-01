import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Cache } from './cache';
import { measurePerformance, debounce, throttle } from './performance';
import { trackEvent } from './analytics';
import { handleError } from './error';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Export utility functions
export {
  Cache,
  measurePerformance,
  debounce,
  throttle,
  trackEvent,
  handleError
};

// Global error handler
window.onerror = (message, source, lineno, colno, error) => {
  console.error('Global error:', { message, source, lineno, colno, error });
  trackEvent('error', { message, source, lineno, colno });
};

// Performance monitoring
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        trackEvent('performance_lcp', { value: entry.startTime });
      }
    }
  });
  observer.observe({ entryTypes: ['largest-contentful-paint'] });
}