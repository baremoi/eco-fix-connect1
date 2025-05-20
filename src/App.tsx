
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Join from './pages/Join';
import Trades from './pages/Trades';
import HowItWorks from './pages/HowItWorks';
import OAuthCallback from './pages/OAuthCallback';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import UserLayout from './components/Layout'; 
import ProtectedRoute from './components/ProtectedRoute';
import { MockAuthProvider } from './lib/mockAuth'; // Import our mock auth provider
import PublicLayout from './components/layout/Layout';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import { AccessibilityProvider } from './components/providers/AccessibilityProvider';
import ProviderDashboard from './pages/provider/ProviderDashboard';
import Projects from './pages/Projects';
import Availability from './pages/provider/Availability';
import Reports from './pages/Reports';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a new QueryClient instance
const queryClient = new QueryClient();

function App() {
  console.log("App rendering");
  
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <MockAuthProvider> {/* Replace AuthProvider with MockAuthProvider */}
          <AccessibilityProvider>
            <Routes>
              {/* Public routes with PublicLayout */}
              <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
              <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
              <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
              <Route path="/forgot-password" element={<PublicLayout><ForgotPassword /></PublicLayout>} />
              <Route path="/reset-password" element={<PublicLayout><ResetPassword /></PublicLayout>} />
              <Route path="/join" element={<PublicLayout><Join /></PublicLayout>} />
              <Route path="/how-it-works" element={<PublicLayout><HowItWorks /></PublicLayout>} />
              <Route path="/oauth" element={<PublicLayout><OAuthCallback /></PublicLayout>} />
              <Route path="/email-verification" element={<PublicLayout><VerifyEmail /></PublicLayout>} />

              {/* Protected routes with UserLayout */}
              <Route 
                path="/trades" 
                element={
                  <ProtectedRoute>
                    <UserLayout>
                      <Trades />
                    </UserLayout>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/bookings" 
                element={
                  <ProtectedRoute>
                    <UserLayout>
                      <Bookings />
                    </UserLayout>
                  </ProtectedRoute>
                }
              />
              
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <UserLayout>
                      <Dashboard />
                    </UserLayout>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <UserLayout>
                      <Profile />
                    </UserLayout>
                  </ProtectedRoute>
                } 
              />

              {/* Provider routes */}
              <Route 
                path="/provider/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={["tradesperson"]}>
                    <UserLayout>
                      <ProviderDashboard />
                    </UserLayout>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/provider/projects" 
                element={
                  <ProtectedRoute allowedRoles={["tradesperson"]}>
                    <UserLayout>
                      <Projects />
                    </UserLayout>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/provider/availability" 
                element={
                  <ProtectedRoute allowedRoles={["tradesperson"]}>
                    <UserLayout>
                      <Availability />
                    </UserLayout>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/provider/reports" 
                element={
                  <ProtectedRoute allowedRoles={["tradesperson"]}>
                    <UserLayout>
                      <Reports />
                    </UserLayout>
                  </ProtectedRoute>
                } 
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AccessibilityProvider>
        </MockAuthProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
