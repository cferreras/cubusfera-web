"use client"
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from 'react';
import { Lexend } from 'next/font/google'
const lexend = Lexend({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es"  >
      <body className={`bg-amber-100 bg-fixed text-gray-600 ${lexend.className}`}>
        <Navbar />
        <div>
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
