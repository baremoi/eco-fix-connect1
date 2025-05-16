
import { Provider } from "../types/provider.types";

// Mock data for providers
export const mockProviders: Provider[] = [
  {
    id: "1",
    name: "Michael Johnson",
    role: "tradesperson",
    avatar_url: "https://i.pravatar.cc/300?img=11",
    bio: "Specializing in renewable energy systems and smart home integration. With over 15 years of experience in electrical work, I focus on energy-efficient solutions that help reduce your carbon footprint while saving on utility bills.",
    rating: 4.9,
    location: "Portland, OR",
    specialties: ["Solar Installation", "Smart Home Systems", "Energy Audits"],
    services: ["Electrical", "Renewable Energy"],
    completedProjects: 142,
    phone: "503-555-0123",
    email: "michael@ecosolar.example"
  },
  {
    id: "2",
    name: "Sophia Williams",
    role: "tradesperson",
    avatar_url: "https://i.pravatar.cc/300?img=20",
    bio: "Expert in water-saving installations and sustainable plumbing solutions. I help homeowners reduce water waste and implement eco-friendly systems that work with nature, not against it.",
    rating: 4.8,
    location: "Seattle, WA",
    specialties: ["Water Conservation", "Rainwater Harvesting", "Grey Water Systems"],
    services: ["Plumbing", "Water Conservation"],
    completedProjects: 98,
    phone: "206-555-0178",
    email: "sophia@ecoflow.example"
  },
  {
    id: "3",
    name: "Daniel Taylor",
    role: "tradesperson",
    avatar_url: "https://i.pravatar.cc/300?img=13",
    bio: "Crafting beautiful wooden furniture using sustainable, locally sourced materials. Each piece is designed to last generations and made with environmentally responsible practices.",
    rating: 4.7,
    location: "Austin, TX",
    specialties: ["Sustainable Furniture", "Reclaimed Wood", "Custom Cabinetry"],
    services: ["Carpentry", "Custom Furniture"],
    completedProjects: 87,
    phone: "512-555-0199",
    email: "daniel@woodcraft.example"
  },
  {
    id: "4",
    name: "Emma Rodriguez",
    role: "tradesperson",
    avatar_url: "https://i.pravatar.cc/300?img=23",
    bio: "Passionate about creating beautiful, sustainable landscapes that conserve water and support local wildlife. Specializing in native plant gardens and xeriscaping.",
    rating: 4.6,
    location: "Denver, CO",
    specialties: ["Xeriscaping", "Native Gardens", "Sustainable Landscapes"],
    services: ["Landscaping", "Gardening"],
    completedProjects: 63,
    phone: "303-555-0133",
    email: "emma@nativescapes.example"
  },
  {
    id: "5",
    name: "James Wilson",
    role: "tradesperson",
    avatar_url: "https://i.pravatar.cc/300?img=15",
    bio: "HVAC specialist focusing on energy-efficient climate control systems. I help homeowners reduce their environmental impact while maintaining comfort all year round.",
    rating: 4.5,
    location: "Chicago, IL",
    specialties: ["Geothermal Systems", "Heat Pumps", "Energy-Efficient HVAC"],
    services: ["HVAC", "Energy Efficiency"],
    completedProjects: 79,
    phone: "312-555-0144",
    email: "james@ecosystems.example"
  },
  {
    id: "6",
    name: "Olivia Chen",
    role: "tradesperson",
    avatar_url: "https://i.pravatar.cc/300?img=25",
    bio: "Eco-friendly interior designer specializing in non-toxic finishes and sustainable materials. Creating healthy living spaces that are beautiful and environmentally responsible.",
    rating: 4.9,
    location: "San Francisco, CA",
    specialties: ["Non-Toxic Materials", "Sustainable Design", "Green Home Makeovers"],
    services: ["Interior Design", "Home Remodeling"],
    completedProjects: 51,
    phone: "415-555-0188",
    email: "olivia@greenliving.example"
  },
  {
    id: "7",
    name: "Nathan Smith",
    role: "tradesperson",
    avatar_url: "https://i.pravatar.cc/300?img=12",
    bio: "Expert in eco-friendly roofing solutions including green roofs, solar tiles, and sustainable materials. Helping reduce energy costs and environmental impact.",
    rating: 4.7,
    location: "Portland, OR",
    specialties: ["Green Roofs", "Solar Roofing", "Sustainable Materials"],
    services: ["Roofing", "Renewable Energy"],
    completedProjects: 68,
    phone: "503-555-0155",
    email: "nathan@ecoroof.example"
  },
  {
    id: "8",
    name: "Lily Garcia",
    role: "tradesperson",
    avatar_url: "https://i.pravatar.cc/300?img=26",
    bio: "Certified insulation specialist focused on natural and recycled materials. Creating energy-efficient homes with healthier indoor air quality.",
    rating: 4.6,
    location: "Minneapolis, MN",
    specialties: ["Natural Insulation", "Air Sealing", "Energy Efficiency"],
    services: ["Insulation", "Energy Efficiency"],
    completedProjects: 93,
    phone: "612-555-0167",
    email: "lily@greencomfort.example"
  },
  {
    id: "9",
    name: "Thomas Lee",
    role: "tradesperson",
    avatar_url: "https://i.pravatar.cc/300?img=17",
    bio: "Sustainable construction expert specializing in green building practices. From tiny homes to full-scale eco-friendly renovations.",
    rating: 4.8,
    location: "Boulder, CO",
    specialties: ["Green Building", "Tiny Homes", "Eco-Renovations"],
    services: ["Construction", "Home Remodeling"],
    completedProjects: 45,
    phone: "303-555-0189",
    email: "thomas@greenbuild.example"
  }
];

// Service categories
export const serviceCategories = [
  "Electrical",
  "Plumbing",
  "Carpentry",
  "Landscaping",
  "HVAC",
  "Interior Design",
  "Roofing",
  "Insulation",
  "Construction",
  "Gardening",
  "Energy Efficiency",
  "Water Conservation",
  "Renewable Energy",
  "Home Remodeling"
];

// Popular locations
export const popularLocations = [
  "Portland, OR",
  "Seattle, WA",
  "Austin, TX",
  "Denver, CO",
  "Chicago, IL",
  "San Francisco, CA",
  "Minneapolis, MN",
  "Boulder, CO"
];
