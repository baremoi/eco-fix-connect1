
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ErrorBoundary } from './components/ui/error-boundary'
import { Toaster } from 'sonner'

// Try to render the app, but catch any errors during initialization
try {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
        <Toaster position="top-right" />
      </ErrorBoundary>
    </React.StrictMode>,
  )
} catch (error) {
  console.error("Failed to render application:", error);
  // Render a fallback UI when the entire app fails to initialize
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center;">
      <h2>Something went wrong</h2>
      <p>The application failed to initialize. Please try refreshing the page.</p>
      <button onclick="window.location.reload()">Refresh Page</button>
    </div>
  `;
}
