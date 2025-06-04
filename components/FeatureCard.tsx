import Image from 'next/image';
import { ReactNode } from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: ReactNode;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
    return (
        <div className="flex flex-col items-start p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4">
                <Image className='w-6 h-6'
                 src={icon as string}
                 width={24}
                 height={24}
                 alt={title}
                 />
            </div>
            <h3 className="text-md font-semibold mb-2 text-left">{title}</h3>
            <p className="text-gray-600 text-sm dark:text-gray-400 text-left">{description}</p>
        </div>
    );
}