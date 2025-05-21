
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { bookingService } from "@/services/bookingService";
import { toast } from "sonner";

export function useBookings(userId: string | undefined) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [reviewBookingId, setReviewBookingId] = useState<string | null>(null);
  const [reviewProviderId, setReviewProviderId] = useState<string | null>(null);
  const [reviewProviderName, setReviewProviderName] = useState<string | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const { 
    data: bookings = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['userBookings'],
    queryFn: () => bookingService.getBookingsForUser(),
    enabled: !!userId,
  });

  // Filter bookings based on active tab
  const upcomingBookings = bookings.filter(booking => 
    booking.status === 'pending' || booking.status === 'confirmed'
  );
  
  const pastBookings = bookings.filter(booking => 
    booking.status === 'completed' || booking.status === 'cancelled'
  );

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const success = await bookingService.cancelBooking(bookingId);
      if (success) {
        toast.success("Booking cancelled successfully");
        refetch();
      } else {
        toast.error("Failed to cancel booking. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while cancelling the booking.");
      console.error("Cancel booking error:", error);
    }
  };

  const handleReviewBooking = (booking: any) => {
    setReviewBookingId(booking.id);
    setReviewProviderId(booking.providerId);
    setReviewProviderName(booking.providerName);
    setIsReviewDialogOpen(true);
  };

  const handleCompleteBooking = async (bookingId: string) => {
    try {
      const success = await bookingService.completeBooking(bookingId);
      if (success) {
        toast.success("Booking marked as completed");
        refetch();
      } else {
        toast.error("Failed to update booking. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the booking.");
      console.error("Complete booking error:", error);
    }
  };

  return {
    activeTab,
    setActiveTab,
    upcomingBookings,
    pastBookings,
    isLoading,
    error,
    refetch,
    handleCancelBooking,
    handleCompleteBooking,
    handleReviewBooking,
    reviewBookingId,
    reviewProviderId,
    reviewProviderName,
    isReviewDialogOpen,
    setIsReviewDialogOpen
  };
}
