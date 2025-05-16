
// Define types for our data
export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  rate: number;
  rateType: string;
  availability: string;
  providerName: string;
  providerRating: number;
}

export interface Booking {
  id: string;
  serviceName: string;
  providerName: string;
  date: string;
  time: string;
  price: number;
  status: "upcoming" | "completed" | "cancelled" | "in-progress";
}

// Sample services data
export const servicesData: Service[] = [
  {
    id: "s1",
    name: "Solar Panel Installation",
    description: "Complete solar panel installation service with premium panels and inverters. Includes assessment, design, and setup.",
    category: "renewable energy",
    rate: 2500,
    rateType: "project",
    availability: "Weekdays",
    providerName: "EcoSolar Solutions",
    providerRating: 4.8
  },
  {
    id: "s2",
    name: "Home Energy Audit",
    description: "Comprehensive energy audit to identify energy waste and recommend improvements to make your home more efficient.",
    category: "energy efficiency",
    rate: 150,
    rateType: "service",
    availability: "Mon-Sat",
    providerName: "Green Home Advisors",
    providerRating: 4.9
  },
  {
    id: "s3",
    name: "Rainwater Harvesting System",
    description: "Design and installation of rainwater collection systems for garden irrigation and other non-potable uses.",
    category: "water conservation",
    rate: 1200,
    rateType: "project",
    availability: "Weekends",
    providerName: "AquaEco Systems",
    providerRating: 4.7
  },
  {
    id: "s4",
    name: "Organic Garden Setup",
    description: "Design and setup of organic vegetable gardens using sustainable practices and local plants.",
    category: "landscaping",
    rate: 45,
    rateType: "hour",
    availability: "Tue-Sun",
    providerName: "Urban Harvest",
    providerRating: 4.5
  },
  {
    id: "s5",
    name: "EV Charging Station Installation",
    description: "Professional installation of home electric vehicle charging stations with electrical upgrades if needed.",
    category: "renewable energy",
    rate: 800,
    rateType: "project",
    availability: "Weekdays",
    providerName: "ChargePoint Pros",
    providerRating: 4.9
  },
  {
    id: "s6",
    name: "Home Insulation Upgrade",
    description: "Eco-friendly insulation solutions to improve your home's energy efficiency and reduce heating/cooling costs.",
    category: "energy efficiency",
    rate: 1500,
    rateType: "project",
    availability: "Mon-Fri",
    providerName: "Comfort Green",
    providerRating: 4.6
  },
  {
    id: "s7",
    name: "LED Lighting Conversion",
    description: "Full service conversion of your home lighting to energy-efficient LED solutions.",
    category: "energy efficiency",
    rate: 75,
    rateType: "hour",
    availability: "Mon-Sat",
    providerName: "Bright Green Electric",
    providerRating: 4.8
  },
  {
    id: "s8",
    name: "Composting System Setup",
    description: "Design and installation of home composting systems tailored to your space and needs.",
    category: "waste management",
    rate: 300,
    rateType: "service",
    availability: "Weekends",
    providerName: "Earth Cycle",
    providerRating: 4.7
  },
  {
    id: "s9",
    name: "Sustainable Flooring Installation",
    description: "Installation of eco-friendly flooring options including bamboo, cork, and reclaimed wood.",
    category: "home improvement",
    rate: 12,
    rateType: "sqft",
    availability: "Tue-Sun",
    providerName: "Green Floors Co.",
    providerRating: 4.9
  }
];

// Sample bookings data
export const bookingsData: Booking[] = [
  {
    id: "b1",
    serviceName: "Home Energy Audit",
    providerName: "Green Home Advisors",
    date: "May 25, 2025",
    time: "10:00 AM - 12:00 PM",
    price: 150,
    status: "upcoming"
  },
  {
    id: "b2",
    serviceName: "Solar Panel Installation",
    providerName: "EcoSolar Solutions",
    date: "May 18, 2025",
    time: "9:00 AM - 5:00 PM",
    price: 2500,
    status: "completed"
  },
  {
    id: "b3",
    serviceName: "LED Lighting Conversion",
    providerName: "Bright Green Electric",
    date: "May 10, 2025",
    time: "1:00 PM - 4:00 PM",
    price: 225,
    status: "completed"
  },
  {
    id: "b4",
    serviceName: "EV Charging Station Installation",
    providerName: "ChargePoint Pros",
    date: "Apr 30, 2025",
    time: "11:00 AM - 2:00 PM",
    price: 800,
    status: "cancelled"
  },
  {
    id: "b5",
    serviceName: "Organic Garden Setup",
    providerName: "Urban Harvest",
    date: "Jun 5, 2025",
    time: "9:00 AM - 2:00 PM",
    price: 225,
    status: "upcoming"
  }
];
