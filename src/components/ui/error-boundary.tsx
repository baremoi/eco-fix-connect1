import { Component, ErrorInfo, ReactNode } from "react";
import { Alert, AlertTitle, AlertDescription } from "./alert";
import { Button } from "./button";
import { RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <Alert className="my-4 bg-red-50 border-red-200">
          <AlertTitle className="text-lg font-semibold mb-2">
            Something went wrong
          </AlertTitle>
          <AlertDescription className="text-gray-700 mb-4">
            {this.state.error?.message || "An unexpected error occurred"}
          </AlertDescription>
          <Button onClick={this.handleReload} className="mt-2" variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reload page
          </Button>
        </Alert>
      );
    }

    return this.props.children;
  }
}
