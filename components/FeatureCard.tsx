"use client";
import { motion } from "framer-motion";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

interface FeatureCardProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    reversed?: boolean;
}

export default function FeatureCard({ title, description, imageSrc, imageAlt, reversed = false }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
        >
            <Card className="bg-transparent border-none shadow-none">
                <article className="flex flex-col md:flex-row gap-12 items-center">
                    {!reversed && (
                        <div className="flex flex-col space-y-4 md:w-2/3">
                            <CardTitle className="font-bold text-3xl md:text-5xl text-right">
                                {title}
                            </CardTitle>
                            <CardDescription className="text-lg md:text-xl dark:text-neutral-300 text-neutral-700 text-right">
                                {description}
                            </CardDescription>
                        </div>
                    )}
                    <img
                        className="w-full md:w-1/3 object-cover aspect-[827/640] border dark:border-neutral-800 rounded-3xl"
                        src={imageSrc}
                        alt={imageAlt}
                    />
                    {reversed && (
                        <div className="flex flex-col space-y-4 md:w-2/3">
                            <CardTitle className="font-bold text-3xl md:text-5xl">
                                {title}
                            </CardTitle>
                            <CardDescription className="text-lg md:text-xl dark:text-neutral-300 text-neutral-800">
                                {description}
                            </CardDescription>
                        </div>
                    )}
                </article>
            </Card>
        </motion.div>
    );
}