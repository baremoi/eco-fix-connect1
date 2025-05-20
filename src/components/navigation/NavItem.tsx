
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export type NavItemProps = {
  item: {
    title: string;
    href: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };
  active: boolean;
  onClick?: () => void;
};

export const NavItem = ({ item, active, onClick }: NavItemProps) => {
  // The navigation itself should still use Link when inside the router context
  if (item.href.startsWith('http') || !item.href.startsWith('/')) {
    // For external links or non-root paths, use anchor tags
    return (
      <a
        href={item.href}
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
          active 
            ? "bg-sidebar-primary text-sidebar-primary-foreground" 
            : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )}
      >
        <item.icon className="h-4 w-4" />
        <span>{item.title}</span>
      </a>
    );
  }

  return (
    <Link
      to={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
        active 
          ? "bg-sidebar-primary text-sidebar-primary-foreground" 
          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <item.icon className="h-4 w-4" />
      <span>{item.title}</span>
    </Link>
  );
};

export default NavItem;
