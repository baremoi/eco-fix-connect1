
import { ReactNode } from "react";
import Navigation from "./Navigation";
import TopBar from "./TopBar";
import { useAuth } from "@/lib/AuthContext";

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, profile, logout } = useAuth();
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen max-h-screen overflow-hidden">
      <div className="w-full md:w-64 flex-shrink-0 bg-sidebar-background border-r border-sidebar-border overflow-y-auto">
        <Navigation />
      </div>
      <div className="flex flex-col flex-1">
        <TopBar user={user} profile={profile} logout={logout} />
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
