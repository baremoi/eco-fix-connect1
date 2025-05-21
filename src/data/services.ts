
export type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  rate: number;
  rateType: string;
  availability: string;
  providerId: string;
  providerName: string;
};

export const servicesData: Service[] = [
  {
    id: "1",
    name: "Sustainable Plumbing Services",
    category: "Plumbing",
    description: "Eco-friendly plumbing solutions including water-saving fixtures, leak detection, and greywater systems installation.",
    rate: 45,
    rateType: "hour",
    availability: "Weekdays, 8am-6pm",
    providerId: "1",
    providerName: "Sarah Johnson"
  },
  {
    id: "2",
    name: "Solar Panel Installation",
    category: "Renewable Energy",
    description: "Professional installation of residential and commercial solar panel systems with battery storage options.",
    rate: 55,
    rateType: "hour",
    availability: "Mon-Sat, 9am-5pm",
    providerId: "2",
    providerName: "Michael Chen"
  },
  {
    id: "3",
    name: "Energy-Efficient Lighting",
    category: "Electrical",
    description: "LED lighting installation and smart lighting systems to reduce energy consumption and lower bills.",
    rate: 50,
    rateType: "hour",
    availability: "Mon-Fri, 8am-7pm",
    providerId: "3",
    providerName: "Emma Wilson"
  },
  {
    id: "4",
    name: "Reclaimed Wood Furniture",
    category: "Carpentry",
    description: "Custom furniture made from sustainable or reclaimed woods, built to last generations.",
    rate: 48,
    rateType: "hour",
    availability: "Weekdays, 9am-6pm",
    providerId: "4",
    providerName: "James Taylor"
  },
  {
    id: "5",
    name: "Non-Toxic Interior Painting",
    category: "Painting",
    description: "Interior painting services using only low-VOC, environmentally friendly paints that are safer for your home.",
    rate: 40,
    rateType: "hour",
    availability: "Mon-Sat, 8am-5pm",
    providerId: "5",
    providerName: "Olivia Martinez"
  },
  {
    id: "6",
    name: "Eco-Insulation Services",
    category: "Insulation",
    description: "Home insulation using natural and recycled materials to improve energy efficiency and comfort.",
    rate: 52,
    rateType: "hour",
    availability: "Tue-Sat, 9am-6pm",
    providerId: "6",
    providerName: "David Thompson"
  },
  {
    id: "7",
    name: "Green Roof Installation",
    category: "Landscaping",
    description: "Design and installation of living roofs that provide insulation, manage stormwater, and support biodiversity.",
    rate: 60,
    rateType: "hour",
    availability: "Mon-Fri, 8am-6pm",
    providerId: "2",
    providerName: "Michael Chen"
  },
  {
    id: "8",
    name: "Smart Home Automation",
    category: "Electrical",
    description: "Installation of smart thermostats, lighting, and energy monitoring systems to optimize energy usage.",
    rate: 55,
    rateType: "hour",
    availability: "Weekdays, 9am-7pm",
    providerId: "3",
    providerName: "Emma Wilson"
  },
  {
    id: "9",
    name: "Rainwater Harvesting",
    category: "Plumbing",
    description: "Installation of rainwater collection and filtration systems for garden irrigation and non-potable water uses.",
    rate: 48,
    rateType: "hour",
    availability: "Mon-Sat, 8am-6pm",
    providerId: "1",
    providerName: "Sarah Johnson"
  },
  // New services based on the provided list
  {
    id: "10",
    name: "General Home Repairs",
    category: "Handyman",
    description: "Professional handyman services for various home repairs and maintenance tasks.",
    rate: 35,
    rateType: "hour",
    availability: "Mon-Sun, 8am-8pm",
    providerId: "7",
    providerName: "Robert Miller"
  },
  {
    id: "11",
    name: "Eco-Friendly Car Wash",
    category: "Car Wash",
    description: "Mobile car washing service using biodegradable cleaning products and minimal water usage.",
    rate: 30,
    rateType: "service",
    availability: "Weekdays, 9am-5pm",
    providerId: "8",
    providerName: "Daniel Brown"
  },
  {
    id: "12",
    name: "Full Valet Service",
    category: "Valet Services",
    description: "Complete interior and exterior car valeting with premium eco-friendly products.",
    rate: 80,
    rateType: "service",
    availability: "Mon-Sat, 8am-6pm",
    providerId: "8",
    providerName: "Daniel Brown"
  },
  {
    id: "13",
    name: "Home Cleaning Service",
    category: "Cleaner (domestic)",
    description: "Thorough home cleaning using non-toxic and environmentally friendly cleaning products.",
    rate: 25,
    rateType: "hour",
    availability: "Mon-Fri, 9am-5pm",
    providerId: "9",
    providerName: "Sophia Clark"
  },
  {
    id: "14",
    name: "Office & Commercial Cleaning",
    category: "Cleaner (commercial)",
    description: "Professional cleaning services for offices and commercial spaces with focus on sustainability.",
    rate: 30,
    rateType: "hour",
    availability: "Every day, 6pm-10pm",
    providerId: "9",
    providerName: "Sophia Clark"
  },
  {
    id: "15",
    name: "Interior & Exterior Painting",
    category: "Painter/Decorator",
    description: "Full painting and decorating services for homes and businesses using eco-friendly paints.",
    rate: 40,
    rateType: "hour",
    availability: "Weekdays, 8am-6pm",
    providerId: "5",
    providerName: "Olivia Martinez"
  },
  {
    id: "16",
    name: "Garden Design & Maintenance",
    category: "Gardener/Landscaper",
    description: "Sustainable garden design, planting, and maintenance with focus on native species.",
    rate: 45,
    rateType: "hour",
    availability: "Tue-Sat, 8am-7pm",
    providerId: "10",
    providerName: "Thomas Green"
  },
  {
    id: "17",
    name: "Furniture Assembly",
    category: "Furniture Assembler",
    description: "Quick and efficient furniture assembly service with recycling of packaging materials.",
    rate: 30,
    rateType: "hour",
    availability: "Mon-Sun, 9am-9pm",
    providerId: "7",
    providerName: "Robert Miller"
  },
  {
    id: "18",
    name: "Home & Office Removals",
    category: "Mover/Removal Helper",
    description: "Careful moving service with proper equipment and eco-friendly packing materials.",
    rate: 50,
    rateType: "hour",
    availability: "Mon-Sun, 7am-8pm",
    providerId: "11",
    providerName: "William Adams"
  },
  {
    id: "19",
    name: "Home Organization",
    category: "Personal Organizer",
    description: "Transform cluttered spaces with professional organization and sustainable storage solutions.",
    rate: 40,
    rateType: "hour",
    availability: "Weekdays, 10am-6pm",
    providerId: "12",
    providerName: "Emily Parker"
  },
  {
    id: "20",
    name: "Childcare Services",
    category: "Babysitter",
    description: "Reliable and experienced childcare in your home, with focus on educational activities.",
    rate: 18,
    rateType: "hour",
    availability: "Evenings and weekends",
    providerId: "13",
    providerName: "Jessica Roberts"
  },
  {
    id: "21",
    name: "Pet Sitting & Care",
    category: "Pet Sitter",
    description: "Loving care for your pets in your home while you're away, including walks and feeding.",
    rate: 20,
    rateType: "hour",
    availability: "Flexible hours",
    providerId: "14",
    providerName: "Nathan Hill"
  },
  {
    id: "22",
    name: "Mobile Hairstyling",
    category: "Hairdresser/Barber",
    description: "Professional haircuts and styling in the comfort of your home using organic hair products.",
    rate: 45,
    rateType: "service",
    availability: "Tue-Sat, 9am-7pm",
    providerId: "15",
    providerName: "Olivia Scott"
  },
  {
    id: "23",
    name: "Mobile Nail Services",
    category: "Nail Technician",
    description: "Manicure and pedicure services at your location with non-toxic, cruelty-free products.",
    rate: 35,
    rateType: "service",
    availability: "Mon-Sat, 10am-8pm",
    providerId: "16",
    providerName: "Sophia Lewis"
  },
  {
    id: "24",
    name: "Portrait Photography",
    category: "Photographer",
    description: "Capturing special moments with professional equipment and natural lighting techniques.",
    rate: 80,
    rateType: "hour",
    availability: "Weekends, 8am-8pm",
    providerId: "17",
    providerName: "James Wilson"
  },
  {
    id: "25",
    name: "Eco Courier Services",
    category: "Driver/Delivery Person",
    description: "Fast, reliable delivery service using electric vehicles for minimal environmental impact.",
    rate: 25,
    rateType: "hour",
    availability: "Mon-Fri, 9am-6pm",
    providerId: "18",
    providerName: "Michael Turner"
  },
  {
    id: "26",
    name: "Gas Appliance Safety Checks",
    category: "Gas Safe Registered Engineer",
    description: "Certified gas safety inspections and appliance servicing for homes and businesses.",
    rate: 70,
    rateType: "service",
    availability: "Mon-Fri, 8am-5pm",
    providerId: "19",
    providerName: "Christopher Lee"
  },
  {
    id: "27",
    name: "Heating & Cooling Services",
    category: "HVAC Technician",
    description: "Installation and maintenance of energy-efficient heating and cooling systems.",
    rate: 60,
    rateType: "hour",
    availability: "Mon-Sat, 8am-6pm",
    providerId: "20",
    providerName: "Daniel White"
  },
  {
    id: "28",
    name: "Scaffolding Services",
    category: "Scaffolder",
    description: "Safe and reliable scaffolding erection and dismantling for building projects.",
    rate: 200,
    rateType: "day",
    availability: "Weekdays, 7am-5pm",
    providerId: "21",
    providerName: "George Thompson"
  },
  {
    id: "29",
    name: "Roof Repairs & Installation",
    category: "Roofing Specialist",
    description: "Expert roofing services including eco-friendly materials and solar roof options.",
    rate: 55,
    rateType: "hour",
    availability: "Mon-Fri, 8am-6pm",
    providerId: "22",
    providerName: "Andrew Harris"
  },
  {
    id: "30",
    name: "Stone Masonry",
    category: "Stonemason",
    description: "Traditional stonework and restoration services for properties of all ages.",
    rate: 60,
    rateType: "hour",
    availability: "Weekdays, 8am-4pm",
    providerId: "23",
    providerName: "Peter Morgan"
  },
  {
    id: "31",
    name: "Asbestos Survey & Removal",
    category: "Asbestos Removal Specialist",
    description: "Licensed asbestos assessment and safe removal services for residential and commercial properties.",
    rate: 300,
    rateType: "day",
    availability: "Mon-Fri, 8am-5pm",
    providerId: "24",
    providerName: "Samuel Baker"
  },
  {
    id: "32",
    name: "Bricklaying Services",
    category: "Bricklayer",
    description: "Professional brickwork for extensions, garden walls, and repairs with reclaimed materials when possible.",
    rate: 220,
    rateType: "day",
    availability: "Mon-Sat, 7am-5pm",
    providerId: "25",
    providerName: "Ryan Phillips"
  },
  {
    id: "33",
    name: "Custom Carpentry",
    category: "Carpenter",
    description: "Skilled carpenter offering bespoke wooden furniture, cabinets, and structural work using sustainable timber.",
    rate: 45,
    rateType: "hour",
    availability: "Weekdays, 8am-6pm",
    providerId: "4",
    providerName: "James Taylor"
  },
  {
    id: "34",
    name: "Drainage Solutions",
    category: "Drainage Specialist",
    description: "Clearing blocked drains and installing sustainable drainage systems for flood prevention.",
    rate: 50,
    rateType: "hour",
    availability: "Mon-Sat, 8am-6pm",
    providerId: "26",
    providerName: "Kevin Mitchell"
  },
  {
    id: "35",
    name: "Security System Installation",
    category: "Security System Installer",
    description: "Modern security solutions for homes and businesses with smart integration capabilities.",
    rate: 65,
    rateType: "hour",
    availability: "Mon-Fri, 9am-5pm",
    providerId: "27",
    providerName: "Brian Cooper"
  },
  {
    id: "36",
    name: "Dog Walking Service",
    category: "Dog Walker",
    description: "Regular exercise for your canine companion with flexible scheduling and group options.",
    rate: 15,
    rateType: "hour",
    availability: "Every day, 7am-7pm",
    providerId: "28",
    providerName: "Laura Reed"
  },
  {
    id: "37",
    name: "Dog Training Classes",
    category: "Dog Trainer",
    description: "Positive reinforcement training for puppies and dogs of all ages and behaviors.",
    rate: 50,
    rateType: "session",
    availability: "Weekdays, 10am-7pm",
    providerId: "29",
    providerName: "Alex Walker"
  },
  {
    id: "38",
    name: "Mobile Dog Grooming",
    category: "Dog Groomer",
    description: "Complete dog grooming service in a mobile salon with natural, pet-friendly products.",
    rate: 45,
    rateType: "service",
    availability: "Tue-Sat, 9am-5pm",
    providerId: "30",
    providerName: "Emma Davis"
  }
];
