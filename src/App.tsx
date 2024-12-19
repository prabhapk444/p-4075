import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Index from "./pages/Index";
import Attendance from "./pages/Attendance";
import Monitoring from "./pages/Monitoring";
import Vault from "./pages/Vault";
import Reports from "./pages/Reports";
import Messages from "./pages/Messages";
import Staff from "./pages/Staff";
import Roles from "./pages/Roles";
import IdCards from "./pages/IdCards";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen bg-background">
          <Sidebar />
          <main className="flex-1 ml-64 p-8">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/monitoring" element={<Monitoring />} />
                <Route path="/vault" element={<Vault />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/management/staff" element={<Staff />} />
                <Route path="/management/roles" element={<Roles />} />
                <Route path="/management/id-cards" element={<IdCards />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;