"use client";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

export default function CTACard() {
    return (
        <Card className="bg-transparent border-none shadow-none">
            <CardContent className="text-center max-w-4xl mx-auto space-y-8">
                <div className="space-y-6">
                    <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">
                        ¿Estás listo para unirte?
                    </CardTitle>
                    <CardDescription className="text-lg md:text-xl dark:text-neutral-300 text-neutral-700">
                        Únete a nuestra comunidad y comienza tu aventura en Cubusfera
                    </CardDescription>
                    <div className="flex justify-center gap-4">
                        <a 
                            href="/formulario" 
                            className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full font-medium transition-colors hover:bg-neutral-800 dark:hover:bg-neutral-100"
                        >
                            Empezar ahora
                        </a>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}