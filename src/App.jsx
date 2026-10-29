import { ThemeProvider } from "@/contexts/ThemeContext";

import AppRoutes from "@routes/app.routes";
import LenisScrollProvider from "@/components/LenisScrollProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <LenisScrollProvider>
        <AppRoutes />
      </LenisScrollProvider>
    </ThemeProvider>
  );
}

export default App;
