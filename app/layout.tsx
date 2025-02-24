import { ThemeProvider } from "@/components/theme-provider"
import { ReactNode } from 'react'
import { Geist } from "next/font/google";
const geist = Geist({ subsets: ['latin'] })
import "./globals.css"
export default function GlobalLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="es" suppressHydrationWarning>
            <head>
                <meta name="cz-shortcut-listen" content="false" />
            </head>

            <body className={`bg-fixed min-h-screen grid grid-rows-[auto_1fr_auto] dark:bg-neutral-950 bg-white ${geist.className}`}>
            <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                > {children}
                </ThemeProvider>
            </body>
        </html>
    )
}