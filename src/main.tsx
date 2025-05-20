
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ErrorBoundary } from './components/ui/error-boundary';
import { Toaster, toast } from 'sonner';
import ErrorFallback from './components/error/ErrorFallback';

// Function to log detailed error information with structured output
const logDetailedError = (error: Error | unknown, source: string = "unknown") => {
  console.group(`Error in ${source}`);
  
  if (error instanceof Error) {
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    
    // Check for common issues
    if (error.message.includes('Content Security Policy')) {
      console.warn('CSP Error: This is likely due to content security policy restrictions');
    } else if (error.message.includes('undefined is not an object')) {
      console.warn('Null Reference: Trying to access properties on undefined or null');
    } else if (error.message.includes('is not a function')) {
      console.warn('Function Error: Trying to call something that is not a function');
    } else if (error.message.includes('lazy') || error.message.includes('Suspense')) {
      console.warn('Lazy Loading Error: Issue with React.lazy or Suspense component');
    } else if (error.message.includes('hooks')) {
      console.warn('React Hooks Error: Rules of hooks may be violated');
    }
  } else {
    console.error('Unknown error type:', error);
  }
  
  console.groupEnd();
};

// Function to render the main application with enhanced error handling
const renderApp = () => {
  try {
    console.log('Starting application rendering process');
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <ErrorBoundary 
          onError={(error) => {
            console.error("Root error boundary caught an error:", error);
          }}
          fallback={(error) => (
            <ErrorFallback 
              error={error}
              message="Fatal application error" 
              componentName="Application Root" 
            />
          )}
        >
          <App />
          <Toaster position="top-right" />
        </ErrorBoundary>
      </React.StrictMode>,
    );
    console.log('Application rendering complete');
  } catch (error) {
    console.error("Fatal error during application initialization:", error);
    logDetailedError(error as Error, "app initialization");
    
    // Provide a basic error message when the app fails to initialize
    document.body.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: system-ui, -apple-system, sans-serif;">
        <h2 style="color: #e11d48;">Application Error</h2>
        <p style="margin-bottom: 16px;">We're sorry, but the application failed to initialize.</p>
        <p style="margin-bottom: 24px; font-size: 0.9rem; color: #6b7280;">${error instanceof Error ? error.message : 'Unknown error'}</p>
        <button onclick="window.location.reload()" 
                style="padding: 8px 16px; background-color: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Refresh Page
        </button>
      </div>
    `;
  }
};

// Initialize the app with enhanced global error handler
try {
  console.log('Application bootstrap starting');
  renderApp();

  // Global unhandled error logging
  window.addEventListener('error', (event) => {
    console.log('Global error event caught:', event.type);
    logDetailedError(event.error || new Error(event.message), 'global error handler');
    
    // Check if it's a CSP error
    const isCSPError = event.message?.includes("Content Security Policy") || 
                     event.message?.includes("Refused to execute");
    
    if (isCSPError) {
      console.warn('Content Security Policy violation detected:', event.message);
      toast.error('Content Security Policy violation detected');
    } else if (event.message?.includes('lazy') || event.filename?.includes('chunk')) {
      toast.error('Error loading a component. Please try refreshing the page.');
    } else {
      toast.error('An unexpected error occurred');
    }
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    console.log('Unhandled promise rejection caught');
    logDetailedError(event.reason, 'unhandled promise rejection');
    
    // Specific handling for common promise rejection scenarios
    const reason = event.reason?.message || String(event.reason);
    if (reason.includes('fetch') || reason.includes('api') || reason.includes('network')) {
      toast.error('Network request failed. Please check your connection.');
    } else if (reason.includes('chunk')) {
      toast.error('Failed to load necessary resources. Please refresh the page.');
    } else {
      toast.error('An unexpected promise rejection occurred');
    }
  });
  
  console.log('Application bootstrap complete');
} catch (error) {
  console.error('Critical failure during bootstrap:', error);
  logDetailedError(error as Error, 'bootstrap');
}
