import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";

import HomePage from "@/pages/homePage";
import AboutPage from "@/pages/aboutPage";
import PumpsPage from "@/pages/pumpsPage";
import CablesPage from "@/pages/cablesPage";
import DrivesPage from "@/pages/drivesPage";
import MotorsPage from "@/pages/motorsPage";
import SparesPage from "@/pages/sparesPage";
import SignInPage from "@/pages/signInPage";
import GearBoxesPage from "@/pages/gearBoxesPage";
import LenisScrollProvider from "@/components/LenisScrollProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <LenisScrollProvider>
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
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </LenisScrollProvider>
    </ThemeProvider>
  );
}

export default App;
