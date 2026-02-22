import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // セキュリティヘッダーの設定
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              process.env.NODE_ENV === 'production'
                ? "script-src 'self' 'unsafe-inline'"
                : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https:",
              "media-src 'self' blob:",
              "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://formsubmit.co",
              process.env.NODE_ENV === 'production'
                ? "connect-src 'self' https://formsubmit.co"
                : "connect-src 'self' https://formsubmit.co https://vercel.live",
              "worker-src 'self' blob:",
              "manifest-src 'self'",
            ].join('; '),
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: ['camera=()', 'microphone=()', 'geolocation=()', 'interest-cohort=()', 'payment=()', 'usb=()'].join(', ') },
        ],
      },
    ]
  },

  images: {
    // 対応する画像フォーマット
    formats: ['image/webp', 'image/avif'],
    // SVG を許可
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // リモート画像パターン
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
    // ローダー設定
    loader: 'default',
    // デバイスサイズ設定
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

export default nextConfig

