import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        tailwindcss(),
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'My PWA App',
                short_name: 'MyPWA',
                start_url: '/',
                display: 'standalone',
                background_color: '#ffffff',
                theme_color: '#007acc',
                icons: [
                    { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
                    { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' },
                ],
            },
        }),
    ],
});
