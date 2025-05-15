export default {
  // Server configuration
  server: {
    headers: {
      // Content Security Policy
      'Content-Security-Policy': [
        // Restrict default sources to same origin
        "default-src 'self'",
        
        // Scripts: Allow same origin, inline scripts, and specific external sources
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com https://cdn.gpteng.co https://*.lovable.dev",
        
        // Styles: Allow same origin and inline styles for Tailwind
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        
        // Images: Allow same origin, data URIs, and HTTPS sources
        "img-src 'self' data: https: blob:",
        
        // Fonts: Allow same origin and Google Fonts
        "font-src 'self' data: https://fonts.gstatic.com",
        
        // Connect (API/WebSocket): Allow necessary endpoints
        "connect-src 'self' https://*.lovable.dev https://*.supabase.co wss://*.lovable.dev",
        
        // Frames: Allow specific trusted sources
        "frame-src 'self' https://accounts.google.com",
        
        // Media: Restrict to same origin
        "media-src 'self'",
        
        // Object/Embed: Block all plugins
        "object-src 'none'",
        
        // Base URI: Restrict to same origin
        "base-uri 'self'",
        
        // Form submission: Allow same origin and Lovable endpoints
        "form-action 'self' https://*.lovable.dev",
        
        // Frame ancestors: Prevent embedding except for Lovable domains
        "frame-ancestors 'self' https://*.lovable.dev",
        
        // Manifest: Allow same origin
        "manifest-src 'self'"
      ].join('; '),

      // Additional security headers
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      
      // CORS headers
      'Access-Control-Allow-Origin': 'https://*.lovable.dev',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true'
    }
  },

  // Build configuration
  build: {
    target: 'es2020',
    outDir: 'dist',
    minify: true,
    sourcemap: true
  },

  // Environment configuration
  env: {
    production: {
      // Production-specific settings
      server: {
        headers: {
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
        }
      },
      // Environment variables for production
      variables: {
        VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
        VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY
      }
    },
    development: {
      // Development-specific settings
      server: {
        headers: {
          // Allow more lenient CSP in development
          'Content-Security-Policy': [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "connect-src 'self' ws: wss: http://localhost:* https://*.lovable.dev https://*.supabase.co",
            "img-src 'self' data: https: blob:",
            "font-src 'self' data:",
            "frame-src 'self'",
            "media-src 'self'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'self'"
          ].join('; ')
        }
      },
      // Environment variables for development
      variables: {
        VITE_SUPABASE_URL: 'https://gquwbmdxvsxkxpauabuw.supabase.co',
        VITE_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxdXdibWR4dnN4a3hwYXVhYnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMDA3NzYsImV4cCI6MjA2Mjc3Njc3Nn0.UHFjk0eqHcCWkbvRceFVu85WaTSax6tCNlmIMoS9lvk'
      }
    }
  },

  // Deployment configuration
  deploy: {
    provider: 'lovable',
    region: 'auto',
    project: process.env.LOVABLE_PROJECT_ID,
    apiKey: process.env.LOVABLE_API_KEY
  }
}; 