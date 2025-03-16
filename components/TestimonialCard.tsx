"use client";
import { Card, CardContent } from "@/components/ui/card";

export default function TestimonialCard() {
    return (
        <Card className="bg-transparent border-none shadow-none">
            <CardContent className="text-center max-w-4xl mx-auto space-y-8">
                <div className="space-y-4">
                    <blockquote className="text-2xl md:text-3xl font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                        "Me encanta la comunidad técnica de Cubusfera. He aprendido muchísimo sobre redstone y granjas, y siempre hay alguien dispuesto a ayudar."
                    </blockquote>
                    <div className="text-neutral-600 dark:text-neutral-400">
                        <p className="font-medium">Jugador anónimo</p>
                        <p className="text-sm">+500 horas jugadas</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}