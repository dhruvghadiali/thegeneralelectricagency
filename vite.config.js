import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shadcnComponent": path.resolve(__dirname, "./src/components/ui"),
      "@commonComponent": path.resolve(__dirname, "./src/components/common"),
      "@screenComponent": path.resolve(__dirname, "./src/components/screen"),
      "@Assets": path.resolve(__dirname, "./src/assets"),
      "@Redux": path.resolve(__dirname, "./src/store"),
      "@Enums": path.resolve(__dirname, "./src/enums"),
      "@Forms": path.resolve(__dirname, "./src/forms"),
      "@Api": path.resolve(__dirname, "./src/api"),
    },
  },
});
