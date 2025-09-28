import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Removed lovable-tagger to prevent malformed URL requests causing ERR_NAME_NOT_RESOLVED

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
