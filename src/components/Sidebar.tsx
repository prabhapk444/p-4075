import { 
  Users, 
  ClipboardList, 
  Shield, 
  FileText, 
  MessageSquare,
  UserCircle,
  Settings,
  ChevronDown,
  Menu,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const menuItems = [
  { 
    icon: Users, 
    label: "Management",
    path: "/management",
    dropdown: [
      { label: "Staff", path: "/management/staff" },
      { label: "Roles", path: "/management/roles" },
      { label: "ID Cards", path: "/management/id-cards" }
    ]
  },
  { icon: ClipboardList, label: "Attendance", path: "/attendance" },
  { icon: Activity, label: "Monitoring", path: "/monitoring" },
  { icon: Shield, label: "Vault", path: "/vault" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div className={cn(
        "fixed left-0 top-0 h-full w-64 glass-card border-r border-white/10 transition-transform duration-300 ease-in-out z-40",
        "lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-primary">Bank Manager</h2>
          </div>
          
          <nav className="flex-1 px-4 space-y-1">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || 
                               (item.dropdown?.some(dropItem => location.pathname === dropItem.path));
                
                if (item.dropdown) {
                  return (
                    <li key={item.path}>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="w-full">
                          <div
                            className={cn(
                              "flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200",
                              "hover:bg-white/10",
                              isActive ? "bg-white/10" : "text-secondary"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="h-5 w-5" />
                              <span>{item.label}</span>
                            </div>
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          className="w-56 bg-card/95 backdrop-blur-sm border-white/10"
                          align="start"
                          side="right"
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <DropdownMenuItem 
                              key={dropdownItem.path}
                              className="focus:bg-white/10"
                            >
                              <Link
                                to={dropdownItem.path}
                                className="w-full px-2 py-1"
                                onClick={() => setIsMobileOpen(false)}
                              >
                                {dropdownItem.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </li>
                  );
                }

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                        "hover:bg-white/10",
                        isActive ? "bg-white/10" : "text-secondary"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 mt-auto border-t border-white/10">
            <div className="flex items-center gap-3 px-4 py-3">
              <UserCircle className="h-8 w-8 rounded-full bg-accent p-1" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Bank Admin</span>
                <span className="text-xs text-secondary">Administrator</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;