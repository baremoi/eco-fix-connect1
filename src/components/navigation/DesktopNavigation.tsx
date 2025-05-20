
import { Link, useLocation } from "react-router-dom";
import { NavItem } from "./NavItem";
import { NavItem as NavItemType } from "./NavItems";

type DesktopNavigationProps = {
  navItems: NavItemType[];
};

export const DesktopNavigation = ({ 
  navItems
}: DesktopNavigationProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-sidebar border-r border-sidebar-border">
      <div className="p-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-eco-600 font-display font-bold text-2xl">Eco<span className="text-sky-600">Fix</span></span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavItem 
              key={item.href} 
              item={item} 
              active={isActive(item.href)} 
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default DesktopNavigation;
