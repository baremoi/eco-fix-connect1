
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { componentTagger } from "lovable-tagger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 8080,
    strictPort: true,
    headers: {
      // Set Content-Security-Policy header properly
      'Content-Security-Policy': [
        // Restrict default sources to same origin
        "default-src 'self'",
        
        // Scripts: Allow trusted sources including cloudflare analytics and unsafe-eval for necessary functions
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com https://cdn.gpteng.co https://*.cloudflareinsights.com https://static.cloudflareinsights.com",
        
        // Styles: Allow same origin and inline styles
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        
        // Images: Allow same origin, data URIs, and HTTPS sources
        "img-src 'self' data: https: blob: https://lovable.dev",
        
        // Fonts: Allow same origin and Google Fonts
        "font-src 'self' data: https://fonts.gstatic.com",
        
        // Connect (API/XHR/WebSocket): Allow necessary endpoints
        "connect-src 'self' https://accounts.google.com https://www.googleapis.com http://localhost:* ws://localhost:* https://*.supabase.co wss://*.supabase.co https://gquwbmdxvsxkxpauabuw.supabase.co https://*.cloudflareinsights.com",
        
        // Frames: Allow only specific trusted sources
        "frame-src 'self' https://accounts.google.com",
        
        // Media: Restrict to same origin
        "media-src 'self'",
        
        // Object/Embed: Block all plugins
        "object-src 'none'",
        
        // Base URI: Restrict to same origin
        "base-uri 'self'",
        
        // Form submission: Restrict to same origin
        "form-action 'self'"
      ].join('; '),
      
      // Set frame-ancestors as a proper header (not meta tag)
      'X-Frame-Options': 'SAMEORIGIN'
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020'
    }
  },
  build: {
    target: 'es2020'
  }
}));
