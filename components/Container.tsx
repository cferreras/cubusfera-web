import React from 'react';

export default function Container({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`max-w-screen-xl mx-auto px-6 md:px-8 ${className}`}>
            {children}
        </div>
    );
}