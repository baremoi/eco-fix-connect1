
// Create a simple provider type definition since the imported one is missing
export interface Provider {
  id: string;
  name: string;
  profession: string;
  rating: number;
  reviews: number;
  location: string;
  imageUrl: string;
  description: string;
  hourlyRate: number;
  availability?: string[];
}

// Mock data for providers
export const mockProviders: Provider[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    profession: "Eco Plumber",
    rating: 4.9,
    reviews: 127,
    location: "London",
    imageUrl: "/providers/provider-1.jpg",
    description: "Specialized in water-saving fixtures and sustainable plumbing solutions with 10+ years of experience. I work with eco-friendly materials and focus on reducing water waste while ensuring high quality installations and repairs.",
    hourlyRate: 45
  },
  {
    id: "2",
    name: "Michael Chen",
    profession: "Solar Panel Installer",
    rating: 4.8,
    reviews: 94,
    location: "Manchester",
    imageUrl: "/providers/provider-2.jpg",
    description: "Certified solar energy specialist with expertise in residential and commercial installations. I help homeowners reduce their carbon footprint while saving on energy costs. All installations come with a 25-year warranty and free maintenance checks for the first year.",
    hourlyRate: 55
  },
  {
    id: "3",
    name: "Emma Wilson",
    profession: "Green Electrician",
    rating: 4.7,
    reviews: 86,
    location: "Birmingham",
    imageUrl: "/providers/provider-3.jpg",
    description: "Focusing on energy-efficient lighting and smart home systems to reduce carbon footprint. I specialize in LED installations, smart meters, and automation systems that help you save energy and money while making your home more comfortable.",
    hourlyRate: 50
  },
  {
    id: "4",
    name: "James Taylor",
    profession: "Sustainable Carpenter",
    rating: 4.9,
    reviews: 112,
    location: "Bristol",
    imageUrl: "/providers/provider-4.jpg",
    description: "Creating beautiful woodwork using reclaimed materials and sustainable practices. My furniture and fixtures are built to last generations, reducing waste and environmental impact. I source wood from certified sustainable forests or reclaim it from old structures.",
    hourlyRate: 48
  },
  {
    id: "5",
    name: "Olivia Martinez",
    profession: "Eco-Friendly Painter",
    rating: 4.6,
    reviews: 73,
    location: "Leeds",
    imageUrl: "/providers/provider-5.jpg",
    description: "Using only non-toxic, low-VOC paints and environmentally friendly techniques. My painting services are safe for your family, pets, and the planet. I specialize in natural finishes and eco-friendly color consultations for both interior and exterior projects.",
    hourlyRate: 40
  },
  {
    id: "6",
    name: "David Thompson",
    profession: "Insulation Specialist",
    rating: 4.8,
    reviews: 58,
    location: "Glasgow",
    imageUrl: "/providers/provider-6.jpg",
    description: "Expert in eco-friendly insulation solutions that maximize energy efficiency. I help homeowners reduce their heating and cooling costs while making their homes more comfortable. I use natural and recycled materials whenever possible and ensure proper installation for maximum effectiveness.",
    hourlyRate: 52
  }
];
