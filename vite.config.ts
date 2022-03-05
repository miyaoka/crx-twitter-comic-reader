import { resolve } from "path";
import { defineConfig } from "vite";
import { crx } from "rollup-plugin-chrome-extension";
import manifest from "./manifest.config";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [crx({ manifest })],
});
