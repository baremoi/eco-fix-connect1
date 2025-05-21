
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMockAuth } from "@/lib/mockAuth";
import { LoginForm } from "@/components/auth/LoginForm";
import AuthCard from "@/components/auth/AuthCard";
import DemoAccountsInfo from "@/components/auth/DemoAccountsInfo";

export default function Login() {
  const { user } = useMockAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuthCard
        title="Sign in to your account"
        description="Enter your credentials to access your account"
        footer={
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        }
      >
        <DemoAccountsInfo />
        <div className="mt-4">
          <LoginForm />
        </div>
      </AuthCard>
    </div>
  );
}
