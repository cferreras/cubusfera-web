"use client";
import { motion } from "framer-motion";

export default function TheHeader() {
    return (
        <header className="max-w-7xl mx-auto py-20 md:py-40 text-center" >
            <motion.h3 
                className="font-bold text-2xl dark:text-neutral-300 text-neutral-700"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Minecraft vanilla
            </motion.h3>
            <div className="flex flex-col">
                <motion.h1 
                    className="text-6xl sm:text-7xl 2xl:text-8xl text-center font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <motion.span 
                        className="relative -z-[1]"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Cubusfera
                        <motion.img 
                            src="/squiggle.webp" 
                            alt="Squiggle" 
                            className="absolute left-0 -bottom-5 -rotate-2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            whileHover={{ rotate: -5 }}
                        />
                    </motion.span>
                </motion.h1>
                <motion.p 
                    className="max-w-md sm:max-w-xl mx-auto text-neutral-600 dark:text-neutral-400 text-sm sm:text-base md:text-lg text-center mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                >
                    Un servidor de Minecraft diferente
                </motion.p>
            </div>
        </header>
    );
}