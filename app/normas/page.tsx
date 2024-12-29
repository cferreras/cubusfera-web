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
            <Title title="Normas" subtitle="Normas del servidor" />
            <Container>
                <Rules />
            </Container>
        </>
    );
}