
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Spinner } from "@/components/ui/spinner";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { bookingService } from "@/services/bookingService";
import { toast } from "sonner";
import { useMockAuth } from "@/lib/mockAuth";
import { useNavigate } from "react-router-dom";

// Define a placeholder image for when we don't have a provider image
const DEFAULT_PROVIDER_IMAGE = "/placeholder-avatar.jpg";

export default function BookingsManagement() {
  const { user } = useMockAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");

  // Fetch user's bookings
  const { 
    data: bookings = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['userBookings'],
    queryFn: () => bookingService.getBookingsForUser(),
    enabled: !!user,
  });

  useEffect(() => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [user, navigate]);

  // Filter bookings based on active tab
  const upcomingBookings = bookings.filter(booking => booking.status === 'pending' || booking.status === 'confirmed');
  const pastBookings = bookings.filter(booking => booking.status === 'completed' || booking.status === 'cancelled');

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

  if (!user) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">
            Please log in to view your bookings.
          </p>
          <Button asChild>
            <a href="/login">Log In</a>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <Spinner className="h-12 w-12 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Error Loading Bookings</h2>
          <p className="text-muted-foreground mb-6">
            We encountered an error while loading your bookings. Please try again later.
          </p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </div>
    );
  }

  const renderBookingCard = (booking: any) => (
    <Card key={booking.id} className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{booking.serviceName}</CardTitle>
            <CardDescription>Provider: {booking.providerName}</CardDescription>
          </div>
          <Badge className={getStatusBadgeClass(booking.status)}>{capitalizeFirstLetter(booking.status)}</Badge>
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
      {booking.status === 'pending' && (
        <CardFooter className="pt-0">
          <Button
            variant="outline"
            className="w-full text-destructive hover:text-destructive"
            onClick={() => handleCancelBooking(booking.id)}
          >
            Cancel Booking
          </Button>
        </CardFooter>
      )}
    </Card>
  );

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
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming & Pending</TabsTrigger>
          <TabsTrigger value="past">Past & Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingBookings.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-lg mb-2">No Upcoming Bookings</h3>
              <p className="text-muted-foreground mb-6">
                You don't have any upcoming or pending bookings.
              </p>
              <Button asChild>
                <a href="/services">Find Services</a>
              </Button>
            </div>
          ) : (
            upcomingBookings.map(renderBookingCard)
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastBookings.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-lg mb-2">No Past Bookings</h3>
              <p className="text-muted-foreground">
                You don't have any completed or cancelled bookings.
              </p>
            </div>
          ) : (
            pastBookings.map(renderBookingCard)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Missing Badge component, let's add it
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}
