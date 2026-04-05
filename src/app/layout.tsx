import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "يافا للذكاء الاصطناعي | إعلانات ملابس احترافية في ثوانٍ",
  description: "حول صور ملابسك إلى صور دعائية احترافية باستخدام عارضي أزياء وخلفيات من إنشاء الذكاء الاصطناعي.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} h-full antialiased dark`}>
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="min-h-full font-sans selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
