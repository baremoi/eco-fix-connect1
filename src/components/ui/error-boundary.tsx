
import { Component, ErrorInfo, ReactNode } from "react";
import { Alert, AlertTitle, AlertDescription } from "./alert";
import { Button } from "./button";
import { RefreshCw, AlertCircle } from "lucide-react";
import { toast } from 'sonner';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to the console
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    
    // Store the error info for potential display
    this.setState({ errorInfo });
    
    // Call the optional onError callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Notify the user with a toast
    toast.error("A component error occurred");
  }

  handleReload = () => {
    window.location.reload();
  };

  handleRetry = () => {
    // Reset the error state to try rendering the children again
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Default fallback UI
      return (
        <Alert className="my-4 bg-red-50 border-red-200">
          <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
          <AlertTitle className="text-lg font-semibold mb-2">
            Something went wrong
          </AlertTitle>
          <AlertDescription className="text-gray-700 mb-4">
            <p className="mb-2">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <div className="flex gap-2 mt-4">
              <Button onClick={this.handleRetry} className="mr-2" variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try again
              </Button>
              <Button onClick={this.handleReload} variant="default">
                Reload page
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}
