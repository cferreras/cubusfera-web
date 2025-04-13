import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ranking Mensual',
    description: 'Descubre los mejores jugadores del mes en el servidor de Minecraft técnico Cubusfera. Estadísticas de tiempo de juego, bloques minados y más.',
    openGraph: {
        title: 'Ranking Mensual',
        description: 'Descubre los mejores jugadores del mes en el servidor de Minecraft técnico Cubusfera. Estadísticas de tiempo de juego, bloques minados y más.',
        type: 'website',
        url: 'https://cubusfera.com/ranking',
        images: [
            {
                url: 'https://cubusfera.com/images/default-og.jpg',
                width: 1200,
                height: 630,
                alt: 'Ranking Mensual - Cubusfera',
            }
        ],
        siteName: 'Cubusfera',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ranking Mensual',
        description: 'Descubre los mejores jugadores del mes en el servidor de Minecraft técnico Cubusfera. Estadísticas de tiempo de juego, bloques minados y más.',
        images: ['https://cubusfera.com/images/default-og.jpg'],
    },
};

export default function RankingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}