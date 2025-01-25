"use client"; // Necesario para usar estados y efectos

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { ArrowUpRightFromSquare } from "lucide-react";

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
            <Title title="Mapa" subtitle="Mapa del servidor" />
            <Container className="py-9">
                {/* Skeleton mientras carga */}
                {isLoading && (
                    <Skeleton className="w-full aspect-video rounded-lg" />
                )}

                {/* Iframe del mapa */}
                <iframe
                    className={`w-full aspect-video rounded-lg ${isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                    src="https://mapa.cubusfera.com/"
                    onLoad={() => setIsLoading(false)} // Desactivar el skeleton cuando el iframe cargue
                    onError={() => setIsLoading(false)} // Manejar errores de carga
                />

                {/* Enlace para ver en pantalla completa */}
                <a
                    className="pt-4 flex items-center hover:underline"
                    href="https://mapa.cubusfera.com/"
                >
                    Ver en pantalla completa <ArrowUpRightFromSquare className="h-4 w-4 ml-1.5" />
                </a>
            </Container>
        </>
    );
}