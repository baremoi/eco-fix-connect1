
import React from "react";
import { Button } from "@/components/ui/button";

interface BookingsErrorStateProps {
  onRetry: () => void;
}

export function BookingsErrorState({ onRetry }: BookingsErrorStateProps) {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Error Loading Bookings</h2>
        <p className="text-muted-foreground mb-6">
          We encountered an error while loading your bookings. Please try again later.
        </p>
        <Button onClick={onRetry}>Try Again</Button>
      </div>
    </div>
  );
}
