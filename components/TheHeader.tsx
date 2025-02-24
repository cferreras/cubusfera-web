"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";// Usamos un ícono de Radix UI para Discord
import Link from "next/link";
import { FileIcon } from "lucide-react";

export default function TheHeader() {
    return (
        <header className="max-w-7xl mx-auto py-20 md:py-40 text-center" >
            <h3 className="font-bold text-2xl dark:text-neutral-300 text-neutral-700">Minecraft vanilla</h3>
            <div className="flex flex-col">
                <h1 className="text-6xl sm:text-7xl 2xl:text-8xl text-center font-semibold">
                    <span className="relative -z-[1]">
                        Cubusfera
                        <img src="/squiggle.webp" alt="Squiggle" className="absolute left-0 -bottom-5 -rotate-2" />
                    </span>
                </h1>
                <p className="max-w-md sm:max-w-xl mx-auto text-neutral-600 dark:text-neutral-400 text-sm sm:text-base md:text-lg text-center mt-10">Un servidor de Minecraft diferente</p>
            </div>
        </header>
    );
}