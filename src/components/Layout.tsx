
import React, { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen max-h-screen overflow-hidden">
      <div className="w-full md:w-64 flex-shrink-0 bg-sidebar-background border-r border-sidebar-border overflow-y-auto">
        <Navigation />
      </div>
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
    </div>
  );
}
