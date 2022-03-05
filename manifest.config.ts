import { defineManifest } from "rollup-plugin-chrome-extension";

export default defineManifest(() => {
  return {
    name: "twitter comic reader",
    version: "1.0",
    manifest_version: 3,
    icons: {
      "16": "assets/icon.png",
      "48": "assets/icon.png",
      "128": "assets/icon.png",
    },
    content_scripts: [
      {
        matches: ["http://*.twitter.com/*", "https://*.twitter.com/*"],
        js: ["./src/content-scripts/main.ts"],
      },
    ],
  };
});
