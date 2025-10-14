import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useState, useEffect } from "react";

import ScreenLoaderComponent from "@Components/loader/screenLoader";
import HomePage from "@/pages/homePage";
import AboutPage from "@/pages/aboutPage";
import CablesPage from "@/pages/cablesPage";
import DrivesPage from "@/pages/drivesPage";
import GearBoxesPage from "@/pages/gearBoxesPage";
import MotorsPage from "@/pages/motorsPage";
import PumpsPage from "@/pages/pumpsPage";
import SparesPage from "@/pages/sparesPage";

function App() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (isLoading) {
  //   return (
  //     <ThemeProvider defaultTheme="light">
  //       <ScreenLoaderComponent />
  //     </ThemeProvider>
  //   );
  // }

  return (
    <ThemeProvider defaultTheme="light">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/motors" element={<MotorsPage />} />
          <Route path="/drives" element={<DrivesPage />} />
          <Route path="/pumps" element={<PumpsPage />} />
          <Route path="/gear-boxes" element={<GearBoxesPage />} />
          <Route path="/cables" element={<CablesPage />} />
          <Route path="/spares" element={<SparesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
