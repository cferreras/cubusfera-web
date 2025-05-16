"use client";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTACard() {
    return (
        <Card className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 shadow-lg rounded-3xl overflow-hidden relative">
            
            <CardContent className="text-center max-w-4xl mx-auto space-y-8 p-8 md:p-12 lg:p-16">
                <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "linear" }}
                    viewport={{ once: true }}
                >
                    <CardTitle className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">
                        ¿Estás listo para unirte?
                    </CardTitle>
                    <CardDescription className="text-lg md:text-xl dark:text-neutral-300 text-neutral-700 max-w-2xl mx-auto">
                        Únete a nuestra comunidad y comienza tu aventura en Cubusfera
                    </CardDescription>
                    <motion.div 
                        className="flex justify-center gap-4 pt-4"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: "linear" }}
                        viewport={{ once: true }}
                    >
                        <Link 
                            href="/formulario" 
                            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-md hover:scale-105 active:scale-100"
                        >
                            Empezar ahora
                        </Link>
                    </motion.div>
                </motion.div>
            </CardContent>
        </Card>
    );
}