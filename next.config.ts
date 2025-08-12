import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 対応する画像フォーマットを明示的に指定
    formats: ['image/webp', 'image/avif'],
    // HEIC/HEIF, SVGなどの追加フォーマットを許可
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // ローカルの画像パターンを許可
    remotePatterns: [],
    // カスタムローダーでHEIC対応
    loader: 'default',
    // デバイスサイズ設定
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
