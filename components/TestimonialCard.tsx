"use client";
import { Card, CardContent } from "@/components/ui/card";

export default function TestimonialCard() {
    return (
        <div className="h-80 bg-[url(/images/testimonial-bg.webp)] bg-cover rounded-lg p-8 flex flex-col justify-end">
            <div>
            <p className="font-medium text-2xl max-w-md text-white">Me encanta la comunidad técnica de Cubusfera. He aprendido mucho sobre redstone y granjas, y siempre hay alguien dispuesto a ayudar.</p>
            <div className="mt-3 text-white">Jugador Anónimo, +500 horas jugadas</div>
            </div>
        </div>
    );
}