
import { User } from "@supabase/supabase-js";

export interface Tradesperson {
  id: string;
  full_name: string;
  avatar_url?: string;
  role: string;
  bio?: string;
  serviceCategory: string;
  hourlyRate?: number;
  avg_rating?: number;
  review_count?: number;
}

export interface TradeCategory {
  id: string;
  name: string;
}

export interface TradeSearchFilters {
  selectedCategory: string;
  postcode: string;
  priceRange: [number, number];
  ratingFilter: number;
  sortBy: string;
  availabilityFilter: boolean;
}

export interface SearchProps {
  loading: boolean;
  categories: TradeCategory[];
  filters: TradeSearchFilters;
  onUpdateFilter: <K extends keyof TradeSearchFilters>(key: K, value: TradeSearchFilters[K]) => void;
  onSearch: () => void;
  onResetFilters: () => void;
}

export interface TradeCardProps {
  tradesperson: Tradesperson;
}

export interface TradeSearchResultsProps {
  loading: boolean;
  tradespeople: Tradesperson[];
}
