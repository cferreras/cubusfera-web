import { ReactNode } from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: ReactNode;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
    return (
        <div className="flex flex-col items-center p-6 bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-primary/10 rounded-full mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-center">{description}</p>
        </div>
    );
}