
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ErrorBoundary } from './components/ui/error-boundary';
import { Toaster, toast } from 'sonner';
import ErrorFallback from './components/error/ErrorFallback';

// Function to render the main application with error handling
const renderApp = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <ErrorBoundary fallback={<ErrorFallback message="Fatal application error" />}>
          <App />
          <Toaster position="top-right" />
        </ErrorBoundary>
      </React.StrictMode>,
    );
  } catch (error) {
    console.error("Fatal error during application initialization:", error);
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

// Initialize the app with a global error handler
try {
  renderApp();

  // Global unhandled error logging
  window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
    
    // Check if it's a CSP error
    const isCSPError = event.message?.includes("Content Security Policy") || 
                       event.message?.includes("Refused to execute");
    
    if (isCSPError) {
      console.warn('Content Security Policy violation detected:', event.message);
      toast.error('Content Security Policy violation detected');
    } else {
      toast.error('An unexpected error occurred');
    }
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    toast.error('An unexpected promise rejection occurred');
  });
} catch (error) {
  console.error('Critical failure during bootstrap:', error);
}
