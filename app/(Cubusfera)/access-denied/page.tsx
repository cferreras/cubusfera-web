import Container from "@/components/Container";

export default function AccessDenied() {
    return (
        <Container className="mt-24 text-4xl">
            <h1 className="font-bold text-5xl">Acceso Denegado</h1>
            <p>No tienes permiso para ver esta página.</p>
        </Container>
    );
}