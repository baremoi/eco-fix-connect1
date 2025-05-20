
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "./components/ui/error-boundary";
import { AuthProvider } from "./lib/AuthContext";
import { toast } from "sonner";
import ErrorFallback from "./components/error/ErrorFallback";

// Pages
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Trades from "./pages/Trades";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import Index from "./pages/Index";

// Layouts
import Layout from "./components/Layout";
import PublicLayout from "./components/layout/Layout";

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
    <ErrorBoundary 
      onError={handleAppError}
      fallback={(error) => <ErrorFallback message="Fatal application error" componentName="Application Root" error={error} />}
    >
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
                <ErrorBoundary fallback={(error) => <ErrorFallback error={error} componentName="Public Layout" />}>
                  <PublicLayout />
                </ErrorBoundary>
              }>
                <Route path="/" element={<Index />} />
                <Route path="/trades" element={<Trades />} />
                <Route path="/register" element={<Register />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                {/* Add missing routes for footer links */}
                <Route path="/contact" element={<div className="container mx-auto py-8 px-4"><h1 className="text-3xl font-bold mb-4">Contact Us</h1><p>This page is under construction.</p></div>} />
                <Route path="/faq" element={<div className="container mx-auto py-8 px-4"><h1 className="text-3xl font-bold mb-4">FAQ</h1><p>This page is under construction.</p></div>} />
                <Route path="/privacy" element={<div className="container mx-auto py-8 px-4"><h1 className="text-3xl font-bold mb-4">Privacy Policy</h1><p>This page is under construction.</p></div>} />
                <Route path="/terms" element={<div className="container mx-auto py-8 px-4"><h1 className="text-3xl font-bold mb-4">Terms of Service</h1><p>This page is under construction.</p></div>} />
                <Route path="/join" element={<div className="container mx-auto py-8 px-4"><h1 className="text-3xl font-bold mb-4">Become a Provider</h1><p>This page is under construction.</p></div>} />
                <Route path="/login" element={<div className="container mx-auto py-8 px-4"><h1 className="text-3xl font-bold mb-4">Login</h1><p>This page is under construction.</p></div>} />
              </Route>
              
              {/* Authenticated routes with dashboard layout */}
              <Route element={
                <ErrorBoundary fallback={(error) => <ErrorFallback error={error} componentName="Dashboard Layout" />}>
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
