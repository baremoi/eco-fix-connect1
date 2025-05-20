
// This file will be used for future database integration configuration

export type APIConfig = {
  baseUrl: string;
  apiKey?: string;
  version: string;
};

// Default development configuration - will be replaced with real DB info later
export const API_CONFIG: APIConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  apiKey: import.meta.env.VITE_API_KEY,
  version: 'v1'
};

// Function to construct API URLs
export const buildApiUrl = (endpoint: string, queryParams?: Record<string, string>): string => {
  const url = new URL(`${API_CONFIG.baseUrl}/api/${API_CONFIG.version}/${endpoint}`);
  
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });
  }
  
  return url.toString();
};

// Default headers for API requests
export const getDefaultHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const authToken = localStorage.getItem('mock_session');
  if (authToken) {
    try {
      const session = JSON.parse(authToken);
      if (session && session.user) {
        headers['Authorization'] = `Bearer ${session.user.id}`;
      }
    } catch (error) {
      console.error('Failed to parse auth token', error);
    }
  }

  return headers;
};

// Define common error types
export type APIError = {
  code: string;
  message: string;
  details?: any;
};

// Ready for future database integration
export const createAPIClient = () => {
  return {
    get: async <T>(endpoint: string, queryParams?: Record<string, string>): Promise<T> => {
      // Currently returns mock data, will be replaced with actual API calls
      console.log(`GET ${endpoint} with params:`, queryParams);
      throw new Error('API not implemented yet');
    },
    
    post: async <T, D = any>(endpoint: string, data: D): Promise<T> => {
      // Currently returns mock data, will be replaced with actual API calls
      console.log(`POST ${endpoint} with data:`, data);
      throw new Error('API not implemented yet');
    },
    
    put: async <T, D = any>(endpoint: string, data: D): Promise<T> => {
      // Currently returns mock data, will be replaced with actual API calls
      console.log(`PUT ${endpoint} with data:`, data);
      throw new Error('API not implemented yet');
    },
    
    delete: async <T>(endpoint: string): Promise<T> => {
      // Currently returns mock data, will be replaced with actual API calls
      console.log(`DELETE ${endpoint}`);
      throw new Error('API not implemented yet');
    }
  };
};

// Export a singleton instance
export const apiClient = createAPIClient();
