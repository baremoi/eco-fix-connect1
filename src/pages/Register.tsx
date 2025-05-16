
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/auth";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Register() {
  const { register: registerUser, session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "user"
    }
  });

  const selectedRole = watch("role");

  useEffect(() => {
    // If user is already authenticated and email is verified, redirect to dashboard
    if (session?.user?.email_confirmed_at) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  async function onSubmit(data: RegisterInput) {
    try {
      setIsLoading(true);
      console.log("Register form submitted with data:", {
        ...data,
        password: "***REDACTED***",
        confirmPassword: "***REDACTED***"
      });
      
      // Check if environment variables are loaded
      console.log("Environment variables loaded:", {
        supabaseUrl: !!import.meta.env.VITE_SUPABASE_URL,
        supabaseKeyExists: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
      });
      
      await registerUser(data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Registration error in component:", error);
      // Error is already handled by the AuthContext
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg space-y-8">
        {isSuccess ? (
          <div className="text-center space-y-4">
            <Icons.checkCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="text-2xl font-bold">Registration Successful!</h2>
            <p className="text-muted-foreground">
              Please check your email to verify your account. Once verified, you can login.
            </p>
            <div className="pt-4">
              <Button asChild variant="secondary" className="mx-auto">
                <Link to="/login">Go to Login</Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
              <p className="text-sm text-muted-foreground">
                Join Eco-Fix Connect and get started
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    {...register("name")}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">I am a</Label>
                  <Select onValueChange={(value: "user" | "tradesperson" | "admin") => setValue("role", value)} defaultValue="user">
                    <SelectTrigger id="role" className={errors.role ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select your account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Homeowner looking for services</SelectItem>
                      <SelectItem value="tradesperson">Service Provider</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-sm text-destructive">{errors.role.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    {...register("password")}
                    className={errors.password ? "border-destructive" : ""}
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    {...register("confirmPassword")}
                    className={errors.confirmPassword ? "border-destructive" : ""}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Account
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </div>

              {selectedRole === "tradesperson" && (
                <div className="mt-4 p-4 bg-primary/10 rounded-md">
                  <p className="text-sm text-center">
                    <Icons.info className="inline-block mr-1 h-4 w-4" />
                    After registration, you'll need to complete your profile 
                    and add your services to start receiving job requests.
                  </p>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
