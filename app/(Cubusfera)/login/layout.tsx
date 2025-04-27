import React from 'react';
import { Metadata } from 'next';

interface LayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Iniciar Sesión",
    description: "Inicia sesión con tu cuenta de Discord para acceder a todas las funcionalidades de Cubusfera.",
    openGraph: {
        title: "Iniciar Sesión",
        description: "Inicia sesión con tu cuenta de Discord para acceder a todas las funcionalidades de Cubusfera.",
        type: 'website',
        url: 'https://cubusfera.com/login',
        images: [
            {
                url: 'https://cubusfera.com/images/default-og.jpg',
                width: 1200,
                height: 630,
                alt: 'Iniciar Sesión - Cubusfera',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Iniciar Sesión",
        description: "Inicia sesión con tu cuenta de Discord para acceder a todas las funcionalidades de Cubusfera.",
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