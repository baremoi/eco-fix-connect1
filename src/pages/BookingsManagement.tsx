
import React, { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMockAuth } from "@/lib/mockAuth";
import { useNavigate } from "react-router-dom";
import { ReviewDialog } from "@/components/reviews/ReviewDialog";
import { BookingsList } from "@/components/bookings/BookingsList";
import { AuthRequiredState } from "@/components/bookings/AuthRequiredState";
import { BookingsErrorState } from "@/components/bookings/BookingsErrorState";
import { useBookings } from "@/hooks/useBookings";

export default function BookingsManagement() {
  const { user } = useMockAuth();
  const navigate = useNavigate();
  
  const {
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
  } = useBookings(user?.id);

  useEffect(() => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [user, navigate]);

  if (!user) {
    return <AuthRequiredState />;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <Spinner className="h-12 w-12 text-primary" />
      </div>
    );
  }

  if (error) {
    return <BookingsErrorState onRetry={refetch} />;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={(value) => setActiveTab(value as 'upcoming' | 'past')}>
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming & Pending</TabsTrigger>
          <TabsTrigger value="past">Past & Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <BookingsList 
            bookings={upcomingBookings}
            type="upcoming"
            onCancel={handleCancelBooking}
            onComplete={handleCompleteBooking}
            onReview={handleReviewBooking}
          />
        </TabsContent>

        <TabsContent value="past">
          <BookingsList 
            bookings={pastBookings}
            type="past"
            onCancel={handleCancelBooking}
            onComplete={handleCompleteBooking}
            onReview={handleReviewBooking}
          />
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      {reviewBookingId && reviewProviderId && reviewProviderName && (
        <ReviewDialog
          open={isReviewDialogOpen}
          onOpenChange={setIsReviewDialogOpen}
          bookingId={reviewBookingId}
          providerId={reviewProviderId}
          providerName={reviewProviderName}
        />
      )}
    </div>
  );
}
