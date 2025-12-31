import commonjs from "@rollup/plugin-commonjs";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import nodePolyfills from "rollup-plugin-node-polyfills";
import { Plugin, defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "Extension",
    rollupOptions: {
      plugins: [commonjs(), nodePolyfills() as Plugin],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      events: "rollup-plugin-node-polyfills/polyfills/events",
    },
  },
});
