import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import National from "./pages/National";
import Provincial from "./pages/Provincial";
import Comparison from "./pages/Comparison";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";

import Feedback from "./pages/Feedback";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        
        <div className="min-h-screen flex flex-col">
            <Header />
            <Navigation />
        <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/national" element={<National />} />
          <Route path="/provincial" element={<Provincial />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/feedback" element={<Feedback />} />
          
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
         
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </main>
         <Footer />
          </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
