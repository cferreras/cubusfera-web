import Image from 'next/image';
import { ReactNode } from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: ReactNode;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
    return (
        <div className="flex flex-col items-start p-6 bg-white dark:bg-[#172633] border border-[#E5E7EB] dark:border-[#304D69] rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 text-[#3B82F6] dark:invert dark:invert-0">
                <Image className='w-6 h-6'
                    src={icon as string}
                    width={24}
                    height={24}
                    alt={title}
                />
            </div>
            <h3 className="text-md font-semibold mb-2 text-left text-[#1F2937]">{title}</h3>
            <p className="text-[#4B5563] text-sm dark:text-[#8FADCC] text-left">{description}</p>
        </div>
    );
}