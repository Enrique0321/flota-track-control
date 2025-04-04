
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Car, Database, FileText, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar({ className }: { className?: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: "Dashboard", path: "/", icon: <Database className="w-6 h-6" /> },
    { name: "Vehículos", path: "/vehicles", icon: <Car className="w-6 h-6" /> },
    { name: "Registros", path: "/records", icon: <FileText className="w-6 h-6" /> },
    { name: "Calendario", path: "/calendar", icon: <Calendar className="w-6 h-6" /> },
  ];

  return (
    <div className={cn("h-screen bg-flotatrack-800 text-white transition-all duration-300 relative", 
      className, 
      collapsed ? "w-20" : "w-64")}>
      <div className="p-4 flex justify-between items-center border-b border-flotatrack-900">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "")}>
          {!collapsed ? (
            <h1 className="text-xl font-bold">FlotaTrack</h1>
          ) : (
            <span className="text-xl font-bold">FT</span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md text-white hover:bg-flotatrack-700"
        >
          {collapsed ? ">" : "<"}
        </button>
      </div>

      <nav className="p-2">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center p-3 rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-flotatrack-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-flotatrack-700",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
