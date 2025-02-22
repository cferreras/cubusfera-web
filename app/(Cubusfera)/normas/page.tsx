import Container from "@/components/Container";
import Rules from "@/components/Rules";
import Title from "@/components/Title";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Normas – Cubusfera',
    description: 'Normas del servidor de Minecraft Cubusfera',
}

export default function Normas() {
    return (
        <>
            <Container className="py-20">
                <div className="flex flex-col gap-1">
                    <div className="dark:text-neutral-300 text-neutral-600 text-base">Normas</div>
                    <p className="dark:text-neutral-300 text-neutral-600 text-sm">Estas son la normas de Cubusfera tanto para Discord como para Minecraft.</p>
                </div>
                <Rules />
            </Container>
        </>
    );
}