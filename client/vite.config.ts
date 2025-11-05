import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "January Calc",
                short_name: "Calc",
                start_url: "/january-calc/",
                scope: "/january-calc/",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#007acc",
                icons: [
                    {
                        src: "/january-calc/pwa-192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/january-calc/pwa-512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
    base: "/january-calc/",
});
