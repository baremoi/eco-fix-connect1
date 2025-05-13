import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authService } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { toast } from "sonner";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  async function verifyEmail(token: string) {
    try {
      setIsVerifying(true);
      await authService.verifyEmail(token);
      setIsVerified(true);
      toast.success("Email verified successfully");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to verify email");
      toast.error(error instanceof Error ? error.message : "Failed to verify email");
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleResendVerification() {
    try {
      setIsVerifying(true);
      await authService.resendVerificationEmail();
      toast.success("Verification email sent");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send verification email");
    } finally {
      setIsVerifying(false);
    }
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg text-center">
          <Icons.spinner className="mx-auto h-12 w-12 text-primary animate-spin mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Verifying your email</h1>
          <p className="text-muted-foreground">Please wait...</p>
        </div>
      </div>
    );
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg text-center">
          <Icons.checkCircle className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Email Verified</h1>
          <p className="text-muted-foreground mb-4">
            Your email has been verified successfully.
          </p>
          <Link
            to="/dashboard"
            className="text-primary hover:underline"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg text-center">
          <Icons.alertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Verification Failed</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button
            onClick={handleResendVerification}
            disabled={isVerifying}
            className="mb-4"
          >
            {isVerifying && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Resend Verification Email
          </Button>
          <div>
            <Link
              to="/dashboard"
              className="text-primary hover:underline"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Verify Email</h1>
      <p>Email verification process will be handled here.</p>
    </div>
  );
} 