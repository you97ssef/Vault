import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            manifest: {
                name: "Vault by Youssef",
                short_name: "Vault",
                background_color: "#000000",
                description: "This project is an app that allows its user to generate passwords/secrets  using a key 🔑 that the user set up. That means that the passwords/secrets cannot be accessible without the right key 🔐.",
                icons: [
                    {
                        src: "/icons/icon_x48.png",
                        sizes: "48x48",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon_x72.png",
                        sizes: "72x72",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon_x96.png",
                        sizes: "96x96",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon_x128.png",
                        sizes: "128x128",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon_x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon_x365.png",
                        sizes: "365x365",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon_x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
            registerType: "autoUpdate",
            workbox: {
                clientsClaim: true,
                skipWaiting: true,
                globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf,woff2}']
            },
            devOptions: {
                enabled: true,
            },
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
