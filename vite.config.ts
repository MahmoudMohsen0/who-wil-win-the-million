import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svgr(), react()],
    server: {
        port: 7000,
        host: "0.0.0.0",
    },
});
