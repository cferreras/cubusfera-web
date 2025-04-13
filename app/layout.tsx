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
import type { Metadata } from 'next'

export default function GlobalLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="es" suppressHydrationWarning>
            <head />
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

export const metadata: Metadata = {
    metadataBase: new URL('https://cubusfera.com'),
    title: {
        default: 'Cubusfera - Servidor de Minecraft Técnico',
        template: '%s | Cubusfera'
    },
    description: 'Comunidad hispanohablante de Minecraft técnico con enfoque en granjas eficientes, redstone y mecanismos avanzados.',
    keywords: ['minecraft', 'servidor', 'técnico', 'vanilla', 'granjas', 'redstone', 'comunidad', 'hispanohablante'],
    authors: [{ name: 'Equipo Cubusfera' }],
    creator: 'Cubusfera',
    publisher: 'Cubusfera',
    openGraph: {
        type: 'website',
        locale: 'es_ES',
        siteName: 'Cubusfera',
        title: {
            default: 'Cubusfera - Servidor de Minecraft Técnico',
            template: '%s | Cubusfera'
        },
        description: 'Comunidad hispanohablante de Minecraft técnico con enfoque en granjas eficientes, redstone y mecanismos avanzados.',
        images: [
            {
                url: 'https://cubusfera.com/images/default-og.jpg',
                width: 1200,
                height: 630,
                alt: 'Cubusfera - Servidor de Minecraft Técnico',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: {
            default: 'Cubusfera - Servidor de Minecraft Técnico',
            template: '%s | Cubusfera'
        },
        description: 'Comunidad hispanohablante de Minecraft técnico con enfoque en granjas eficientes, redstone y mecanismos avanzados.',
        images: ['https://cubusfera.com/images/default-og.jpg'],
        creator: '@cubusfera',
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    robots: {
        index: true,
        follow: true,
    },
}