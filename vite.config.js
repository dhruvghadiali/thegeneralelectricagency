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
      "@ShadcnComponents": path.resolve(__dirname, "./src/components/ui"),
      "@Components": path.resolve(__dirname, "./src/components/common"),
      "@ScreenComponents": path.resolve(__dirname, "./src/components/screen"),
      "@Assets": path.resolve(__dirname, "./src/assets"),
    },
  },
});
