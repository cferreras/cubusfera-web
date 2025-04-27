import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Formulario de Inscripción',
    description: 'Completa este formulario para unirte al servidor técnico de Minecraft de Cubusfera. Forma parte de nuestra comunidad de jugadores.',
    openGraph: {
        title: 'Formulario de Inscripción',
        description: 'Completa este formulario para unirte al servidor técnico de Minecraft de Cubusfera. Forma parte de nuestra comunidad de jugadores.',
        type: 'website',
        url: 'https://cubusfera.com/formulario',
        images: [
            {
                url: 'https://cubusfera.com/images/default-og.jpg',
                width: 1200,
                height: 630,
                alt: 'Formulario de Inscripción - Cubusfera',
            }
        ],
        siteName: 'Cubusfera',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Formulario de Inscripción',
        description: 'Completa este formulario para unirte al servidor técnico de Minecraft de Cubusfera. Forma parte de nuestra comunidad de jugadores.',
        images: ['https://cubusfera.com/images/default-og.jpg'],
    },
};

export default function FormularioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}