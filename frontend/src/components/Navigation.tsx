import { NavLink } from "react-router-dom";
import { 
  BarChart3, 
  Building2, 
  GitCompare, 
  MessageSquare, 
  Home,
  Contact,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation: React.FC = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/national", icon: BarChart3, label: "National Budget" },
    { to: "/provincial", icon: Building2, label: "Provincial Budget" },
    { to: "/comparison", icon: GitCompare, label: "Comparison" },
    { to: "/feedback", icon: MessageSquare, label: "Feedback" },
    { to: "/contact", icon: Contact, label: "Contact" },
    { to: "/about", icon: Info, label: "About Us" },
  ];

  return (
    <nav className="bg-card shadow-lg border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center h-16 relative">
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`
                }
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" className="md:hidden absolute right-4">
            <BarChart3 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
