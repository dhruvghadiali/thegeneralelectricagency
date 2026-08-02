import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";

import HomePage from "@/pages/homePage";
import LenisScrollProvider from "@/components/LenisScrollProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <LenisScrollProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<div>Sign In Page</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </LenisScrollProvider>
    </ThemeProvider>
  );
}

export default App;
