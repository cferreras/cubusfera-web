import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Miembros',
    description: 'Explora la lista de jugadores que forman parte de nuestra comunidad en el servidor de Minecraft técnico Cubusfera.',
    openGraph: {
        title: 'Miembros',
        description: 'Explora la lista de jugadores que forman parte de nuestra comunidad en el servidor de Minecraft técnico Cubusfera.',
        type: 'website',
        url: 'https://cubusfera.com/miembros',
        images: [
            {
                url: 'https://cubusfera.com/images/default-og.jpg',
                width: 1200,
                height: 630,
                alt: 'Miembros de Cubusfera',
            }
        ],
        siteName: 'Cubusfera',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Miembros',
        description: 'Explora la lista de jugadores que forman parte de nuestra comunidad en el servidor de Minecraft técnico Cubusfera.',
        images: ['https://cubusfera.com/images/default-og.jpg'],
    },
};

export default function MiembrosLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}