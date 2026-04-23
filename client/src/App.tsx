import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import ChiSono from "@/pages/ChiSono";
import IlMetodo from "@/pages/IlMetodo";
import Servizi from "@/pages/Servizi";
import Formazione from "@/pages/Formazione";
import Contatti from "@/pages/Contatti";
import Galleria from "@/pages/Galleria";
import Admin from "@/pages/Admin";
import AdminLogin from "@/pages/AdminLogin";
import Risorse from "@/pages/Risorse";
import Grazie from "@/pages/Grazie";
import Workshop from "@/pages/Workshop";
import PaymentSuccess from "@/pages/PaymentSuccess";
import DownloadSuccess from "@/pages/DownloadSuccess";
import DownloadFree from "@/pages/DownloadFree";
import EbookAccess from "@/pages/EbookAccess";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect } from "react";

// Scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/chi-sono" component={ChiSono} />
        <Route path="/il-metodo" component={IlMetodo} />
        <Route path="/servizi" component={Servizi} />
        <Route path="/formazione" component={Formazione} />
        <Route path="/contatti" component={Contatti} />
        <Route path="/galleria" component={Galleria} />
        <Route path="/admin" component={Admin} />
        <Route path="/admin-login" component={AdminLogin} />
        <Route path="/risorse" component={Risorse} />
        <Route path="/grazie" component={Grazie} />
        <Route path="/workshop-di-ritratto-maschile.html" component={Workshop} />
        <Route path="/payment/success" component={PaymentSuccess} />
        <Route path="/download-success" component={DownloadSuccess} />
        <Route path="/download-free" component={DownloadFree} />
        <Route path="/ebook/accedi" component={EbookAccess} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Layout>
            <Router />
          </Layout>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
