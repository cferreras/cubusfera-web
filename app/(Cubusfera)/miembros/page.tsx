import Title from "@/components/Title";
import Container from "@/components/Container";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import dotenv from "dotenv";
import MemberDisplay from "@/components/MemberDisplay";
import { TooltipProvider } from "@/components/ui/tooltip";

dotenv.config();
export const metadata: Metadata = {
    title: 'Miembros – Cubusfera',
    description: 'Miembros del servidor de Minecraft Cubusfera',
}

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const EXPRESS_SECRET = process.env.EXPRESS_SECRET;

type player = {
    displayName: string;
    primaryGroup: string;
    registered: string;
    activityIndex: string;
    activityValue: number; // Añadimos este campo para ordenar
};

async function getData(): Promise<player[]> {
    return await search();
}

const search = async () => {
    const response = await fetch(REACT_APP_API_URL as string, {
        next: { revalidate: 3600 }, // Revalidate every hour
        headers: {
            'X-API-Key': EXPRESS_SECRET as string,
        },
    });

    const data = await response.json();

    if (data.length > 0) {
        return data.map(
            (d: { registered: string | number; activityIndex: string | number; }) => ({
                ...d,
                registered: new Date(+d.registered).toLocaleString("ES-es", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                }),
                activityIndex: (+d.activityIndex).toFixed(2) + " (" + getActivityIndexSuffix(+d.activityIndex) + ")",
                activityValue: +d.activityIndex, // Añadimos este campo para ordenar
            })
        );
    }
    return [];
};

// Función para ordenar jugadores por actividad (de mayor a menor)
const sortByActivity = (players: player[]) => {
    return players.sort((a, b) => b.activityValue - a.activityValue);
};

export default async function Miembros() {
    const data = await getData();

    // Ordenar los jugadores por actividad
    const admins = sortByActivity(data.filter((d) => d.primaryGroup === "Admin" || d.primaryGroup === "Owner"));
    const mods = sortByActivity(data.filter((d) => d.primaryGroup === "Mod"));
    const members = sortByActivity(data.filter((d) => d.primaryGroup === "Default"));

    return (
        <TooltipProvider>
            <Title title="Miembros" subtitle="Miembros del servidor" />
            <Container className="py-9">
                {/* Administradores */}
                <h1 className="text-4xl font-bold">Administradores</h1>
                <Separator className="my-4 mt-3" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                    {admins.map((d) => (
                        <Link href={`/perfil/${d.displayName}`} key={d.displayName}>
                            <MemberDisplay member={d} />
                        </Link>
                    ))}
                </div>

                {/* Moderadores */}
                <h1 className="text-4xl font-bold mt-8">Moderadores</h1>
                <Separator className="my-4 mt-3" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                    {mods.map((d) => (
                        <Link href={`/perfil/${d.displayName}`} key={d.displayName}>
                            <MemberDisplay member={d} />
                        </Link>
                    ))}
                </div>

                {/* Miembros */}
                <h1 className="text-4xl font-bold mt-8">Miembros</h1>
                <Separator className="my-4 mt-3" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                    {members.map((d) => (
                        <Link href={`/perfil/${d.displayName}`} key={d.displayName}>
                            <MemberDisplay member={d} />
                        </Link>
                    ))}
                </div>
            </Container>
        </TooltipProvider>
    );
}

const getActivityIndexSuffix = (activityIndex: number) => {
    if (activityIndex >= 4) {
        return "Muy activo";
    }
    if (activityIndex >= 3) {
        return "Activo";
    }
    if (activityIndex >= 2.5) {
        return "Activo";
    }
    if (activityIndex >= 2) {
        return "Regular";
    }
    if (activityIndex >= 1) {
        return "Irregular";
    }
    return "Inactivo";
};