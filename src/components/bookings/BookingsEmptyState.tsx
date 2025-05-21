
import React from "react";
import { Button } from "@/components/ui/button";

interface BookingsEmptyStateProps {
  type: 'upcoming' | 'past';
}

export function BookingsEmptyState({ type }: BookingsEmptyStateProps) {
  return (
    <div className="text-center p-8 bg-gray-50 rounded-lg">
      <h3 className="font-medium text-lg mb-2">
        {type === 'upcoming' ? 'No Upcoming Bookings' : 'No Past Bookings'}
      </h3>
      <p className="text-muted-foreground mb-6">
        {type === 'upcoming' 
          ? "You don't have any upcoming or pending bookings."
          : "You don't have any completed or cancelled bookings."}
      </p>
      {type === 'upcoming' && (
        <Button asChild>
          <a href="/services">Find Services</a>
        </Button>
      )}
    </div>
  );
}
