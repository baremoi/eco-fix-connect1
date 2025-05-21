
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MockAuthProvider } from "@/lib/mockAuth";
import Layout from "@/components/layout/Layout";
import { Spinner } from "@/components/ui/spinner";

// Providers and shared components
import { AccessibilityProvider } from "@/components/providers/AccessibilityProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import { NotificationProvider } from "@/contexts/NotificationContext";
import ErrorBoundary from "@/components/ErrorBoundary";

// Eager load critical components
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

// Lazy load non-critical route components
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Services = lazy(() => import("@/pages/Services"));
const Trades = lazy(() => import("@/pages/Trades"));
const Profile = lazy(() => import("@/pages/Profile"));
const Projects = lazy(() => import("@/pages/Projects"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
const ProviderDashboard = lazy(() => import("@/pages/provider/ProviderDashboard"));
const ProviderProfile = lazy(() => import("@/pages/provider/ProviderProfile"));
const Availability = lazy(() => import("@/pages/provider/Availability"));
const BookingsManagement = lazy(() => import("@/pages/BookingsManagement"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const TeamManagement = lazy(() => import("@/pages/admin/TeamManagement"));
const Analytics = lazy(() => import("@/pages/admin/Analytics"));

// Loading fallback for lazy-loaded components
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-full min-h-[50vh]">
    <Spinner className="h-8 w-8 text-primary" />
  </div>
);

// Initialize React Query client with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <MockAuthProvider>
          <NotificationProvider>
            <AccessibilityProvider>
              <Router>
                <Layout>
                  <ErrorBoundary>
                    <Suspense fallback={<LoadingFallback />}>
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
                        <Route 
                          path="/notifications" 
                          element={
                            <ProtectedRoute>
                              <Notifications />
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

                        {/* Admin-specific routes */}
                        <Route 
                          path="/admin/dashboard" 
                          element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                              <AdminDashboard />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/admin/team" 
                          element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                              <TeamManagement />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/admin/analytics" 
                          element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                              <Analytics />
                            </ProtectedRoute>
                          } 
                        />

                        {/* Catch-all for 404s */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </ErrorBoundary>
                </Layout>
              </Router>
              <Toaster position="top-right" expand={false} richColors />
            </AccessibilityProvider>
          </NotificationProvider>
        </MockAuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
