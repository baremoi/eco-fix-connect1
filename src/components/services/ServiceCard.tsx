
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Service } from "@/data/services";
import { Link } from "react-router-dom";
import { BookingDialog } from "@/components/booking/BookingDialog";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  return (
    <>
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="bg-soft-green text-green-700 mb-2">
              {service.category}
            </Badge>
            <Badge variant="outline" className="bg-soft-blue text-blue-700">
              ${service.rate}/{service.rateType}
            </Badge>
          </div>
          <CardTitle className="line-clamp-1">
            <Link to={`/provider/${service.providerId}`} className="hover:underline">
              {service.name}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{service.description}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Available {service.availability}</span>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button onClick={handleBookNow} className="w-full">Book Now</Button>
        </CardFooter>
      </Card>

      <BookingDialog
        open={isBookingOpen}
        onOpenChange={setIsBookingOpen}
        providerId={service.providerId}
        providerName={service.providerName}
        serviceId={service.id}
        serviceName={service.name}
      />
    </>
  );
}
