"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useServerStatus } from '@/hooks/useServerStatus';
import RotatingText from './RotatingText';

export default function TheHeader() {
    const serverStatus = useServerStatus();

    return (
        <header className="w-full max-w-7xl mx-auto py-32 md:py-48 text-center px-6">
            <div className="flex flex-col items-center">
                <motion.div
                    className="flex items-center justify-center gap-2 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={`h-2 w-2 rounded-full ${serverStatus?.online ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                    <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                        {serverStatus?.players.online ?? '...'} jugadores online
                    </span>
                </motion.div>
                <div className="flex flex-col items-center">
                    <motion.h1
                        className="text-5xl sm:text-7xl 2xl:text-8xl text-center font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <motion.div className=" inline-block">
                            <span className="bg-gradient-to-br from-neutral-900 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
                                Cubusfera
                            </span>
                        </motion.div>
                    </motion.h1>

                    <motion.p
                        className="max-w-md sm:max-w-xl mx-auto text-neutral-600 dark:text-neutral-400 text-base sm:text-lg md:text-xl font-medium mt-8 pl-[16px]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.7 }}
                    >
                        Un servidor de Minecraft <RotatingText />
                    </motion.p>
                    
                    {/* Added description from second header */}
                    <motion.p
                        className="max-w-3xl mx-auto text-neutral-600 dark:text-neutral-400 text-base sm:text-lg mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.7 }}
                    >
                        El servidor de Minecraft técnico en español donde la comunidad, 
                        la creatividad y el conocimiento se unen para crear experiencias únicas.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap justify-center gap-4 mt-12 max-w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.7 }}
                    >
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-full shadow-sm">
                            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">IP:</span>
                            <code className="text-sm font-mono text-neutral-900 dark:text-neutral-100">cubusfera.com</code>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-full shadow-sm">
                            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Versión:</span>
                            <code className="text-sm font-mono text-neutral-900 dark:text-neutral-100">1.21.4</code>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap gap-4 mt-12 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.7 }}
                    >
                        {/* Added links from second header */}
                        <Link 
                            href="/miembros" 
                            className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-colors hover:bg-primary/90"
                        >
                            Conoce nuestra comunidad
                        </Link>
                        <Link 
                            href="/blog" 
                            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-medium transition-colors hover:bg-secondary/90"
                        >
                            Explora nuestro blog
                        </Link>
                    </motion.div>
                </div>
            </div>
        </header>
    );
}