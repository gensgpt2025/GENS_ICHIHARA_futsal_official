import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GENS ICHIHARA - フットサル公式サイト",
  description: "千葉県市原市を拠点とするフットサルチーム「GENS ICHIHARA」の公式サイト。チーム情報、試合結果、ニュース、練習・活動情報を発信しています。",
  keywords: ["GENS ICHIHARA", "フットサル", "市原市", "千葉県", "サッカー", "スポーツ"],
  openGraph: {
    title: "GENS ICHIHARA - フットサル公式サイト",
    description: "千葉県市原市を拠点とするフットサルチーム「GENS ICHIHARA」の公式サイト",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "GENS ICHIHARA - フットサル公式サイト",
    description: "千葉県市原市を拠点とするフットサルチーム「GENS ICHIHARA」の公式サイト",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
