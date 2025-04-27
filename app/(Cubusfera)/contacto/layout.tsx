import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contacto',
    description: 'Ponte en contacto con el equipo de Cubusfera. Únete a nuestro servidor de Discord para hacer preguntas, compartir ideas y mantenerte al día con las últimas novedades.',
    openGraph: {
        title: 'Contacto',
        description: 'Ponte en contacto con el equipo de Cubusfera. Únete a nuestro servidor de Discord para hacer preguntas, compartir ideas y mantenerte al día con las últimas novedades.',
        type: 'website',
        url: 'https://cubusfera.com/contacto',
        images: [
            {
                url: 'https://cubusfera.com/images/default-og.jpg',
                width: 1200,
                height: 630,
                alt: 'Contacto - Cubusfera',
            }
        ],
        siteName: 'Cubusfera',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contacto',
        description: 'Ponte en contacto con el equipo de Cubusfera. Únete a nuestro servidor de Discord para hacer preguntas, compartir ideas y mantenerte al día con las últimas novedades.',
        images: ['https://cubusfera.com/images/default-og.jpg'],
    },
};

export default function ContactoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}