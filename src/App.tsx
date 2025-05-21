
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MockAuthProvider } from "@/lib/mockAuth";
import Layout from "@/components/layout/Layout";

// Providers and shared components
import { AccessibilityProvider } from "@/components/providers/AccessibilityProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import { NotificationProvider } from "@/contexts/NotificationContext";

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
import Notifications from "@/pages/Notifications";

// Admin pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import TeamManagement from "@/pages/admin/TeamManagement";
import Analytics from "@/pages/admin/Analytics";

// Initialize React Query client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MockAuthProvider>
        <NotificationProvider>
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
              </Layout>
            </Router>
            <Toaster position="top-right" expand={false} richColors />
          </AccessibilityProvider>
        </NotificationProvider>
      </MockAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
