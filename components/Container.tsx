import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export default function Container({ children, className }: ContainerProps) {
    return (
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ${className}`}>
                {children}
        </div>
    );
}