
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes with public layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/trades" element={<Trades />} />
            <Route path="/register" element={<Register />} />
          </Route>
          
          {/* Authenticated routes with dashboard layout */}
          <Route element={<Layout />}>
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
      </Router>
    </AuthProvider>
  );
}

export default App;
