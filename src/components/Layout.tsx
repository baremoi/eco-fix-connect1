import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <div className="min-h-screen flex">
      <div className="w-64 flex-shrink-0">
        <Navigation />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
} 