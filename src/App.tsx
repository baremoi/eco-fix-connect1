
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MockAuthProvider } from "@/lib/mockAuth";
import Layout from "@/components/layout/Layout";

// Providers and shared components
import { AccessibilityProvider } from "@/components/providers/AccessibilityProvider";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import Services from "@/pages/Services";
import Trades from "@/pages/Trades";
import Profile from "@/pages/Profile";
import Projects from "@/pages/Projects";
import HowItWorks from "@/pages/HowItWorks";
import ProviderDashboard from "@/pages/provider/ProviderDashboard";
import ProviderProfile from "@/pages/provider/ProviderProfile";
import Availability from "@/pages/provider/Availability";
import BookingsManagement from "@/pages/BookingsManagement";

// Initialize React Query client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MockAuthProvider>
        <AccessibilityProvider>
          <Router>
            <Layout>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/trades" element={<Trades />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/services" element={<Services />} />
                <Route path="/provider/:providerId" element={<ProviderProfile />} />

                {/* Protected routes for all authenticated users */}
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/projects" 
                  element={
                    <ProtectedRoute>
                      <Projects />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/bookings" 
                  element={
                    <ProtectedRoute>
                      <BookingsManagement />
                    </ProtectedRoute>
                  } 
                />

                {/* Provider-specific routes */}
                <Route 
                  path="/provider/dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={["tradesperson"]}>
                      <ProviderDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/provider/availability" 
                  element={
                    <ProtectedRoute allowedRoles={["tradesperson"]}>
                      <Availability />
                    </ProtectedRoute>
                  } 
                />

                {/* Catch-all for 404s */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
          <Toaster position="top-right" expand={false} richColors />
        </AccessibilityProvider>
      </MockAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
