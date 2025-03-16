'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const words = ["diferente", "técnico", "vanilla", "seguro", "único", "especial"];

export default function RotatingText() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <span className="inline-block w-[90px] text-left ml-1">
            <AnimatePresence mode="wait">
                <motion.span
                    key={words[index]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block font-medium"
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}