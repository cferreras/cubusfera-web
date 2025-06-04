"use client";
import Link from "next/link";
import { useServerStatus } from '@/hooks/useServerStatus';
import RotatingText from './RotatingText';
import { MINECRAFT_VERSION } from "@/constants";

export default function TheHeader() {
    const serverStatus = useServerStatus();

    return (
        <header className="max-w-screen-md mx-auto text-center px-6">
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center gap-2 pb-3">
                    <div className={`h-3 w-3 rounded-full ${serverStatus?.online ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                    <span className="text-xl font-medium text-[#1F2937] dark:text-white">
                        {serverStatus?.players.online ?? '...'} jugadores en línea
                    </span>
                </div>
                <div className="flex flex-col items-center my-4">
                    <h1 className="text-3xl text-center font-medium text-[#1F2937] dark:text-white">
                        Cubusfera
                    </h1>

                    <p className="text-3xl text-center font-medium my-6 text-[#1F2937] dark:text-white">
                        Un servidor de Minecraft diferente
                    </p>

                    <p className="mx-auto text-[#4B5563] dark:text-white text-base sm:text-md">
                        El servidor técnico de Minecraft en español donde la comunidad,
                        la creatividad y el conocimiento se unen para crear experiencias únicas.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-5">
                        <div className="flex items-center gap-2">
                            <span className="text-[#4B5563] dark:text-white">IP:</span>
                            <span className="text-[#1F2937] dark:text-neutral-100">cubusfera.com</span>
                        </div> |
                        <div className="flex items-center gap-2">
                            <span className="text-[#4B5563] dark:text-white">Versión:</span>
                            <span className="text-[#1F2937] dark:text-white">{MINECRAFT_VERSION}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-5 justify-center text-sm font-medium">
                        <Link
                            href="/miembros"
                            className="px-6 py-2.5 bg-[#3B82F6] text-white rounded-xl transition-colors hover:bg-[#60A5FA]"
                        >
                            Explora nuestra comunidad
                        </Link>
                        <Link
                            href="/blog"
                            className="px-6 py-2.5 bg-white text-[#3B82F6] border border-[#E5E7EB] rounded-xl transition-colors hover:bg-gray-50"
                        >
                            Explora nuestro blog
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}