import commonjs from "@rollup/plugin-commonjs";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import nodePolyfills from "rollup-plugin-node-polyfills";
import { Plugin, defineConfig } from "vite";
import webExtension from "vite-plugin-web-extension";
import { version } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    webExtension({
      additionalInputs: ["src/scripts/inPageScript.ts"],
      disableAutoLaunch: true,
      transformManifest: (manifest) => {
        manifest.version = version;
        return manifest;
      },
    }),
  ],
  build: {
    outDir: "Extension",
    emptyOutDir: true,
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
