import Container from "@/components/Container";
import FormsTable from "@/components/FormsTable";
import Title from "@/components/Title";

export default function Admin() {
    return (
        <>
            <Title title="Administración de formularios" subtitle="Solo personal autorizado"/>
            <Container className="mt-24 text-4xl"><FormsTable /></Container>
        </>
    );
}   