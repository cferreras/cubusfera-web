"use client";
import { motion } from "framer-motion";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { FaQuoteLeft } from "react-icons/fa6";

export default function TestimonialCard() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
        >
            <Card className="bg-transparent border-none shadow-none py-12">
                <article className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <CardTitle className="font-bold text-4xl md:text-7xl text-neutral-200 dark:text-neutral-800 mb-8">
                        <FaQuoteLeft />
                    </CardTitle>
                    <CardDescription className="text-lg md:text-2xl dark:text-neutral-300 text-neutral-800 mb-8">
                        <span className="italic">Cubusfera ha sido una experiencia increíble. La comunidad es amigable y siempre dispuesta a ayudar. He aprendido mucho sobre redstone y construcciones técnicas gracias a los otros jugadores.</span>
                    </CardDescription>
                    <div className="flex items-center gap-4">
                        <img
                            className="w-16 h-16 object-cover aspect-square border-2 dark:border-neutral-800 rounded-full"
                            src="https://cdn.discordapp.com/avatars/708420077577306214/322bedf8eee913a337d8a04340598190.png"
                            alt="Avatar de Santi"
                        />
                        <div className="text-left">
                            <div className="font-semibold text-xl">Santi</div>
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">Moderador de Cubusfera</span>
                        </div>
                    </div>
                </article>
            </Card>
        </motion.div>
    );
}