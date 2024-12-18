import { 
  Users, 
  ClipboardList, 
  Shield, 
  FileText, 
  MessageSquare,
  UserCircle,
  Settings,
  IdCard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  { icon: Shield, label: "Vault", path: "/vault" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 h-full w-64 glass-card border-r border-white/10">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary">Bank Manager</h2>
        </div>
        
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              if (item.dropdown) {
                return (
                  <li key={item.path}>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-full">
                        <div
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                            "hover:bg-white/10",
                            isActive ? "bg-white/10" : "text-secondary"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 bg-card/95 backdrop-blur-sm border-white/10">
                        {item.dropdown.map((dropdownItem) => (
                          <DropdownMenuItem key={dropdownItem.path}>
                            <Link
                              to={dropdownItem.path}
                              className="w-full px-2 py-1"
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

        <div className="p-4 mt-auto">
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
  );
};

export default Sidebar;