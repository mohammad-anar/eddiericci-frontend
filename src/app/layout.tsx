import type { Metadata } from "next";
import { Inter, Audiowide } from "next/font/google";
import "./globals.css";
import AuthGuard from "@/providers/AuthGuard";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400", // Audiowide only has 400
  variable: "--font-audiowide",
});


export const metadata: Metadata = {
  title: 'K10 Football - AI-Powered Football Network',
  description: 'The world\'s first validated football network connecting players, coaches, and clubs through verified achievements and AI-powered matching',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${audiowide.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}
