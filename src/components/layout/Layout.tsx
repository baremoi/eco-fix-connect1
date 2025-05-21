
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useMockAuth } from "@/lib/mockAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: LayoutProps) => {
  console.log("Public layout rendering");
  const { profile } = useMockAuth();
  const isAdmin = profile?.role === "admin";
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {isAdmin && (
        <div className="bg-amber-50 p-2 text-center">
          <Link to="/admin/dashboard">
            <Button variant="outline" size="sm" className="bg-amber-100 hover:bg-amber-200 font-medium">
              Access Admin Dashboard
            </Button>
          </Link>
        </div>
      )}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
