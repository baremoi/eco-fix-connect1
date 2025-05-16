
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { BookingCard } from "@/components/services/BookingCard";
import { bookingsData } from "@/data/services";

const Bookings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter bookings based on search query
  const filteredBookings = bookingsData.filter(booking => 
    booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.providerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Your Bookings</h1>
          <p className="text-muted-foreground">
            Manage and track all your service bookings
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {filteredBookings.filter(b => b.status === 'upcoming').length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p>No upcoming bookings found.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredBookings
                .filter(booking => booking.status === 'upcoming')
                .map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              }
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {filteredBookings.filter(b => b.status === 'completed').length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p>No completed bookings found.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredBookings
                .filter(booking => booking.status === 'completed')
                .map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              }
            </div>
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-6">
          {filteredBookings.filter(b => b.status === 'cancelled').length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p>No cancelled bookings found.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredBookings
                .filter(booking => booking.status === 'cancelled')
                .map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              }
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bookings;
