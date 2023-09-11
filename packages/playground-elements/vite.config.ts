import * as path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import inlineCss from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";

export default ({ mode }) => {
  const env = mode || process.env.NODE_ENV;
  return defineConfig({
    plugins: [
      react(),
      inlineCss(),
      dts({
        insertTypesEntry: true,
      }),
    ],
    build: {
      minify: env === "production",
      sourcemap: env === "development",
      lib: {
        entry: path.resolve(__dirname, "src/index.lib.ts"),
        name: "index",
        formats: ["es", "umd"],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: ["react", "react-dom", "react-router-dom", "react-router"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "@playground/common": "PlaygroundCommon",
          },
        },
      },
    },
  });
};
