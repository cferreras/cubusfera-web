import Title from "@/components/Title";
import { player, columns } from "./columns"
import { DataTable } from "./data-table"
import Container from "@/components/Container";
import dotenv from 'dotenv';
import { Metadata } from "next";
dotenv.config();
export const metadata: Metadata = {
    title: 'Miembros – Cubusfera',
    description: 'Miembros del servidor de Minecraft Cubusfera',
}

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const EXPRESS_SECRET = process.env.EXPRESS_SECRET;

async function getData(): Promise<player[]> {
    // Fetch data from your API here.
    return await search()
}

const search = async () => {
    const response = await fetch(REACT_APP_API_URL as string, {
        headers: {
            'X-API-Key': EXPRESS_SECRET as string,
            'Cache-Control': 'max-age=3600, stale-while-revalidate=59'
        },
    });

    const data = await response.json();

    if (data.length > 0) {
    return data.map(
        (d: { registered: string | number; activityIndex: string | number; }) => (
            {
                ...d, registered: new Date(+d.registered).toLocaleString("ES-es",
                    {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                    }), activityIndex: (+d.activityIndex).toFixed(2) + " (" + getAcctivityIndexSuffix(+d.activityIndex) + ")",
            }
        ));}
    return [];
}

export default async function Miembros() {
    const data = await getData()
    return (
        <>
            <Title title="Miembros" subtitle="Miembros del servidor" />
            <Container>
                <DataTable columns={columns} data={data} />
            </Container>
        </>
    )
}

const getAcctivityIndexSuffix = (activityIndex: number) => {
    if (activityIndex >= 4) {
        return "Muy activo"
    }
    if (activityIndex >= 3) {
        return "Activo"
    }
    if (activityIndex >= 2.5) {
        return "Activo"
    }
    if (activityIndex >= 2) {
        return "Regular"
    }
    if (activityIndex >= 1) {
        return "Irregular"
    }
    return "Inactivo"
}