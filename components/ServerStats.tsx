"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, FileText, PickaxeIcon } from "lucide-react";

interface ServerStatsProps {
    totalPlayers: number;
    totalPlaytime: string;
    totalBlocksMined: string;
    totalForms: string; // Cambiar de premiumPlayers a totalForms
}

export default function ServerStats({ totalPlayers, totalPlaytime, totalBlocksMined, totalForms }: ServerStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-3xl bg-white dark:bg-[#21364A] border border-[#E5E7EB] dark:border-[#304D69]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Jugadores</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalPlayers}</div>
                </CardContent>
            </Card>
            <Card className="rounded-3xl bg-white dark:bg-[#21364A] border border-[#E5E7EB] dark:border-[#304D69]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tiempo Total Jugado</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalPlaytime}</div>
                </CardContent>
            </Card>
            <Card className="rounded-3xl bg-white dark:bg-[#21364A] border border-[#E5E7EB] dark:border-[#304D69]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Bloques Minados</CardTitle>
                    <PickaxeIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalBlocksMined.toLocaleString()}</div>
                </CardContent>
            </Card>
            <Card className="rounded-3xl bg-white dark:bg-[#21364A] border border-[#E5E7EB] dark:border-[#304D69]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Formularios Enviados</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalForms}</div>
                </CardContent>
            </Card>
        </div>
    );
}