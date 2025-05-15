"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuthSessionProvider from "@/components/providers/SessionProvider";
import { usePathname } from "next/navigation";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  // Check if current path is auth page
  const isAuthPage = pathname?.startsWith('/auth');

  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSessionProvider>
          {/* Show Navigation only on non-auth pages */}
          {!isAuthPage && <Navigation />}
          
          <main className={`min-h-screen ${!isAuthPage ? 'bg-gray-50 pt-20' : ''}`}>
            {children}
          </main>
          
          {/* Show Footer only on non-auth pages */}
          {!isAuthPage && <Footer />}
        </AuthSessionProvider>
      </body>
    </html>
  );
}