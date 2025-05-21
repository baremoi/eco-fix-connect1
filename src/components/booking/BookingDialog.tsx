
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { BookingRequest, bookingService, PaymentDetails } from "@/services/bookingService";
import { useMockAuth } from "@/lib/mockAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { paymentService } from "@/services/paymentService";

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
  price?: number;
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
  selectedTime,
  price = 85 // Default price if not provided
}: BookingDialogProps) {
  const { user } = useMockAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(selectedDate || new Date());
  const [time, setTime] = useState<string>(selectedTime || "");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<'booking' | 'payment'>('booking');
  
  // Payment details
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [savePaymentInfo, setSavePaymentInfo] = useState(false);

  const handleNextStep = () => {
    if (!date) {
      toast.error("Please select a date for your appointment");
      return;
    }

    if (!time) {
      toast.error("Please select a time for your appointment");
      return;
    }
    
    setCurrentStep('payment');
  };

  const handlePreviousStep = () => {
    setCurrentStep('booking');
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please log in to book an appointment");
      navigate("/login");
      onOpenChange(false);
      return;
    }

    // Validate payment details
    if (!cardholderName) {
      toast.error("Please enter the cardholder name");
      return;
    }
    
    if (!paymentService.validateCardNumber(cardNumber)) {
      toast.error("Please enter a valid card number");
      return;
    }
    
    if (!expiryDate || !expiryDate.includes('/')) {
      toast.error("Please enter a valid expiry date (MM/YY)");
      return;
    }
    
    if (!cvv || cvv.length < 3) {
      toast.error("Please enter a valid CVV code");
      return;
    }

    try {
      setIsSubmitting(true);

      const paymentDetails: PaymentDetails = {
        cardholderName,
        cardNumber,
        expiryDate,
        cvv,
        amount: price
      };

      // Process payment first
      const paymentResult = await paymentService.processPayment(paymentDetails);
      
      if (!paymentResult.success) {
        toast.error(`Payment failed: ${paymentResult.error}`);
        return;
      }

      // After successful payment, create the booking
      const bookingData: BookingRequest = {
        providerId,
        serviceId,
        date: format(date as Date, "yyyy-MM-dd"),
        time,
        notes,
        paymentDetails
      };

      await bookingService.createBooking(bookingData);
      
      toast.success("Booking confirmed and payment processed successfully!");
      onOpenChange(false);

      // Redirect to bookings page
      navigate("/bookings");
    } catch (error) {
      toast.error("Failed to process payment or submit booking. Please try again.");
      console.error("Booking/payment error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Limit to 16 digits
    const limitedDigits = digits.slice(0, 16);
    
    // Add spaces after every 4 digits
    const parts = [];
    for (let i = 0; i < limitedDigits.length; i += 4) {
      parts.push(limitedDigits.slice(i, i + 4));
    }
    
    return parts.join(' ');
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length <= 2) {
      return digits;
    } else {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book an Appointment</DialogTitle>
          <DialogDescription>
            Schedule an appointment with {providerName}
            {serviceName ? ` for ${serviceName}` : ""}.
          </DialogDescription>
        </DialogHeader>
        
        {currentStep === 'booking' ? (
          <>
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

                <div className="col-span-4">
                  <div className="flex justify-between items-center border p-4 rounded-md bg-muted/50">
                    <span>Service Price:</span>
                    <span className="font-semibold">£{price.toFixed(2)}</span>
                  </div>
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
                onClick={handleNextStep}
                disabled={!date || !time || isSubmitting}
              >
                Proceed to Payment
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              <div className="flex justify-between items-center border p-4 rounded-md mb-4 bg-muted/50">
                <span>Total Amount:</span>
                <span className="font-semibold">£{price.toFixed(2)}</span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="cardholder-name">Cardholder Name</Label>
                  <Input 
                    id="cardholder-name" 
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    placeholder="John Smith"
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <div className="relative">
                    <Input 
                      id="card-number" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                      className="pl-10"
                    />
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Input 
                      id="expiry-date" 
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="123"
                      maxLength={4}
                      type="password"
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Processing..." : `Pay £${price.toFixed(2)}`}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
