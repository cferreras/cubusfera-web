import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog – Cubusfera',
    description: 'Blog del servidor de Minecraft Cubusfera',
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}