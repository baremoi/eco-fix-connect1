
import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return null;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <p>Your profile information will be displayed here.</p>
    </div>
  );
} 
