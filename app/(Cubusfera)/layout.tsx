

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { ToastTrigger } from "@/components/ToastTrigger";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full h-screen absolute left-0 top-0 z-[-1] pointer-events-none" data-pattern="diamonds">
        <div className="w-full h-full absolute left-0 bottom-0 z-10 bg-gradient-to-t from-white to-neutral-white/0 dark:from-neutral-950 dark:to-neutral-950/0 pointer-events-none"></div>
      </div>

      <Navbar />
      <main className="w-full flex flex-col grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
