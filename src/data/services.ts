
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
  }
];
