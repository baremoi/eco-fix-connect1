
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { toast } from "sonner";
import { Booking } from "@/data/services";

interface BookingCardProps {
  booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps) {
  const handleManageBooking = () => {
    toast.success(`Managing booking for ${booking.serviceName}`);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge 
            variant="outline" 
            className={`mb-2 ${
              booking.status === 'upcoming' ? 'bg-soft-blue text-blue-700' :
              booking.status === 'completed' ? 'bg-soft-green text-green-700' : 
              'bg-soft-red text-red-700'
            }`}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
          <Badge variant="outline" className="bg-soft-blue text-blue-700">
            £{booking.price}
          </Badge>
        </div>
        <CardTitle className="line-clamp-1">{booking.serviceName}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm mb-4">Provider: {booking.providerName}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{booking.date} at {booking.time}</span>
        </div>
        {booking.notes && (
          <p className="mt-3 text-sm text-muted-foreground">{booking.notes}</p>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button onClick={handleManageBooking} className="w-full">Manage Booking</Button>
      </CardFooter>
    </Card>
  );
}
