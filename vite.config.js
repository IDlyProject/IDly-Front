import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import { fileURLToPath } from "url";

const appDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // 푸시 알림(push/notificationclick 핸들러)을 직접 등록해야 해서
      // Workbox가 통째로 생성하는 대신 src/sw.js를 우리가 작성하고
      // 프리캐시 목록만 주입받는다.
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      registerType: "autoUpdate",
      includeAssets: ["favicon-32.png", "icons/apple-touch-icon.png"],
      manifest: {
        name: "IDly — 계정아파트",
        short_name: "IDly",
        description: "메일함을 분석해 내 계정의 보안 위험을 찾고 조치까지 안내합니다.",
        lang: "ko",
        // id를 명시하지 않으면 start_url이 앱 식별자로 쓰인다. 나중에 start_url을
        // 바꾸면 다른 앱으로 인식돼 재설치가 필요해지므로 고정해둔다.
        id: "/",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#08257E",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          {
            src: "/icons/icon-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      injectManifest: {
        // 앱 셸만 프리캐시한다. 계정·위험 정보는 항상 서버에서 받아야 하므로
        // API 응답은 캐시하지 않는다 — 낡은 보안 상태를 보여주면 안 된다.
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
      },
      // injectManifest 커스텀 SW를 개발 중 켜서 테스트하려면 type: "module"도 필요하다.
      devOptions: { enabled: false, type: "module" },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(appDir, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    globals: true,
  },
});
