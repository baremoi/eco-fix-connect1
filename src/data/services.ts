
import { Icons } from "@/components/ui/icons";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: "hour" | "day" | "fixed";
  category: string;
  image?: string;
  eco_rating: 1 | 2 | 3 | 4 | 5;
  features: string[];
}

export interface Booking {
  id: string;
  serviceName: string;
  providerName: string;
  tradesperson_id?: string; // Added for review functionality
  status: "upcoming" | "completed" | "cancelled" | "in_progress";
  date: string;
  time: string;
  price: number;
  address?: string;
  notes?: string;
}

export const servicesData: Service[] = [
  {
    id: "1",
    name: "Plumbing Services",
    description: "Professional eco-friendly plumbing services for all your needs. We use sustainable materials and water-saving techniques.",
    price: 60,
    priceUnit: "hour",
    category: "plumbing",
    eco_rating: 4,
    features: ["Water-saving techniques", "Sustainable materials", "Energy-efficient solutions"]
  },
  {
    id: "2",
    name: "Electrical Installation",
    description: "Expert electrical services with a focus on energy efficiency. We specialize in smart home installations and LED lighting.",
    price: 75,
    priceUnit: "hour",
    category: "electrical",
    eco_rating: 5,
    features: ["Energy-efficient lighting", "Smart home integration", "Solar-ready installations"]
  },
  {
    id: "3",
    name: "Painting & Decoration",
    description: "Transform your space with our eco-friendly painting services. We use only low-VOC and non-toxic paints for healthier homes.",
    price: 300,
    priceUnit: "day",
    category: "decoration",
    eco_rating: 5,
    features: ["Low-VOC paints", "Non-toxic materials", "Proper waste disposal"]
  },
  {
    id: "4",
    name: "Gardening & Landscaping",
    description: "Sustainable gardening services that work with nature. We create beautiful, water-efficient gardens using native plants.",
    price: 45,
    priceUnit: "hour",
    category: "gardening",
    eco_rating: 5,
    features: ["Water conservation", "Native plant expertise", "Organic pest management"]
  },
  {
    id: "5",
    name: "Cleaning Services",
    description: "Thorough home cleaning using environmentally friendly and biodegradable cleaning products that are safe for your family.",
    price: 35,
    priceUnit: "hour",
    category: "cleaning",
    eco_rating: 4,
    features: ["Eco-friendly products", "Microfiber technology", "Water conservation"]
  },
  {
    id: "6",
    name: "Carpet Cleaning",
    description: "Deep carpet cleaning with minimal water usage and biodegradable cleaning solutions. Safe for kids and pets.",
    price: 120,
    priceUnit: "fixed",
    category: "cleaning",
    eco_rating: 3,
    features: ["Low-moisture methods", "Non-toxic solutions", "Reduced energy usage"]
  }
];

export const bookingsData: Booking[] = [
  {
    id: "1",
    serviceName: "Plumbing Repair",
    providerName: "Sarah Johnson",
    tradesperson_id: "e12b78e9-4a1f-4dab-b427-ef67d6de7957", // Added for testing review functionality
    status: "upcoming",
    date: "01/06/2025",
    time: "10:00 AM",
    price: 85,
    address: "123 Main St, London",
    notes: "Problem with kitchen sink drain"
  },
  {
    id: "2",
    serviceName: "Solar Panel Installation Consultation",
    providerName: "Michael Chen",
    tradesperson_id: "f23c89f0-5b2g-5ebc-c538-fg78e7f8a068",
    status: "upcoming",
    date: "05/06/2025",
    time: "2:30 PM",
    price: 0,
    address: "456 Park Ave, Manchester",
    notes: "Initial assessment for solar installation"
  },
  {
    id: "3",
    serviceName: "Smart Home Setup",
    providerName: "Emma Wilson",
    tradesperson_id: "g34d90g1-6c3h-6fcd-d649-gh89f8g9b179",
    status: "completed",
    date: "12/05/2025",
    time: "9:15 AM",
    price: 150,
    address: "789 Broadway, Birmingham",
    notes: "Installation of smart thermostat and lights"
  },
  {
    id: "4",
    serviceName: "Furniture Restoration",
    providerName: "James Taylor",
    tradesperson_id: "h45e01h2-7d4i-7gde-e750-hi90g9h0c280",
    status: "cancelled",
    date: "08/05/2025",
    time: "1:00 PM",
    price: 120,
    address: "101 Pine St, Bristol",
    notes: "Antique table restoration - cancelled due to illness"
  }
];
