import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Booking } from "@/data/services";
import { Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

interface BookingCardProps {
  booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps) {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-soft-blue text-blue-700";
      case "completed":
        return "bg-soft-green text-green-700";
      case "cancelled":
        return "bg-soft-red text-red-700";
      default:
        return "bg-soft-yellow text-yellow-700";
    }
  };

  const handleCancelBooking = () => {
    toast.success(`Booking for ${booking.serviceName} has been cancelled.`);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between md:justify-start md:gap-2">
              <h3 className="font-semibold text-lg">{booking.serviceName}</h3>
              <Badge className={getStatusBadgeColor(booking.status)}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
            <p className="text-muted-foreground">{booking.providerName}</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{booking.time}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-right">
              <div className="font-medium">${booking.price}</div>
              <div className="text-sm text-muted-foreground">Total price</div>
            </div>
            {booking.status === "upcoming" && (
              <Button variant="outline" className="mt-2" onClick={handleCancelBooking}>
                Cancel Booking
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
