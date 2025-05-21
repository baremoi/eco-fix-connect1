
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Star } from "lucide-react";
import { Badge } from "../ui/badge";

interface BookingCardProps {
  booking: {
    id: string;
    providerId: string;
    providerName: string;
    serviceName: string;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    notes?: string;
  };
  onCancel: (id: string) => void;
  onComplete: (id: string) => void;
  onReview: (booking: any) => void;
}

export function BookingCard({ booking, onCancel, onComplete, onReview }: BookingCardProps) {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case 'pending':
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case 'completed':
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case 'cancelled':
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{booking.serviceName}</CardTitle>
            <CardDescription>Provider: {booking.providerName}</CardDescription>
          </div>
          <Badge className={getStatusBadgeClass(booking.status)}>
            {capitalizeFirstLetter(booking.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{booking.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{booking.time}</span>
          </div>
        </div>
        {booking.notes && (
          <div className="mt-4">
            <p className="text-sm font-medium">Notes</p>
            <p className="text-sm text-muted-foreground">{booking.notes}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 flex gap-2">
        {booking.status === 'pending' && (
          <Button
            variant="outline"
            className="flex-1 text-destructive hover:text-destructive"
            onClick={() => onCancel(booking.id)}
          >
            Cancel Booking
          </Button>
        )}
        {booking.status === 'confirmed' && (
          <>
            <Button
              variant="outline"
              className="flex-1 text-destructive hover:text-destructive"
              onClick={() => onCancel(booking.id)}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onComplete(booking.id)}
            >
              Mark Completed
            </Button>
          </>
        )}
        {booking.status === 'completed' && (
          <Button 
            className="flex-1"
            onClick={() => onReview(booking)}
          >
            <Star className="mr-2 h-4 w-4" />
            Leave Review
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
