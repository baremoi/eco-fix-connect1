import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";

export default function Settings() {
  const { user } = useAuth();
  // We'll keep the state but comment it to avoid the unused variable warning
  // const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <p>Manage your account settings here, {user?.email}</p>
      {/* Settings content will go here */}
    </div>
  );
}
