import { useState } from "react";
import { Icons } from "@/components/ui/icons";

export default function Team() {
  const [isLoading] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Team Management</h1>
      <p>Team member management and permissions will be displayed here.</p>
    </div>
  );
} 