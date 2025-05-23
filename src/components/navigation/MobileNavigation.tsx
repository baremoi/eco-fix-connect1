
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavItem } from "./NavItem";
import { NavItem as NavItemType } from "./NavItems";

type MobileNavigationProps = {
  navItems: NavItemType[];
};

export const MobileNavigation = ({ 
  navItems
}: MobileNavigationProps) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  
  const closeSheet = () => setOpen(false);
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="md:hidden sticky top-0 z-40 bg-background border-b">
      <div className="flex items-center justify-between px-4 h-14">
        <Link to="/" className="flex items-center">
          <span className="text-eco-600 font-display font-bold text-xl">Eco<span className="text-sky-600">Fix</span></span>
        </Link>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col h-full">
              <div className="mb-6">
                <p className="text-xl font-bold text-primary mb-2">Eco-Fix Connect</p>
              </div>
              <ScrollArea className="flex-1">
                <nav className="space-y-1 px-2">
                  {navItems.map((item) => (
                    <NavItem 
                      key={item.href} 
                      item={item} 
                      active={isActive(item.href)} 
                      onClick={closeSheet} 
                    />
                  ))}
                </nav>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileNavigation;
