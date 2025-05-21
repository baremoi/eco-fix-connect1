
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export function AuthRequiredState() {
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
