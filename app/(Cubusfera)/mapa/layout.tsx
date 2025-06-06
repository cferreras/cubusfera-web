import React from 'react';
import { Metadata } from 'next';

interface LayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Mapa",
    description: "Mapa interactivo del servidor de Minecraft técnico Cubusfera. Explora nuestro mundo, bases y proyectos.",
    openGraph: {
        title: "Mapa",
        description: "Mapa interactivo del servidor de Minecraft técnico Cubusfera. Explora nuestro mundo, bases y proyectos.",
        type: 'website',
        url: 'https://cubusfera.com/mapa',
        images: [
            {
                url: 'https://cubusfera.com/images/default-og.jpg',
                width: 1200,
                height: 630,
                alt: 'Mapa de Cubusfera',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Mapa",
        description: "Mapa interactivo del servidor de Minecraft técnico Cubusfera. Explora nuestro mundo, bases y proyectos.",
        images: ['https://cubusfera.com/images/default-og.jpg'],
    },
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
};

export default Layout;