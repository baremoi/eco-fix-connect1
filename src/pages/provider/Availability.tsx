
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Clock } from "lucide-react";

type TimeSlot = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const timeOptions = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
];

const Availability = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [workingHoursEnabled, setWorkingHoursEnabled] = useState<boolean>(true);
  const [workingHours, setWorkingHours] = useState({
    start: "09:00",
    end: "17:00"
  });

  // Initial schedule populated with default availability
  const [schedule, setSchedule] = useState<TimeSlot[]>(
    daysOfWeek.flatMap(day => 
      timeOptions.slice(0, -1).map((time, index) => ({
        id: `${day}-${index}`,
        day,
        startTime: time,
        endTime: timeOptions[index + 1],
        isAvailable: day !== "Saturday" && day !== "Sunday" && 
                    time >= "09:00" && time < "17:00"
      }))
    )
  );

  const handleWorkingHoursChange = (enabled: boolean) => {
    setWorkingHoursEnabled(enabled);
    
    // Update all slots according to working hours settings
    if (enabled) {
      setSchedule(prev => 
        prev.map(slot => ({
          ...slot,
          isAvailable: 
            (slot.day !== "Saturday" && slot.day !== "Sunday") && 
            slot.startTime >= workingHours.start && 
            slot.startTime < workingHours.end
        }))
      );
    }
  };

  const handleTimeSlotToggle = (slotId: string) => {
    setSchedule(prev => 
      prev.map(slot => 
        slot.id === slotId ? { ...slot, isAvailable: !slot.isAvailable } : slot
      )
    );
  };

  const handleBulkUpdate = (day: string, isAvailable: boolean) => {
    setSchedule(prev => 
      prev.map(slot => 
        slot.day === day ? { ...slot, isAvailable } : slot
      )
    );
  };

  const handleSaveAvailability = () => {
    // Here you would save the availability to the database
    toast.success("Availability settings saved successfully");
  };

  const filteredTimeSlots = schedule.filter(slot => slot.day === selectedDay);
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manage Availability</h1>
          <p className="text-muted-foreground">
            Set your working hours and availability for bookings
          </p>
        </div>
        <Button onClick={handleSaveAvailability}>
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Working Hours</CardTitle>
              <CardDescription>Set your standard working hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={workingHoursEnabled} 
                  onCheckedChange={handleWorkingHoursChange}
                />
                <Label>Enable standard working hours</Label>
              </div>
              
              {workingHoursEnabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Select 
                      value={workingHours.start} 
                      onValueChange={(value) => setWorkingHours(prev => ({ ...prev, start: value }))}
                    >
                      <SelectTrigger id="startTime">
                        <SelectValue placeholder="Start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.slice(0, -1).map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Select 
                      value={workingHours.end} 
                      onValueChange={(value) => setWorkingHours(prev => ({ ...prev, end: value }))}
                    >
                      <SelectTrigger id="endTime">
                        <SelectValue placeholder="End time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.slice(1).map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="py-4">
                <h3 className="text-sm font-medium mb-2">Non-working days</h3>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => {
                    const isDayOff = !schedule.some(
                      slot => slot.day === day && slot.isAvailable
                    );
                    
                    return (
                      <Button 
                        key={day}
                        variant={isDayOff ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => handleBulkUpdate(day, !isDayOff)}
                      >
                        {day.substring(0, 3)}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>
                Set your available time slots for each day of the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                value={selectedDay} 
                onValueChange={setSelectedDay} 
                className="w-full"
              >
                <TabsList className="grid grid-cols-7">
                  {daysOfWeek.map((day) => (
                    <TabsTrigger key={day} value={day} className="text-xs">
                      {day.substring(0, 3)}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {daysOfWeek.map((day) => (
                  <TabsContent key={day} value={day} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">{day}</h3>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleBulkUpdate(day, true)}
                        >
                          All Available
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleBulkUpdate(day, false)}
                        >
                          All Unavailable
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {filteredTimeSlots.map((slot) => (
                        <div
                          key={slot.id}
                          className={`
                            flex items-center justify-between p-3 rounded-md border 
                            ${slot.isAvailable ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}
                          `}
                        >
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{slot.startTime} - {slot.endTime}</span>
                          </div>
                          <Switch
                            checked={slot.isAvailable}
                            onCheckedChange={() => handleTimeSlotToggle(slot.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Availability;
