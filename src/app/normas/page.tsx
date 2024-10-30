import Container from "@/components/Container";
import Rules from "@/components/Rules";
import Title from "@/components/Title";

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