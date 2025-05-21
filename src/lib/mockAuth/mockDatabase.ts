
import { MockUser, MockProfile, STORAGE_KEYS } from './types';

// Mock user database
export const mockUsers: Record<string, { user: MockUser; profile: MockProfile; password: string }> = {
  'admin@example.com': {
    user: { id: 'admin-1', email: 'admin@example.com', createdAt: new Date().toISOString() },
    profile: { id: 'admin-1', full_name: 'Admin User', role: 'admin' },
    password: 'password123',
  },
  'user@example.com': {
    user: { id: 'user-1', email: 'user@example.com', createdAt: new Date().toISOString() },
    profile: { id: 'user-1', full_name: 'Regular User', role: 'user' },
    password: 'password123',
  },
  'provider@example.com': {
    user: { id: 'provider-1', email: 'provider@example.com', createdAt: new Date().toISOString() },
    profile: { id: 'provider-1', full_name: 'Service Provider', role: 'tradesperson' },
    password: 'password123',
  },
};

// Helper function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
