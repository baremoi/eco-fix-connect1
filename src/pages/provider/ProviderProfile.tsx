
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { providerProfileService } from "@/services/providerProfileService";
import { Provider } from "@/services/data/mockProviders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Star, StarHalf, Clock } from "lucide-react";

// Import components we'll create
import ProviderReviews from "@/components/provider/ProviderReviews";
import ProviderServices from "@/components/provider/ProviderServices";
import ProviderAvailability from "@/components/provider/ProviderAvailability";
import { toast } from "sonner";

export default function ProviderProfile() {
  const { providerId } = useParams<{ providerId: string }>();
  const [activeTab, setActiveTab] = useState("services");

  // Fetch provider data
  const { 
    data: provider,
    isLoading: isLoadingProvider,
    error: providerError
  } = useQuery({
    queryKey: ['provider', providerId],
    queryFn: () => providerProfileService.getProviderById(providerId as string),
    enabled: !!providerId
  });

  // Fetch provider services
  const { 
    data: services = [],
    isLoading: isLoadingServices
  } = useQuery({
    queryKey: ['providerServices', providerId],
    queryFn: () => providerProfileService.getProviderServices(providerId as string),
    enabled: !!providerId
  });

  // Fetch provider reviews
  const { 
    data: reviews = [],
    isLoading: isLoadingReviews
  } = useQuery({
    queryKey: ['providerReviews', providerId],
    queryFn: () => providerProfileService.getProviderReviews(providerId as string),
    enabled: !!providerId
  });

  // Fetch provider availability
  const { 
    data: availability = [],
    isLoading: isLoadingAvailability
  } = useQuery({
    queryKey: ['providerAvailability', providerId],
    queryFn: () => providerProfileService.getProviderAvailability(providerId as string),
    enabled: !!providerId
  });

  // Handle contact button click
  const handleContact = () => {
    toast.success(`Contact request sent to ${provider?.name}!`);
  };

  // Handle booking button click
  const handleBookNow = () => {
    toast.success(`Booking with ${provider?.name} initiated!`);
  };

  if (isLoadingProvider) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <Spinner className="h-12 w-12 text-primary" />
      </div>
    );
  }

  if (providerError || !provider) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Provider Not Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find the service provider you're looking for.
          </p>
          <Button asChild>
            <a href="/trades">Browse All Service Providers</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Provider Header */}
      <div className="mb-10 md:flex items-start gap-8">
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
            <img 
              src={provider.imageUrl || "/placeholder-avatar.jpg"} 
              alt={provider.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex-grow">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{provider.name}</h1>
              <p className="text-lg text-muted-foreground">{provider.profession}</p>
              <div className="flex items-center mt-2">
                {Array(Math.floor(provider.rating))
                  .fill(0)
                  .map((_, i) => (
                    <Star key={`star-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                {provider.rating % 1 !== 0 && (
                  <StarHalf className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                )}
                <span className="ml-2 font-medium">{provider.rating}</span>
                <span className="text-muted-foreground ml-1">({provider.reviews} reviews)</span>
              </div>
              <p className="mt-2 flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>£{provider.hourlyRate}/hr</span>
              </p>
            </div>
            
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="outline" onClick={handleContact}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact
              </Button>
              <Button onClick={handleBookNow}>
                <Calendar className="mr-2 h-4 w-4" />
                Book Now
              </Button>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="font-medium text-lg mb-2">About</h2>
            <p className="text-muted-foreground">{provider.description}</p>
          </div>
        </div>
      </div>

      {/* Provider Tabs */}
      <Tabs defaultValue="services" value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="grid grid-cols-3 mb-8 w-full max-w-md">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <ProviderServices 
            services={services} 
            isLoading={isLoadingServices} 
            providerName={provider.name} 
          />
        </TabsContent>

        <TabsContent value="reviews">
          <ProviderReviews 
            reviews={reviews} 
            isLoading={isLoadingReviews}
            averageRating={provider.rating}
            totalReviews={provider.reviews}
          />
        </TabsContent>

        <TabsContent value="availability">
          <ProviderAvailability 
            availability={availability} 
            isLoading={isLoadingAvailability}
            providerName={provider.name}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
