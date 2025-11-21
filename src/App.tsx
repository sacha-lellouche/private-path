import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OnboardingJourney from "./pages/OnboardingJourney";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DashboardNew from "./pages/DashboardNew";
import Investments from "./pages/Investments";
import Profile from "./pages/Profile";
import ProfileNew from "./pages/ProfileNew";
import LoginPage from "./components/LoginPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/parcours" element={<OnboardingJourney />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardNew />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/profile" element={<ProfileNew />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
