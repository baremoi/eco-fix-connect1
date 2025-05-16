
export type Provider = {
  id: string;
  name: string;
  role: string;
  avatar_url?: string;
  bio?: string;
  rating: number;
  location: string;
  specialties: string[];
  services: string[];
  completedProjects: number;
  phone?: string;
  email: string;
};

export type ProviderFilters = {
  category?: string;
  location?: string;
  minRating?: number;
  specialty?: string;
};
