
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { ServiceCard } from "@/components/services/ServiceCard";
import { BookingCard } from "@/components/services/BookingCard";
import { servicesData, bookingsData, Booking } from "@/data/services";
import { NewServiceRequestDialog, ServiceRequestFormData } from "@/components/services/NewServiceRequestDialog";
import { format } from "date-fns";
import { toast } from "sonner";

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookings, setBookings] = useState(bookingsData);
  
  // Filter services based on search query and category
  const filteredServices = servicesData.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Filter bookings based on search query
  const filteredBookings = bookings.filter(booking => 
    booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get unique categories for filter dropdown
  const categories = ["all", ...new Set(servicesData.map(service => service.category))];

  const handleCreateServiceRequest = (requestData: ServiceRequestFormData) => {
    const newBooking: Booking = {
      id: (bookings.length + 1).toString(),
      serviceName: `${requestData.serviceType.charAt(0).toUpperCase()}${requestData.serviceType.slice(1)} Service`,
      providerName: "Assigned Provider", // In a real app, this would be matched to an available provider
      date: format(requestData.date, 'dd/MM/yyyy'), // UK date format
      time: requestData.timeSlot,
      status: "upcoming",
      price: 99.99, // Using number value
    };
    
    setBookings([newBooking, ...bookings]);
    toast.success("Service request submitted successfully!");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Find Services & Bookings</h1>
          <p className="text-muted-foreground">
            Browse available eco-friendly services or manage your existing bookings
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Service Request
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services or bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="services">Available Services</TabsTrigger>
          <TabsTrigger value="bookings">Your Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          {filteredServices.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p>No services found matching your search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          {filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p>You have no bookings that match your search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <NewServiceRequestDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onCreateRequest={handleCreateServiceRequest}
      />
    </div>
  );
};

export default Services;
