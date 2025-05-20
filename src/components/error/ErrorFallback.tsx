
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, Home, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  message?: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
  message = "Something went wrong"
}) => {
  // Log error to console for debugging
  React.useEffect(() => {
    if (error) {
      console.error("Error caught by ErrorFallback:", error);
      toast.error(message);
    }
  }, [error, message]);
  
  // Check if the error is related to CSP
  const isCSPError = error && 
    (error.message?.includes("Content Security Policy") || 
     error.message?.includes("CSP") || 
     error.message?.includes("script-src"));

  return (
    <div className="flex items-center justify-center p-6 min-h-[300px]">
      <Alert className="max-w-md w-full bg-red-50 border-red-200">
        <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
        <AlertTitle className="text-lg font-semibold mb-2">
          {message}
        </AlertTitle>
        <AlertDescription className="text-gray-700">
          {error && (
            <div className="text-sm text-gray-500 mb-4">
              <p className="mb-2">{error.message || "An unexpected error occurred"}</p>
              
              {isCSPError && (
                <p className="text-xs bg-gray-100 p-2 rounded mb-2">
                  This appears to be a Content Security Policy error. If you're a developer, 
                  please check the CSP configuration in vite.config.ts and lovable.config.js.
                </p>
              )}
            </div>
          )}
          <div className="flex gap-2 mt-4">
            {resetErrorBoundary && (
              <Button onClick={resetErrorBoundary} variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try again
              </Button>
            )}
            <Button asChild size="sm">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go home
              </Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ErrorFallback;
