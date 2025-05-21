
import React from "react";
import { BookingCard } from "./BookingCard";
import { BookingsEmptyState } from "./BookingsEmptyState";

interface BookingsListProps {
  bookings: any[];
  type: 'upcoming' | 'past';
  onCancel: (id: string) => void;
  onComplete: (id: string) => void;
  onReview: (booking: any) => void;
}

export function BookingsList({ bookings, type, onCancel, onComplete, onReview }: BookingsListProps) {
  if (bookings.length === 0) {
    return <BookingsEmptyState type={type} />;
  }

  return (
    <div className="space-y-4">
      {bookings.map(booking => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onCancel={onCancel}
          onComplete={onComplete}
          onReview={onReview}
        />
      ))}
    </div>
  );
}
