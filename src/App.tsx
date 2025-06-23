import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SidebarInset, SidebarProvider} from "./components/ui/sidebar";
import {AppSidebar} from "./components/sidebar/app-sidebar";
import Header from "./components/sidebar/app-header";
import {Toaster} from "./components/ui/sonner";
import {ThemeProvider} from "./context/theme-provider";
import HomePage from "./pages/HomePage";
import TraceabilityBagsPage from "./pages/bags/TraceabilityBagsPage";
import TraceabilityThermoPage from "./pages/thermo/TraceabilityThermoPage";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Header />
            <div className=" @container/main  flex flex-1 flex-col gap-4 p-4 ">
              <main>
                <Routes>
                  <Route path="/bags/traceability" element={<TraceabilityBagsPage />} />
                  <Route path="/thermo/traceability" element={<TraceabilityThermoPage />} />
                  <Route path="/*" element={<HomePage />} />
                </Routes>
              </main>
            </div>
            <Toaster />
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
