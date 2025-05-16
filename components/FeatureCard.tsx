"use client";
import { motion } from "framer-motion";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

interface FeatureCardProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
}

export default function FeatureCard({ title, description, imageSrc, imageAlt, }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "linear" }}
            viewport={{ once: true, margin: "-100px" }}
        >
            <Card className="bg-transparent border-none shadow-none">
                <article className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
                    
                    <motion.div className="w-full md:w-1/3 relative aspect-[827/640] order-1 md:order-2">
                        <Image
                            className="object-cover border dark:border-neutral-800 rounded-3xl"
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={false}
                        />
                    </motion.div>
                    
                    <div className="flex flex-col space-y-6 md:w-2/3 order-2">
                        <CardTitle className="font-bold text-4xl md:text-6xl text-left bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">
                            {title}
                        </CardTitle>
                        <CardDescription className="text-lg md:text-xl dark:text-neutral-300 text-neutral-700 text-left">
                            {description}
                        </CardDescription>
                    </div>
                    
                </article>
            </Card>
        </motion.div>
    );
}