import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest(() => {
  return {
    name: "twitter comic reader",
    version: "1.0",
    manifest_version: 3,
    icons: {
      "16": "images/icon.png",
      "48": "images/icon.png",
      "128": "images/icon.png",
    },
    content_scripts: [
      {
        matches: ["http://*.twitter.com/*", "https://*.twitter.com/*"],
        js: ["./src/content-scripts/main.ts"],
      },
    ],
  };
});
