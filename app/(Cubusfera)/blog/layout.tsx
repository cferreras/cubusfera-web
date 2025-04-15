import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog de Minecraft Técnico – Cubusfera',
    description: 'Tutoriales, guías y noticias sobre Minecraft técnico: redstone, granjas eficientes, comandos avanzados y más. Todo sobre el servidor Cubusfera.',
    keywords: ['blog minecraft', 'minecraft técnico', 'tutoriales minecraft', 'redstone', 'granjas minecraft', 'cubusfera'],
    openGraph: {
        title: 'Blog de Minecraft Técnico – Cubusfera',
        description: 'Tutoriales, guías y noticias sobre Minecraft técnico: redstone, granjas eficientes, comandos avanzados y más.',
        type: 'website',
    }
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <article className="blog-content">
            {children}
        </article>
    )
}