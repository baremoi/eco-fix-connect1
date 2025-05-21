
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { BookingDialog } from "@/components/booking/BookingDialog";

interface AvailabilitySlot {
  date: string;
  slots: string[];
}

interface ProviderAvailabilityProps {
  availability: AvailabilitySlot[];
  isLoading: boolean;
  providerName: string;
  providerId: string;
}

export default function ProviderAvailability({ 
  availability, 
  isLoading, 
  providerName,
  providerId 
}: ProviderAvailabilityProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Format date to match API format
  const formattedSelectedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
  
  // Find available slots for selected date
  const availableSlots = availability.find(a => a.date === formattedSelectedDate)?.slots || [];
  
  // Create a list of dates with availability
  const availableDates = availability.map(a => new Date(a.date));

  const handleBookAppointment = () => {
    if (!selectedTime) {
      return;
    }
    
    setIsBookingOpen(true);
  };

  const isDateAvailable = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    return availability.some(a => a.date === formattedDate);
  };

  if (isLoading) {
    return (
      <div className="py-8 flex justify-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  if (availability.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-lg mb-2">No Availability Listed</h3>
        <p className="text-muted-foreground">
          {providerName} hasn't set their availability calendar yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>Available dates are highlighted</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => !isDateAvailable(date)}
              className="rounded-md border pointer-events-auto"
            />
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Available Time Slots</CardTitle>
            <CardDescription>
              {selectedDate ? (
                <>Select a time slot on {formattedSelectedDate}</>
              ) : (
                <>Please select a date first</>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {availableSlots.length === 0 ? (
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <p className="text-muted-foreground">
                  {selectedDate
                    ? "No available slots for the selected date"
                    : "Please select a date to see available slots"}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {availableSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      className="justify-center"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
                
                <div className="pt-4 border-t">
                  <Button 
                    disabled={!selectedTime} 
                    onClick={handleBookAppointment}
                    className="w-full"
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <BookingDialog
        open={isBookingOpen}
        onOpenChange={setIsBookingOpen}
        providerId={providerId}
        providerName={providerName}
        availableTimeSlots={availableSlots}
        selectedDate={selectedDate}
        selectedTime={selectedTime || undefined}
      />
    </>
  );
}
