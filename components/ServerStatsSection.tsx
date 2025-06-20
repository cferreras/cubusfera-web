"use client";
import { useEffect, useState } from "react";
import ServerStats from "@/components/ServerStats";

interface ServerStatsData {
    totalPlaytime: string;
    totalBlocksMined: string;
    totalForms: string;
}

export default function ServerStatsSection({ totalPlayers }: { totalPlayers: number }) {
    const [statsData, setStatsData] = useState<ServerStatsData>({
        totalPlaytime: "...",
        totalBlocksMined: "...",
        totalForms: "..."
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch("/api/stats");
                const data = await response.json();
                setStatsData(data);
            } catch (error) {
                console.error("Failed to fetch server stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (isLoading) {
        return (
            <div className="mb-12">
                <h2 className="text-xl font-semibold mb-6">Estadísticas del Servidor</h2>
                <ServerStats
                    totalPlayers={totalPlayers}
                    totalPlaytime="..."
                    totalBlocksMined="..."
                    totalForms="..."
                />
            </div>
        );
    }

    return (
        <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Estadísticas del Servidor</h2>
            <ServerStats
                totalPlayers={totalPlayers}
                totalPlaytime={statsData.totalPlaytime}
                totalBlocksMined={statsData.totalBlocksMined}
                totalForms={statsData.totalForms}
            />
        </div>
    );
}