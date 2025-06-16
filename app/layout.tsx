import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Qwen AI 聊天助手",
  description: "基于通义千问大模型的AI聊天应用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
