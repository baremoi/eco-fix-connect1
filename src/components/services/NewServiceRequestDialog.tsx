
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";

// Sample available times
const mockAvailableTimes = [
  { time: "09:00", isAvailable: true },
  { time: "10:00", isAvailable: true },
  { time: "11:00", isAvailable: true },
  { time: "12:00", isAvailable: false },
  { time: "13:00", isAvailable: false },
  { time: "14:00", isAvailable: true },
  { time: "15:00", isAvailable: true },
  { time: "16:00", isAvailable: true },
  { time: "17:00", isAvailable: false },
];

interface NewServiceRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateRequest?: (data: ServiceRequestFormData) => void;
}

export interface ServiceRequestFormData {
  serviceType: string;
  description: string;
  location: string;
  date: Date;
  timeSlot: string;
}

export function NewServiceRequestDialog({ 
  open, 
  onOpenChange, 
  onCreateRequest 
}: NewServiceRequestDialogProps) {
  const [formData, setFormData] = useState<ServiceRequestFormData>({
    serviceType: "",
    description: "",
    location: "",
    date: new Date(),
    timeSlot: "",
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableTimes, setAvailableTimes] = useState(mockAvailableTimes);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setFormData({ ...formData, date });
      
      // In a real app, you'd fetch available times for this provider on this date
      // For now we're just showing the mock data
      setAvailableTimes(mockAvailableTimes);
    }
  };

  const handleSubmit = () => {
    // Here you would call an API to submit the request
    if (onCreateRequest && selectedDate) {
      onCreateRequest(formData);
    } else {
      toast.success("Service request submitted successfully!");
    }
    resetForm();
    onOpenChange(false);
  };
  
  const resetForm = () => {
    setFormData({
      serviceType: "",
      description: "",
      location: "",
      date: new Date(),
      timeSlot: "",
    });
    setSelectedDate(undefined);
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(isOpen) => {
        if (!isOpen) resetForm();
        onOpenChange(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request a Service</DialogTitle>
          <DialogDescription>
            Fill in the details below to request a service appointment.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="serviceType">Service Type</Label>
            <Select
              value={formData.serviceType}
              onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
            >
              <SelectTrigger id="serviceType">
                <SelectValue placeholder="Select a service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="carpentry">Carpentry</SelectItem>
                <SelectItem value="painting">Painting</SelectItem>
                <SelectItem value="landscaping">Landscaping</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what you need help with"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter your address"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
          
          <div className="grid gap-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  className="p-3 pointer-events-auto"
                  disabled={(date) => 
                    date < new Date() || 
                    date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {selectedDate && (
            <div className="grid gap-2">
              <Label>Available Time Slots</Label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((slot) => (
                  <Button
                    key={slot.time}
                    variant={formData.timeSlot === slot.time ? "default" : "outline"}
                    className={cn(
                      !slot.isAvailable && "opacity-50 cursor-not-allowed",
                      "justify-start"
                    )}
                    disabled={!slot.isAvailable}
                    onClick={() => setFormData({ ...formData, timeSlot: slot.time })}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {slot.time}
                  </Button>
                ))}
              </div>
              {availableTimes.every(slot => !slot.isAvailable) && (
                <p className="text-sm text-muted-foreground mt-2">
                  No available slots on this date. Please select another date.
                </p>
              )}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={
              !formData.serviceType ||
              !formData.description ||
              !formData.location ||
              !selectedDate ||
              !formData.timeSlot
            }
          >
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
