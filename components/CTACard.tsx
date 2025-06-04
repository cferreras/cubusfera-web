import Link from 'next/link';

interface CTACardProps {
    title: string;
    description: string;
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
}

export default function CTACard({
    title,
    description,
    primaryButtonText,
    primaryButtonHref,
    secondaryButtonText,
    secondaryButtonHref
}: CTACardProps) {
    return (
        <div className="w-full bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl p-8 md:p-10 shadow-sm">
            <div className="flex flex-col items-center text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl">{description}</p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link 
                        href={primaryButtonHref} 
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-colors hover:bg-primary/90"
                    >
                        {primaryButtonText}
                    </Link>
                    
                    {secondaryButtonText && secondaryButtonHref && (
                        <Link 
                            href={secondaryButtonHref} 
                            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium transition-colors hover:bg-secondary/90"
                        >
                            {secondaryButtonText}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}