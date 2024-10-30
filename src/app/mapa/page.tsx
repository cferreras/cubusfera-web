import Container from "@/components/Container";
import Title from "@/components/Title";
import {ArrowUpRightFromSquare} from "lucide-react";

export default function Normas() {
    return (
        <>
            <Title title="Mapa" subtitle="Mapa del servidor" />
            <Container>
            <iframe className="w-full aspect-video" src="https://mapa.cubusfera.com/"></iframe>
            <a className="pt-4  flex items-center text-indigo-700" href="https://mapa.cubusfera.com/">
            Ver en pantalla completa <ArrowUpRightFromSquare className="h-4 w-4 ml-1.5"/>
            </a>
            </Container>
        </>
    );
}