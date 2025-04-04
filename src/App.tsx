
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/main-layout";
import DashboardPage from "./pages/dashboard/Index";
import VehiclesPage from "./pages/vehicles/Index";
import NewVehiclePage from "./pages/vehicles/New";
import RecordsPage from "./pages/records/Index";
import NewRecordPage from "./pages/records/New";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          } />
          <Route path="/vehicles" element={
            <MainLayout>
              <VehiclesPage />
            </MainLayout>
          } />
          <Route path="/vehicles/new" element={
            <MainLayout>
              <NewVehiclePage />
            </MainLayout>
          } />
          <Route path="/records" element={
            <MainLayout>
              <RecordsPage />
            </MainLayout>
          } />
          <Route path="/records/new" element={
            <MainLayout>
              <NewRecordPage />
            </MainLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
