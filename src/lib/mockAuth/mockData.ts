
// Mock data for our authentication system
import { UserRole } from './types';

// Mock user data
export const mockUsers = [
  {
    id: "user-1",
    email: "user@example.com",
    password: "password",
    created_at: new Date().toISOString(),
  },
  {
    id: "provider-1",
    email: "provider@example.com",
    password: "password",
    created_at: new Date().toISOString(),
  },
  {
    id: "admin-1",
    email: "admin@example.com",
    password: "password",
    created_at: new Date().toISOString(),
  },
];

// Mock profiles data
export const mockProfiles = [
  {
    id: "user-1",
    full_name: "Demo User",
    email: "user@example.com",
    role: "user" as UserRole,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    avatar_url: "/avatars/user.jpg",
  },
  {
    id: "provider-1",
    full_name: "Demo Provider",
    email: "provider@example.com",
    role: "tradesperson" as UserRole,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    avatar_url: "/avatars/provider.jpg",
  },
  {
    id: "admin-1",
    full_name: "Demo Admin",
    email: "admin@example.com",
    role: "admin" as UserRole,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    avatar_url: "/avatars/admin.jpg",
  },
];
