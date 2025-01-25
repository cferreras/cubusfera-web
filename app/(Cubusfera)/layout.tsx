

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { Lexend } from "next/font/google";
const lexend = Lexend({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <body className={`bg-fixed min-h-screen grid grid-rows-[auto_1fr_auto] ${lexend.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          <main>
            {children}
          </main>
          <Footer />

        </ThemeProvider>
      </body>
    </>
  );
}
