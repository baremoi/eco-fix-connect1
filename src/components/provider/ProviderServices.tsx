
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { BookingDialog } from "@/components/booking/BookingDialog";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  eco_rating: number;
}

interface ProviderServicesProps {
  services: Service[];
  isLoading: boolean;
  providerName: string;
  providerId?: string;
}

export default function ProviderServices({ services, isLoading, providerName, providerId }: ProviderServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  if (isLoading) {
    return (
      <div className="py-8 flex justify-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-lg mb-2">No Services Listed</h3>
        <p className="text-muted-foreground">
          {providerName} hasn't listed any services yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="h-full flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="bg-soft-green text-green-700">
                  Eco Rating: {service.eco_rating}/5
                </Badge>
              </div>
              <CardTitle className="mt-2">{service.name}</CardTitle>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Price</p>
                  <p className="text-muted-foreground">£{service.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-muted-foreground">{service.duration}</p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={() => handleBookService(service)}
                className="w-full"
              >
                Book This Service
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedService && providerId && (
        <BookingDialog
          open={isBookingOpen}
          onOpenChange={setIsBookingOpen}
          providerId={providerId}
          providerName={providerName}
          serviceId={selectedService.id}
          serviceName={selectedService.name}
          price={selectedService.price}
        />
      )}
    </>
  );
}
