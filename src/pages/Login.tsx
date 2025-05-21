
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/auth";
import { useMockAuth } from "@/lib/mockAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function Login() {
  const { signIn, user } = useMockAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string>("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // Watch the email field so we can use it for resending verification
  const emailValue = watch("email");

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  async function onSubmit(data: LoginInput) {
    try {
      console.log("Attempting login with email:", data.email);
      setIsLoading(true);
      setPendingEmail(data.email);
      await signIn(data.email, data.password);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      // For mock auth, we don't need email verification logic
    } finally {
      setIsLoading(false);
    }
  }

  async function resendVerificationEmail() {
    try {
      setIsLoading(true);
      const email = pendingEmail || emailValue;
      
      if (!email) {
        toast.error("Email address is required to resend verification");
        return;
      }
      
      // Mock success notification
      setTimeout(() => {
        toast.success("Verification email resent. Please check your inbox.");
      }, 1000);
    } catch (error: any) {
      console.error("Failed to resend verification email:", error);
      toast.error(error.message || "Failed to resend verification email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold tracking-tight text-center">
            Sign in to your account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
          <div className="bg-amber-100 p-2 rounded text-amber-800 text-center text-sm mt-2">
            <p>This is a mock authentication system.</p>
            <p>Use these demo accounts (password: "password"):</p>
            <ul className="mt-1 list-disc list-inside">
              <li>user@example.com (User role)</li>
              <li>provider@example.com (Tradesperson role)</li>
              <li>admin@example.com (Admin role)</li>
            </ul>
          </div>
        </CardHeader>
        
        <CardContent>
          {emailVerificationSent ? (
            <div className="text-center space-y-4 py-4">
              <Icons.mail className="mx-auto h-12 w-12 text-primary" />
              <h3 className="text-lg font-medium">Check your email</h3>
              <p className="text-sm text-muted-foreground">
                We sent you a verification link. Please check your email to verify your account.
              </p>
              <Button 
                variant="outline" 
                onClick={resendVerificationEmail} 
                disabled={isLoading}
                className="mt-4"
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.refresh className="mr-2 h-4 w-4" />
                )}
                Resend verification email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={errors.password ? "border-destructive" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In
              </Button>
            </form>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
