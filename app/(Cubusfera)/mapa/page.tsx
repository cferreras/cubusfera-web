"use client"; // Necesario para usar estados y efectos

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { ArrowUpRightFromSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Mapa() {
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

    // Forzar la carga del iframe cuando el componente se monta
    useEffect(() => {
        const iframe = document.querySelector("iframe");
        if (iframe) {
            iframe.src = "https://mapa.cubusfera.com/"; // Forzar la recarga del iframe
        }
    }, []);

    return (
        <>
            <Container className="py-20">
            <div className="flex flex-col gap-1 pb-8">
                    <div className="dark:text-neutral-300 text-neutral-600 text-base">Mapa</div>
                    <p className="dark:text-neutral-300 text-neutral-600 text-sm">Mapa interactivo del mundo de Cubusfera.</p>
                </div>
                {/* Skeleton mientras carga */}
                {isLoading && (
                    <Skeleton className="w-full aspect-video rounded-2xl border" />
                )}

                {/* Iframe del mapa */}
                <iframe
                    className={`w-full aspect-video rounded-2xl border ${isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                    src="https://mapa.cubusfera.com/"
                    onLoad={() => setIsLoading(false)} // Desactivar el skeleton cuando el iframe cargue
                    onError={() => setIsLoading(false)} // Manejar errores de carga
                />

                {/* Enlace para ver en pantalla completa */}
                <Button asChild variant="link" className="px-0 my-2">                                                 
                <a
                    target="_blank"
                    href="https://mapa.cubusfera.com/"
                >
                    Ver en pantalla completa <ArrowUpRightFromSquare className="h-4 w-4 ml-1.5" />
                </a>
                </Button>
            </Container>
        </>
    );
}