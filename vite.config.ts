import commonjs from "@rollup/plugin-commonjs";
import react from "@vitejs/plugin-react-swc";
import { readdirSync, unlinkSync } from "fs";
import path, { extname, resolve } from "path";
import nodePolyfills from "rollup-plugin-node-polyfills";
import { Plugin, defineConfig } from "vite";

const outDir = "Extension";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "clean-up-extension-build",
      apply: "build",
      closeBundle() {
        const blackListedExtensions = [".ts"];
        const dirPath = resolve(outDir);
        const files = readdirSync(dirPath);
        files.forEach((file) => {
          const filePath = resolve(dirPath, file);
          const extension = extname(file);
          if (blackListedExtensions.includes(extension)) {
            try {
              unlinkSync(filePath);
              console.log(
                `Removed ${extension} file ${file} from the build directory "${outDir}"`,
              );
            } catch (err) {
              console.error(
                `Failed to remove ${extension} file ${file}: `,
                err,
              );
            }
          }
        });
      },
    },
  ],
  build: {
    outDir,
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
