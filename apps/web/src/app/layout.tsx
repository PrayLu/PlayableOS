import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlayableOS — Make Every Knowledge Playable",
  description: "AI 驱动的企业能力成长平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
