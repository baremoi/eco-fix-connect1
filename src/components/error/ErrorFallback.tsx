
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  return (
    <div className="flex items-center justify-center p-6 min-h-[300px]">
      <Alert className="max-w-md w-full bg-red-50 border-red-200">
        <AlertTitle className="text-lg font-semibold mb-2">
          {message}
        </AlertTitle>
        <AlertDescription className="text-gray-700">
          {error && (
            <p className="text-sm text-gray-500 mb-4">
              {error.message || "An unexpected error occurred"}
            </p>
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
