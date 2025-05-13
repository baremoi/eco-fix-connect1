import { z } from "zod";
import { authService } from "./auth";

export const oauthStateSchema = z.object({
  provider: z.enum(["google"]),
  redirectUrl: z.string().optional(),
});

export type OAuthState = z.infer<typeof oauthStateSchema>;

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = `${window.location.origin}/oauth/callback`;

export class OAuthService {
  private generateState(provider: OAuthState["provider"], redirectUrl?: string): string {
    const state: OAuthState = { provider, redirectUrl };
    return btoa(JSON.stringify(state));
  }

  async initiateGoogleLogin(redirectUrl?: string) {
    const state = this.generateState("google", redirectUrl);
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: "email profile",
      state,
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  }

  async handleOAuthCallback(code: string, state: string): Promise<void> {
    try {
      const decodedState = JSON.parse(atob(state)) as OAuthState;
      oauthStateSchema.parse(decodedState);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/oauth/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          state: decodedState,
        }),
      });

      if (!response.ok) {
        throw new Error("OAuth authentication failed");
      }

      const data = await response.json();
      authService.setToken(data.token);

      if (decodedState.redirectUrl) {
        window.location.href = decodedState.redirectUrl;
      } else {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("OAuth callback error:", error);
      window.location.href = "/login?error=oauth_failed";
    }
  }
}

export const oauthService = new OAuthService(); 