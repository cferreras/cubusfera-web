"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaPencil } from "react-icons/fa6";

export default function CTACard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ scale: 1.02 }}
        >
            <Card className="flex flex-col md:flex-row gap-4 justify-between items-center md:p-16 p-8 bg-neutral-900 dark:border-neutral-800 rounded-3xl !mt-8">
                <div className="flex flex-col gap-4 justify-start">
                    <div className="text-3xl md:text-5xl font-bold text-white">
                        Comienza a jugar ahora
                    </div>
                    <div className="text-white opacity-75 text-xl">
                        Disfruta de una experiencia en Minecraft sin igual.
                    </div>
                </div>
                <Button
                    asChild
                    variant="secondary"
                    className="h-14 px-5 bg-white hover:bg-neutral-200 disabled:bg-neutral-400 text-base text-black rounded-lg enabled:cursor-pointer"
                >
                    <Link href="/formulario" className="flex items-center gap-x-2 mr-auto md:mr-0">
                        <FaPencil className="h-5 w-5" />
                        <span>Aplica a Cubusfera</span>
                    </Link>
                </Button>
            </Card>
        </motion.div>
    );
}