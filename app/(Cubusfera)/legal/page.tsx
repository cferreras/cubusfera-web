import Container from "@/components/Container";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Normas – Cubusfera',
    description: 'Normas del servidor de Minecraft Cubusfera',
}

export default function Normas() {
    return (
        <>
            <Container className="py-20">
                <div className="flex flex-col gap-1">
                    <div className="text-lg font-bold">Legal</div>
                    <div className="flex flex-col divide-y-2 dark:divide-neutral-900 divide-white text-md mt-4"> 
                        <Link className="p-6 dark:bg-neutral-800 bg-neutral-100 rounded-t-3xl dark:hover:bg-neutral-700 hover:bg-neutral-200" href="/legal/privacidad">Política de privacidad</Link>
                        <Link className="p-6 dark:bg-neutral-800 bg-neutral-100 rounded-b-3xl dark:hover:bg-neutral-700 hover:bg-neutral-200" href="/legal/terminos">Términos de servicio</Link>
                    </div>
                </div>
            </Container>
        </>
    );
}