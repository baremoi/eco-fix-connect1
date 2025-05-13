import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { oauthService } from "@/lib/oauth";
import { Icons } from "@/components/ui/icons";

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    if (error) {
      window.location.href = `/login?error=${error}`;
      return;
    }

    if (!code || !state) {
      window.location.href = "/login?error=invalid_callback";
      return;
    }

    oauthService.handleOAuthCallback(code, state);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg text-center">
        <Icons.spinner className="mx-auto h-12 w-12 text-primary animate-spin mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Completing Sign In</h1>
        <p className="text-muted-foreground">Please wait while we complete your sign in...</p>
      </div>
    </div>
  );
} 