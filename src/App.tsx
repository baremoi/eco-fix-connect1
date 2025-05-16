import React from 'react';
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
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './lib/AuthContext';

// Import the new provider pages
import Providers from "./pages/Providers";
import ProviderProfile from "./pages/ProviderProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/join" element={<Join />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/oauth" element={<OAuthCallback />} />
          <Route path="/email-verification" element={<VerifyEmail />} />
          
          {/* New provider routes */}
          <Route path="/providers" element={<Providers />} />
          <Route path="/providers/:id" element={<ProviderProfile />} />

          {/* Protected user routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Layout><Dashboard /></Layout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard/profile" 
            element={
              <ProtectedRoute>
                <Layout><div>Profile</div></Layout>
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
