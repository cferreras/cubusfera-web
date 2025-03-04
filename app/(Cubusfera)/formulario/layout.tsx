import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Formulario de Inscripción | Cubusfera',
    description: 'Completa este formulario para unirte al servidor técnico de Minecraft de Cubusfera. Forma parte de nuestra comunidad de jugadores.',
    openGraph: {
        title: 'Formulario de Inscripción | Cubusfera',
        description: 'Completa este formulario para unirte al servidor técnico de Minecraft de Cubusfera. Forma parte de nuestra comunidad de jugadores.',
        type: 'website',
        url: '/formulario',
    },
};

export default function FormularioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}