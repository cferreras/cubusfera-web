import Container from "@/components/Container";
import Rules from "@/components/Rules";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Normas',
    description: 'Normas y reglas del servidor de Minecraft técnico Cubusfera. Guía de convivencia para nuestra comunidad.',
    openGraph: {
        title: 'Normas',
        description: 'Normas y reglas del servidor de Minecraft técnico Cubusfera. Guía de convivencia para nuestra comunidad.',
        type: 'website',
        url: 'https://cubusfera.com/normas',
        images: [
            {
                url: 'https://cubusfera.com/images/default-og.jpg',
                width: 1200,
                height: 630,
                alt: 'Normas de Cubusfera',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Normas',
        description: 'Normas y reglas del servidor de Minecraft técnico Cubusfera. Guía de convivencia para nuestra comunidad.',
        images: ['https://cubusfera.com/images/default-og.jpg'],
    },
}

export default function Normas() {
    return (
        <>
            <Container className="py-20">
                <div className="flex flex-col gap-1">
                    <div className="text-lg">Normas</div>
                    <p className="text-base text-muted-foreground">Estas son la normas de Cubusfera tanto para Discord como para Minecraft.</p>
                </div>
                <Rules />
            </Container>
        </>
    );
}