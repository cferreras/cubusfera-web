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
                    <span className="text-2xl font-medium text-black dark:text-white">
                        {serverStatus?.players.online ?? '...'} jugadores en línea
                    </span>
                </div>
                <div className="flex flex-col items-center my-4">
                    <h1 className="text-3xl text-center font-medium">
                        Cubusfera
                    </h1>

                    <p className="text-3xl text-center font-medium my-6">
                        Un servidor de Minecraft diferente
                    </p>

                    <p className="mx-auto text-black dark:text-white text-base sm:text-md">
                        El servidor técnico de Minecraft en español donde la comunidad,
                        la creatividad y el conocimiento se unen para crear experiencias únicas.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-5">
                        <div className="flex items-center gap-2">
                            <span className=" text-black dark:text-white">IP:</span>
                            <span className=" text-black dark:text-neutral-100">cubusfera.com</span>
                        </div> |
                        <div className="flex items-center gap-2">
                            <span className=" text-black dark:text-white">Versión:</span>
                            <span className="text-black dark:text-white">{MINECRAFT_VERSION}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-5 justify-center text-sm font-medium">
                        <Link
                            href="/miembros"
                            className="px-6 py-2.5 bg-blue-500 text-white rounded-lg  transition-colors hover:bg-blue-400"
                        >
                            Explora nuestra comunidad
                        </Link>
                        <Link
                            href="/blog"
                            className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-secondary-foreground rounded-lg  transition-colors"
                        >
                            Explora nuestro blog
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}