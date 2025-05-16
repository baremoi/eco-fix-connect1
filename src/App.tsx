
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./lib/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import { useEffect } from "react";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Profile from "./pages/Profile";
import OAuthCallback from "./pages/OAuthCallback";
import Projects from "./pages/Projects";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Team from "./pages/Team";
import HowItWorks from "./pages/HowItWorks";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Services from "./pages/Services";
import Bookings from "./pages/Bookings";
import Availability from "./pages/provider/Availability";

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const initializeTheme = () => {
      const root = window.document.documentElement;
      const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
      
      if (storedTheme) {
        if (storedTheme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          root.classList.add(systemTheme);
        } else {
          root.classList.add(storedTheme);
        }
      } else {
        // Default to system preference if no theme is set
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      }
    };

    // Initialize color scheme from localStorage
    const initializeColorScheme = () => {
      const root = window.document.documentElement;
      const storedColorScheme = localStorage.getItem('colorScheme') as 'green' | 'blue' | 'purple' | null;
      
      if (storedColorScheme) {
        root.classList.add(`theme-${storedColorScheme}`);
        
        // Apply the color scheme CSS variables
        switch (storedColorScheme) {
          case 'green':
            // Green is the default, no need to change variables
            break;
          case 'blue':
            root.style.setProperty('--primary', '210 100% 45%');
            root.style.setProperty('--primary-foreground', '210 10% 98%');
            root.style.setProperty('--secondary', '280 98% 39%');
            root.style.setProperty('--secondary-foreground', '210 10% 98%');
            root.style.setProperty('--accent', '210 30% 92%');
            root.style.setProperty('--accent-foreground', '210 50% 10%');
            break;
          case 'purple':
            root.style.setProperty('--primary', '270 70% 60%');
            root.style.setProperty('--primary-foreground', '270 10% 98%');
            root.style.setProperty('--secondary', '220 98% 39%');
            root.style.setProperty('--secondary-foreground', '270 10% 98%');
            root.style.setProperty('--accent', '270 30% 92%');
            root.style.setProperty('--accent-foreground', '270 50% 10%');
            break;
        }
      }
    };

    // Initialize accessibility settings
    const initializeAccessibility = () => {
      const savedSettings = localStorage.getItem('accessibilitySettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        const html = document.documentElement;
        
        if (settings.reduceMotion) html.classList.add('reduce-motion');
        if (settings.highContrast) html.classList.add('high-contrast');
        if (settings.largeText) html.classList.add('large-text');
        if (settings.contentZoom) {
          html.style.setProperty('--content-zoom', `${settings.contentZoom}%`);
        }
      }
    };

    initializeTheme();
    initializeColorScheme();
    initializeAccessibility();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'system') {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/oauth/callback" element={<OAuthCallback />} />
            <Route path="/how-it-works" element={<HowItWorks />} />

            {/* Protected routes for all authenticated users */}
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            </Route>
            
            {/* Bookings route */}
            <Route path="/bookings" element={<Layout />}>
              <Route index element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <Bookings />
                </ProtectedRoute>
              } />
            </Route>

            {/* Services and Trades route */}
            <Route path="/trades" element={<Layout />}>
              <Route index element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <Services />
                </ProtectedRoute>
              } />
            </Route>

            {/* Protected routes for service providers */}
            <Route path="/provider" element={<Layout />}>
              <Route path="dashboard" element={
                <ProtectedRoute allowedRoles={["tradesperson"]}>
                  <ProviderDashboard />
                </ProtectedRoute>
              } />
              <Route path="projects" element={
                <ProtectedRoute allowedRoles={["tradesperson"]}>
                  <Projects />
                </ProtectedRoute>
              } />
              <Route path="availability" element={
                <ProtectedRoute allowedRoles={["tradesperson"]}>
                  <Availability />
                </ProtectedRoute>
              } />
              <Route path="reports" element={
                <ProtectedRoute allowedRoles={["tradesperson"]}>
                  <Reports />
                </ProtectedRoute>
              } />
            </Route>

            {/* Protected routes for admins */}
            <Route path="/admin" element={<Layout />}>
              <Route path="dashboard" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="analytics" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="team" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Team />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
