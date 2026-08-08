import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";

import HomePage from "@/pages/home.page";
import SigninPage from "@/pages/signin.page";
import PublicRoute from "@/routes/public.route";
import PrivateRoute from "@/routes/private.route";
import LenisScrollProvider from "@/components/LenisScrollProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <LenisScrollProvider>
        <Router>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SigninPage />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<>Dashboard Content</>} />
              <Route path="/employees" element={<>Employees Content</>} />
              <Route path="/products" element={<>Products Content</>} />
              <Route path="/companies" element={<>Companies Content</>} />
              <Route path="/settings" element={<>Settings Content</>} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </LenisScrollProvider>
    </ThemeProvider>
  );
}

export default App;
