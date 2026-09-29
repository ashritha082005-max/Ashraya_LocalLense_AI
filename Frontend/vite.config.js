import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  base: "/Ashraya_LocalLense_AI/",

  server: {
    port: 3000,
    strictPort: true
  }
});