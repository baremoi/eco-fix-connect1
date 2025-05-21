
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { useMockAuth } from "@/lib/mockAuth";
import DesktopNavigation from "../navigation/DesktopNavigation";
import MobileNavigation from "../navigation/MobileNavigation";
import ProfileSection from "../navigation/ProfileSection";
import { NotificationBell } from "@/components/notifications/NotificationBell";

export default function Header() {
  const { isMobile } = useMobile();
  const { user, isLoading } = useMockAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to add shadow to header
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 0);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-background transition-shadow duration-200 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-xl font-bold flex items-center text-primary"
          >
            EcoFixConnect
          </Link>
          {!isMobile && <DesktopNavigation />}
        </div>
        
        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="h-10 w-20 bg-muted animate-pulse rounded"></div>
          ) : user ? (
            <div className="flex items-center gap-1 md:gap-3">
              {/* Notification Bell */}
              <NotificationBell />
              
              {/* User Profile Section */}
              <ProfileSection />
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="hidden sm:flex"
              >
                Log In
              </Button>
              <Button onClick={() => navigate("/register")}>Sign Up</Button>
            </>
          )}
          {isMobile && <MobileNavigation />}
        </div>
      </div>
    </header>
  );
}
