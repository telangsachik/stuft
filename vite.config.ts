import commonjs from "@rollup/plugin-commonjs";
import react from "@vitejs/plugin-react-swc";
import { readdirSync, unlinkSync } from "fs";
import path, { parse, resolve } from "path";
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
        const extensionReplacements = { ".ts": ".js" };
        const dirPath = resolve(outDir);
        const files = readdirSync(dirPath);
        files.forEach((file) => {
          const filePath = resolve(dirPath, file);
          const { name, ext, base } = parse(filePath);
          Object.entries(extensionReplacements).forEach(
            ([extension, replacement]) => {
              const expectedReplacement = `${name}${replacement}`;
              if (extension === ext && files.includes(expectedReplacement)) {
                try {
                  unlinkSync(filePath);
                  console.log(
                    `Removed "${ext}" file "${base}" (transpiled to "${expectedReplacement}") from the build directory "${outDir}"`,
                  );
                } catch (err) {
                  console.error(
                    `Failed to remove "${ext}" file "${base}": `,
                    err,
                  );
                }
              }
            },
          );
        });
      },
    },
  ],
  build: {
    outDir,
    rollupOptions: {
      plugins: [commonjs(), nodePolyfills() as Plugin],
      input: {
        main: resolve(__dirname, "index.html"),
        background: resolve(__dirname, "public/background.ts"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
        format: "es",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      events: "rollup-plugin-node-polyfills/polyfills/events",
    },
  },
});
