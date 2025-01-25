import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export const metadata = {
    title: "Mapa – Cubusfera",
    description: "Mapa del servidor de Minecraft Cubusfera",
};


const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
};

export default Layout;