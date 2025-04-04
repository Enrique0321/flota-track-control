
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "./sidebar";
import Header from "./header";
import { useState } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <TooltipProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <Sidebar className={isSidebarOpen ? "block" : "hidden md:block"} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
}
