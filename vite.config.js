import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: "localhost", // Set to 'localhost'
  //   port: 3000, // Custom port number
  // },
});
