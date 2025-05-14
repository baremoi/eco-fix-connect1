import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <p>Welcome to your profile page, {user?.email}</p>
      {/* Profile content will go here */}
    </div>
  );
}
