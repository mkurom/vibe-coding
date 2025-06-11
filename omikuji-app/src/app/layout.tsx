import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "おみくじアプリ - 今日の運勢を占おう",
  description: "Material Design 3スタイルの美しいおみくじアプリです。毎日の運勢を占って、ラッキーカラーやアドバイスを受け取りましょう。",
  keywords: ["おみくじ", "運勢", "占い", "Material Design", "今日の運勢"],
  authors: [{ name: "Omikuji App" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#6750A4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${roboto.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
