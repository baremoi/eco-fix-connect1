
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { BookingRequest, bookingService } from "@/services/bookingService";
import { useMockAuth } from "@/lib/mockAuth";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  providerId: string;
  providerName: string;
  serviceId?: string;
  serviceName?: string;
  availableTimeSlots?: string[];
  selectedDate?: Date;
  selectedTime?: string;
}

export function BookingDialog({
  open,
  onOpenChange,
  providerId,
  providerName,
  serviceId,
  serviceName,
  availableTimeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"],
  selectedDate,
  selectedTime
}: BookingDialogProps) {
  const { user } = useMockAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(selectedDate || new Date());
  const [time, setTime] = useState<string>(selectedTime || "");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please log in to book an appointment");
      navigate("/login");
      onOpenChange(false);
      return;
    }

    if (!date) {
      toast.error("Please select a date for your appointment");
      return;
    }

    if (!time) {
      toast.error("Please select a time for your appointment");
      return;
    }

    try {
      setIsSubmitting(true);

      const bookingData: BookingRequest = {
        providerId,
        serviceId,
        date: format(date, "yyyy-MM-dd"),
        time,
        notes
      };

      await bookingService.createBooking(bookingData);
      
      toast.success("Booking request submitted successfully!");
      onOpenChange(false);

      // Redirect to bookings page
      navigate("/bookings");
    } catch (error) {
      toast.error("Failed to submit booking request. Please try again.");
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book an Appointment</DialogTitle>
          <DialogDescription>
            Schedule an appointment with {providerName}
            {serviceName ? ` for ${serviceName}` : ""}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4 space-y-1">
              <p className="text-sm font-medium">Select Date</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="col-span-4 space-y-1">
              <p className="text-sm font-medium">Select Time</p>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    {time ? time : <span className="text-muted-foreground">Select a time</span>}
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {availableTimeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-4 space-y-1">
              <p className="text-sm font-medium">Additional Notes (Optional)</p>
              <Textarea
                placeholder="Describe your project or any specific requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!date || !time || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Book Appointment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
