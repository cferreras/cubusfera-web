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
        default: 'Cubusfera - Servidor Técnico de Minecraft | Comunidad Española',
        template: '%s | Cubusfera - Servidor Técnico de Minecraft'
    },
    description: 'Únete a Cubusfera, la comunidad técnica de Minecraft en español. Servidor vanilla con enfoque en redstone, granjas y proyectos técnicos. Descubre tutoriales, eventos y más.',
    keywords: ['minecraft', 'servidor técnico', 'redstone', 'granjas minecraft', 'comunidad minecraft', 'minecraft español', 'servidor vanilla'],
    openGraph: {
        type: 'website',
        locale: 'es_ES',
        url: 'https://cubusfera.com',
        title: 'Cubusfera - Servidor Técnico de Minecraft | Comunidad Española',
        description: 'Únete a Cubusfera, la comunidad técnica de Minecraft en español. Servidor vanilla con enfoque en redstone, granjas y proyectos técnicos.',
        siteName: 'Cubusfera',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Cubusfera - Servidor Técnico de Minecraft',
        description: 'Comunidad técnica de Minecraft en español. Redstone, granjas y proyectos técnicos.',
    },
    robots: {
        index: true,
        follow: true,
    }
}