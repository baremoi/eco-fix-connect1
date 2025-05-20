
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Trades from "./pages/Trades";
import Register from "./pages/Register";
import { AuthProvider } from "./lib/AuthContext";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import PublicLayout from "./components/layout/Layout";
import Index from "./pages/Index";
import { ErrorBoundary } from "./components/ui/error-boundary";
import { Suspense, useState, useEffect } from "react";
import { toast } from "sonner";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate checking app initialization status
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // App-level error handler
  const handleAppError = (error: Error) => {
    console.error("App-level error:", error);
    toast.error("An application error occurred");
  };

  if (!isLoaded) {
    return <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="text-center">
        <div className="h-16 w-16 mx-auto mb-4 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground">Loading application...</p>
      </div>
    </div>;
  }

  return (
    <ErrorBoundary onError={handleAppError}>
      <AuthProvider>
        <Router>
          <Suspense fallback={
            <div className="flex h-screen w-full items-center justify-center bg-background">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground">Loading application...</p>
              </div>
            </div>
          }>
            <Routes>
              {/* Public routes with public layout */}
              <Route element={
                <ErrorBoundary>
                  <PublicLayout />
                </ErrorBoundary>
              }>
                <Route path="/" element={<Index />} />
                <Route path="/trades" element={<Trades />} />
                <Route path="/register" element={<Register />} />
              </Route>
              
              {/* Authenticated routes with dashboard layout */}
              <Route element={
                <ErrorBoundary>
                  <Layout />
                </ErrorBoundary>
              }>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/messages/project/:projectId" element={<Messages />} />
                <Route path="/messages/user/:userId" element={<Messages />} />
              </Route>
              
              {/* Catch all for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster position="top-right" />
          </Suspense>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
