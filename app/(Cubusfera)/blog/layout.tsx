import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog de Minecraft Técnico',
    description: 'Tutoriales, guías y noticias sobre redstone, granjas y técnicas avanzadas en Minecraft. Aprende a mejorar tus construcciones.',
    openGraph: {
        title: 'Blog de Minecraft Técnico',
        description: 'Tutoriales, guías y noticias sobre redstone, granjas y técnicas avanzadas en Minecraft.',
        url: 'https://cubusfera.com/blog',
        siteName: 'Cubusfera',
        locale: 'es_ES',
        type: 'website',
    },
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}