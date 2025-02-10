
import { ToastTrigger } from "@/components/ToastTrigger";
import "./globals.css";
import { ReactNode } from 'react';
export default function GlobalLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="es" suppressHydrationWarning>
            <head />
            {children}
        </html>
    )
}