
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
import { Button } from "@/components/ui/button";
import { DownloadIcon, Filter } from "lucide-react";

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

  // Calculate some payment statistics
  const totalPaidAmount = [...upcomingBookings, ...pastBookings]
    .filter(b => b.paymentStatus === 'paid' && b.paymentAmount)
    .reduce((sum, b) => sum + (b.paymentAmount || 0), 0);

  const pendingPayments = [...upcomingBookings, ...pastBookings]
    .filter(b => b.paymentStatus === 'pending' || b.paymentStatus === 'processing')
    .length;

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <DownloadIcon className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Payment summary cards */}
      {(totalPaidAmount > 0 || pendingPayments > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg border p-4 shadow-sm">
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Total Paid</h3>
            <p className="text-2xl font-semibold">£{totalPaidAmount.toFixed(2)}</p>
          </div>
          
          <div className="bg-white rounded-lg border p-4 shadow-sm">
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Pending Payments</h3>
            <p className="text-2xl font-semibold">{pendingPayments}</p>
          </div>
          
          <div className="bg-white rounded-lg border p-4 shadow-sm">
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Completed Bookings</h3>
            <p className="text-2xl font-semibold">{pastBookings.filter(b => b.status === 'completed').length}</p>
          </div>
        </div>
      )}

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
