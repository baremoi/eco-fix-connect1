
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen max-h-screen overflow-hidden">
      <div className="w-full md:w-64 flex-shrink-0 overflow-y-auto">
        <Navigation />
      </div>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
} 
