import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// import { ViteFaviconsPlugin } from "vite-plugin-favicon2";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svgr(), react()],
    server: {
        port: 3000,
        host: "0.0.0.0",
    },
    base: "/who-will-win-the-million/",
});
