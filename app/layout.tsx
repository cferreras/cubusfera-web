import { ThemeProvider } from "@/components/theme-provider"
import { ReactNode } from 'react'
import { Geist } from "next/font/google";
const geist = Geist({ subsets: ['latin'] })
import "./globals.css"
import { Toaster } from "@/components/ui/toaster";
import { ToastTrigger } from "@/components/ToastTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export default function GlobalLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="es" suppressHydrationWarning>
            <head>
                <meta name="cz-shortcut-listen" content="false" />
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href="/favicon-light.svg"
                    media="(prefers-color-scheme: light)"
                />
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href="/favicon-dark.svg"
                    media="(prefers-color-scheme: dark)"
                />
                <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon" />
            </head>

            <body className={`bg-fixed min-h-screen grid grid-rows-[auto_1fr_auto] dark:bg-neutral-950 bg-white ${geist.className}`}>
                <main>
                    <div className="w-full h-screen absolute left-0 top-0 z-[-1] pointer-events-none" data-pattern="diamonds">
                        <div className="w-full h-full absolute left-0 bottom-0 z-10 bg-gradient-to-t from-white to-neutral-white/0 dark:from-neutral-950 dark:to-neutral-950/0 pointer-events-none"></div>
                    </div>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Navbar />
                        {children}
                    </ThemeProvider>
                    <Toaster />
                    <ToastTrigger />
                </main>
                <Footer />
                <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
            </body>
        </html>
    )
}