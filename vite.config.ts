import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild }) => ({
  resolve: {
    alias: {
      "react-router-dom": "react-router",
    },
    dedupe: ["react", "react-dom", "react-router"],
  },
  build: {
    target: isSsrBuild ? "node22" : "esnext",
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
}));
