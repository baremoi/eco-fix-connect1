import { useState } from "react";
import { Icons } from "@/components/ui/icons";

export default function Analytics() {
  const [isLoading] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      <p>Platform analytics and metrics will be displayed here.</p>
    </div>
  );
} 