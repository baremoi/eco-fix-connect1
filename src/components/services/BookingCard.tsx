
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Booking } from "@/data/services";
import { Calendar, Clock } from "lucide-react";
import { toast } from "sonner";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { useAuth } from "@/lib/AuthContext";
import { reviewService } from "@/services/reviewService";
import { StarRating } from "@/components/reviews/StarRating";

interface BookingCardProps {
  booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps) {
  const { user } = useAuth();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  
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
  
  const checkIfReviewed = async () => {
    if (!user || !booking.id || hasReviewed || isChecking) return;
    
    setIsChecking(true);
    try {
      const exists = await reviewService.checkReviewExists(user.id, booking.id);
      setHasReviewed(exists);
    } catch (error) {
      console.error("Error checking if booking is reviewed:", error);
    } finally {
      setIsChecking(false);
    }
  };
  
  // Check if user has already reviewed this booking when review button is clicked
  const handleReviewClick = async () => {
    await checkIfReviewed();
    
    if (!hasReviewed) {
      setIsReviewOpen(true);
    } else {
      toast.info("You've already reviewed this booking");
    }
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
              <div className="font-medium">£{booking.price.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Total price</div>
            </div>
            <div className="flex flex-col gap-2">
              {booking.status === "upcoming" && (
                <Button variant="outline" onClick={handleCancelBooking}>
                  Cancel Booking
                </Button>
              )}
              
              {booking.status === "completed" && (
                <Button 
                  onClick={handleReviewClick} 
                  variant="outline" 
                  className="flex items-center gap-1"
                  disabled={isChecking}
                >
                  {isChecking ? (
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <StarRating rating={1} size="sm" showEmpty={false} />
                      <span>Leave Review</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      {user && booking.tradesperson_id && (
        <ReviewForm
          open={isReviewOpen}
          onOpenChange={setIsReviewOpen}
          tradespersonId={booking.tradesperson_id}
          bookingId={booking.id}
          userId={user.id}
          tradespersonName={booking.providerName}
          onReviewSubmitted={() => setHasReviewed(true)}
        />
      )}
    </Card>
  );
}
