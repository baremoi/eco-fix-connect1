
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
  },
  // Additional service providers for new categories
  {
    id: "7",
    name: "Robert Miller",
    profession: "Handyman",
    rating: 4.7,
    reviews: 82,
    location: "Edinburgh",
    imageUrl: "/providers/provider-7.jpg",
    description: "Versatile handyman with over 15 years of experience in home repairs and furniture assembly. I handle everything from minor fixes to larger projects with attention to detail and quality workmanship.",
    hourlyRate: 35
  },
  {
    id: "8",
    name: "Daniel Brown",
    profession: "Eco Car Wash & Valet",
    rating: 4.8,
    reviews: 64,
    location: "Cardiff",
    imageUrl: "/providers/provider-8.jpg",
    description: "Mobile car washing and valeting service using biodegradable products and water-saving techniques. I bring all equipment to your location for convenient, eco-friendly vehicle cleaning.",
    hourlyRate: 30
  },
  {
    id: "9",
    name: "Sophia Clark",
    profession: "Professional Cleaner",
    rating: 4.9,
    reviews: 108,
    location: "Manchester",
    imageUrl: "/providers/provider-9.jpg",
    description: "Experienced cleaner for both domestic and commercial properties. I use exclusively eco-friendly cleaning products that are effective yet gentle on the environment and safe for children and pets.",
    hourlyRate: 28
  },
  {
    id: "10",
    name: "Thomas Green",
    profession: "Sustainable Landscaper",
    rating: 4.8,
    reviews: 76,
    location: "Oxford",
    imageUrl: "/providers/provider-10.jpg",
    description: "Creating beautiful outdoor spaces with a focus on native plants and sustainable practices. I design and maintain gardens that support local wildlife while requiring minimal water and maintenance.",
    hourlyRate: 45
  },
  {
    id: "11",
    name: "William Adams",
    profession: "Removal Specialist",
    rating: 4.6,
    reviews: 59,
    location: "Liverpool",
    imageUrl: "/providers/provider-11.jpg",
    description: "Professional home and office removal services with a strong team and all necessary equipment. We ensure your belongings are transported safely and efficiently to their new location.",
    hourlyRate: 50
  },
  {
    id: "12",
    name: "Emily Parker",
    profession: "Home Organizer",
    rating: 4.9,
    reviews: 47,
    location: "Cambridge",
    imageUrl: "/providers/provider-12.jpg",
    description: "Helping you declutter and organize your space for better functionality and peace of mind. I create sustainable storage solutions that work with your lifestyle and needs.",
    hourlyRate: 40
  },
  {
    id: "13",
    name: "Jessica Roberts",
    profession: "Qualified Childminder",
    rating: 5.0,
    reviews: 38,
    location: "Brighton",
    imageUrl: "/providers/provider-13.jpg",
    description: "Experienced childcare professional with qualifications in early childhood education. I provide a safe, nurturing environment with engaging activities tailored to your child's development stage.",
    hourlyRate: 18
  },
  {
    id: "14",
    name: "Nathan Hill",
    profession: "Pet Care Specialist",
    rating: 4.9,
    reviews: 42,
    location: "Southampton",
    imageUrl: "/providers/provider-14.jpg",
    description: "Reliable pet sitter who treats your animals like family. I offer walking, feeding, play time, and overnight stays to keep your pets happy and comfortable in your absence.",
    hourlyRate: 20
  },
  {
    id: "15",
    name: "Olivia Scott",
    profession: "Mobile Hairdresser",
    rating: 4.8,
    reviews: 63,
    location: "Newcastle",
    imageUrl: "/providers/provider-15.jpg",
    description: "Bringing salon-quality haircuts and styling to the comfort of your home. I use organic, cruelty-free hair products and offer the latest trends as well as classic styles.",
    hourlyRate: 45
  },
  {
    id: "16",
    name: "Sophia Lewis",
    profession: "Mobile Nail Technician",
    rating: 4.7,
    reviews: 51,
    location: "Belfast",
    imageUrl: "/providers/provider-16.jpg",
    description: "Professional nail services in the convenience of your home. I specialize in gel manicures, nail art, and pedicures using non-toxic, cruelty-free products.",
    hourlyRate: 35
  },
  {
    id: "17",
    name: "James Wilson",
    profession: "Portrait Photographer",
    rating: 4.9,
    reviews: 67,
    location: "Edinburgh",
    imageUrl: "/providers/provider-17.jpg",
    description: "Capturing beautiful moments with a natural, candid approach. I specialize in portraits, family photography, and special events with a focus on using natural lighting.",
    hourlyRate: 80
  },
  {
    id: "18",
    name: "Michael Turner",
    profession: "Eco Courier",
    rating: 4.6,
    reviews: 39,
    location: "Bristol",
    imageUrl: "/providers/provider-18.jpg",
    description: "Fast, reliable delivery services using electric vehicles and bicycles for zero-emission transportation of packages and documents across the city.",
    hourlyRate: 25
  },
  {
    id: "19",
    name: "Christopher Lee",
    profession: "Gas Safe Engineer",
    rating: 4.9,
    reviews: 84,
    location: "Sheffield",
    imageUrl: "/providers/provider-19.jpg",
    description: "Fully certified Gas Safe registered engineer specializing in boiler installations, servicing, and repairs. I ensure all gas appliances are operating safely and efficiently.",
    hourlyRate: 70
  },
  {
    id: "20",
    name: "Daniel White",
    profession: "HVAC Specialist",
    rating: 4.8,
    reviews: 72,
    location: "Leeds",
    imageUrl: "/providers/provider-20.jpg",
    description: "Installation and maintenance of energy-efficient heating, ventilation, and air conditioning systems. I help reduce energy consumption while improving indoor air quality and comfort.",
    hourlyRate: 60
  },
  {
    id: "21",
    name: "George Thompson",
    profession: "Scaffolder",
    rating: 4.7,
    reviews: 58,
    location: "Glasgow",
    imageUrl: "/providers/provider-21.jpg",
    description: "Professional scaffolding services for construction and renovation projects of all sizes. Safety is my top priority, with all work complying with current regulations.",
    hourlyRate: 25
  },
  {
    id: "22",
    name: "Andrew Harris",
    profession: "Roofing Contractor",
    rating: 4.8,
    reviews: 63,
    location: "Birmingham",
    imageUrl: "/providers/provider-22.jpg",
    description: "Experienced roofer offering repairs, replacements, and installations with traditional and eco-friendly materials including solar options and green roofing.",
    hourlyRate: 55
  },
  {
    id: "23",
    name: "Peter Morgan",
    profession: "Stonemason",
    rating: 4.9,
    reviews: 47,
    location: "Bath",
    imageUrl: "/providers/provider-23.jpg",
    description: "Traditional stonemason with skills in restoration, conservation, and new stone installations. I work with various stone types to create beautiful, lasting structures.",
    hourlyRate: 60
  },
  {
    id: "24",
    name: "Samuel Baker",
    profession: "Licensed Asbestos Removal",
    rating: 5.0,
    reviews: 52,
    location: "Manchester",
    imageUrl: "/providers/provider-24.jpg",
    description: "Fully licensed and insured asbestos removal specialist with extensive experience in safe assessment and removal from residential and commercial properties.",
    hourlyRate: 38
  },
  {
    id: "25",
    name: "Ryan Phillips",
    profession: "Bricklayer",
    rating: 4.8,
    reviews: 69,
    location: "Liverpool",
    imageUrl: "/providers/provider-25.jpg",
    description: "Skilled bricklayer for extensions, garden walls, and repairs. I work with reclaimed bricks when possible and focus on high-quality craftsmanship for structures that last.",
    hourlyRate: 28
  },
  {
    id: "26",
    name: "Kevin Mitchell",
    profession: "Drainage Engineer",
    rating: 4.7,
    reviews: 56,
    location: "Norwich",
    imageUrl: "/providers/provider-26.jpg",
    description: "Specialized in clearing blockages and installing sustainable drainage solutions. I use CCTV surveys to diagnose problems and provide long-lasting fixes.",
    hourlyRate: 50
  },
  {
    id: "27",
    name: "Brian Cooper",
    profession: "Security Installer",
    rating: 4.8,
    reviews: 61,
    location: "Cardiff",
    imageUrl: "/providers/provider-27.jpg",
    description: "Installation of modern security systems including alarms, CCTV, and smart home integration. I provide comprehensive solutions tailored to your property's specific needs.",
    hourlyRate: 65
  },
  {
    id: "28",
    name: "Laura Reed",
    profession: "Dog Walker",
    rating: 4.9,
    reviews: 43,
    location: "Brighton",
    imageUrl: "/providers/provider-28.jpg",
    description: "Reliable dog walking service with flexible scheduling. I take small groups of compatible dogs to ensure each pet gets personal attention and proper exercise.",
    hourlyRate: 15
  },
  {
    id: "29",
    name: "Alex Walker",
    profession: "Certified Dog Trainer",
    rating: 5.0,
    reviews: 37,
    location: "Oxford",
    imageUrl: "/providers/provider-29.jpg",
    description: "Using positive reinforcement techniques to train dogs of all ages. I specialize in obedience training, behavioral issues, and puppy socialization classes.",
    hourlyRate: 50
  },
  {
    id: "30",
    name: "Emma Davis",
    profession: "Mobile Dog Groomer",
    rating: 4.8,
    reviews: 48,
    location: "Cambridge",
    imageUrl: "/providers/provider-30.jpg",
    description: "Providing stress-free grooming experiences in my fully-equipped mobile salon. I use natural, pet-friendly products and specialize in all dog breeds and coat types.",
    hourlyRate: 45
  }
];
