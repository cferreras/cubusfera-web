import { ThemeProvider } from "@/components/theme-provider"
import { ReactNode } from 'react'
import { Rubik } from "next/font/google";
const rubik = Rubik({ subsets: ['latin'] })
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
            <head>
                <link 
                    rel="icon" 
                    href="/favicon-light.svg" 
                    type="image/svg+xml"
                    media="(prefers-color-scheme: light)" 
                />
                <link 
                    rel="icon" 
                    href="/favicon-dark.svg" 
                    type="image/svg+xml"
                    media="(prefers-color-scheme: dark)" 
                />
                {/* Fallback for browsers that don't support media queries or SVG favicons */}
                <link 
                    rel="alternate icon" 
                    href="/favicon.ico" 
                    type="image/x-icon"
                />
            </head>
            <body className={`bg-fixed min-h-screen grid grid-rows-[auto_1fr_auto] dark:bg-[#0F1A24] bg-white ${rubik.className}`}>
                <main>
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