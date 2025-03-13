"use client";
import { useEffect, useState } from "react";
import ServerStats from "@/components/ServerStats";

interface ServerStatsData {
    totalPlaytime: string;
    totalBlocksMined: number;
}

export default function ServerStatsSection({ totalPlayers, premiumPlayers }: { totalPlayers: number, premiumPlayers: number }) {
    const [statsData, setStatsData] = useState<ServerStatsData | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch("/api/stats");
                const data = await response.json();
                console.log(data);
                setStatsData(data);
            } catch (error) {
                console.error("Failed to fetch server stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Estadísticas del Servidor</h2>
            <ServerStats
                totalPlayers={totalPlayers}
                totalPlaytime={statsData?.totalPlaytime || "0m"}
                totalBlocksMined={statsData?.totalBlocksMined || 0}
                premiumPlayers={premiumPlayers}
            />
        </div>
    );
}