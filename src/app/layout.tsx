import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yafa AI | Professional Clothing Ads in Seconds",
  description: "Transform your clothing images into professional advertising photos with AI-generated models and backgrounds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full font-sans selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
