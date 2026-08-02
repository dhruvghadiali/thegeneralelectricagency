import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";

import HomePage from "@/pages/homePage";
import SigninPage from "@/pages/signinPage";
import LenisScrollProvider from "@/components/LenisScrollProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <LenisScrollProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/dashboard" element={<>Dashboard Content</>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </LenisScrollProvider>
    </ThemeProvider>
  );
}

export default App;
