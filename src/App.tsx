
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
import { AuthProvider } from './lib/AuthContext';
import PublicLayout from './components/layout/Layout';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';

function App() {
  console.log("App rendering");
  
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes with PublicLayout */}
          <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
          <Route path="/forgot-password" element={<PublicLayout><ForgotPassword /></PublicLayout>} />
          <Route path="/reset-password" element={<PublicLayout><ResetPassword /></PublicLayout>} />
          <Route path="/join" element={<PublicLayout><Join /></PublicLayout>} />
          <Route path="/trades" element={<PublicLayout><Trades /></PublicLayout>} />
          <Route path="/how-it-works" element={<PublicLayout><HowItWorks /></PublicLayout>} />
          <Route path="/oauth" element={<PublicLayout><OAuthCallback /></PublicLayout>} />
          <Route path="/email-verification" element={<PublicLayout><VerifyEmail /></PublicLayout>} />

          {/* User pages with UserLayout */}
          <Route path="/bookings" element={
            <ProtectedRoute>
              <UserLayout>
                <Bookings />
              </UserLayout>
            </ProtectedRoute>
          } />

          {/* Dashboard routes */}
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
            path="/dashboard/profile" 
            element={
              <ProtectedRoute>
                <UserLayout>
                  <Profile />
                </UserLayout>
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
