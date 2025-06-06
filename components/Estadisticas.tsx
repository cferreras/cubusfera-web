/* eslint-disable @typescript-eslint/no-explicit-any */
import { PickaxeIcon, SwordIcon, DoorOpenIcon, UnplugIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FaSkull, FaPersonWalking, FaClock, FaGhost, FaWandSparkles } from "react-icons/fa6";

interface EstadisticasProps {
    name: string;
    isVip?: boolean;
    vipTheme?: string;
}

export default function Estadisticas({ name }: EstadisticasProps) {
    const [stats, setStats] = useState({
        playTime: "0s",
        distanceTraveled: "0 km",
        totalMobsKilled: 0,
        totalBlocksMined: 1,
        sessions: 0,
        experienceGained: 0,
        pvpKills: 0,
        deaths: 0
    });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        // Lógica para actualizar las estadísticas
        fetch(`/api/stats/player?name=${name}`)
            .then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // Get the raw text first to debug JSON parsing issues
                const text = await response.text();
                try {
                    // Try to parse the text as JSON
                    return JSON.parse(text);
                } catch (e) {
                    console.error('Raw response with parsing error:', text);
                    throw e; // Re-throw to be caught by the catch block
                }
            })
            .then(data => {
                // Actualizar el estado con las estadísticas obtenidas
                setStats(data);
                setError(false);
            })
            .catch(error => {
                setError(true);
                console.error('Error al obtener las estadísticas:', error);
            }).finally(() => {
                setLoading(false);
            });
    }, [name]);


    return (<>
        {!error ? (!loading ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <div className="flex items-start gap-3">
                <FaClock className="w-5 h-5 mt-1 text-emerald-500" />
                <div>
                    <h4 className="font-medium mb-1">Tiempo de juego</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {stats.playTime.replace(/(\d+)\s*([dhms]|min)/g, '$1$2')}
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <FaPersonWalking className="w-5 h-5 mt-1 text-blue-500" />
                <div>
                    <h4 className="font-medium mb-1">Distancia recorrida</h4>
                    <p className={'text-sm'}>{stats.distanceTraveled}</p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <FaGhost className="w-5 h-5 mt-1 text-purple-500" />
                <div>
                    <h4 className="font-medium mb-1">Mobs eliminados</h4>
                    <p className={'text-sm'}>
                        {stats.totalMobsKilled} totales
                        <br />
                        <span className="text-xs">
                            {('specificMobsKilled' in stats) && Object.entries((stats as any).specificMobsKilled).length > 0 ?
                                (() => {
                                    const mostKilledMob = Object.entries((stats as any).specificMobsKilled)
                                        .reduce((max, [mob, count]) =>
                                            (count as number) > (max[1] as number) ? [mob, count] : max,
                                            ['', 0]);
                                    return `${mostKilledMob[1]} ${mostKilledMob[0]}`;
                                })()
                                : 'Ningún mob eliminado'}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <PickaxeIcon className="w-5 h-5 mt-1 text-amber-500" />
                <div>
                    <h4 className="font-medium mb-1">Bloques minados</h4>
                    <p className={'text-sm'}>
                        {stats.totalBlocksMined} total
                        <br />
                        <span className="text-xs">
                            {('specificBlocksMined' in stats) && Object.entries((stats as any).specificBlocksMined).length > 0 ?
                                (() => {
                                    const mostMinedBlock = Object.entries((stats as any).specificBlocksMined)
                                        .reduce((max, [block, count]) =>
                                            (count as number) > (max[1] as number) ? [block, count] : max,
                                            ['', 0]);
                                    return `${mostMinedBlock[1]} ${mostMinedBlock[0]}`;
                                })()
                                : 'Ningún bloque minado'}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <DoorOpenIcon className="w-5 h-5 mt-1 text-orange-500" />
                <div>
                    <h4 className="font-medium mb-1">Inicios de sesión</h4>
                    <p className={'text-sm'}>{stats.sessions} veces</p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <FaWandSparkles className="w-5 h-5 mt-1 text-green-500" />
                <div>
                    <h4 className="font-medium mb-1">Experiencia</h4>
                    <p className={'text-sm'}>{stats.experienceGained} Niveles</p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <SwordIcon className="w-5 h-5 mt-1 text-red-500" />
                <div>
                    <h4 className="font-medium mb-1">PvP Kills</h4>
                    <p className={'text-sm'}>{stats.pvpKills} jugadores</p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <FaSkull className="w-5 h-5 mt-1 text-gray-500" />
                <div>
                    <h4 className="font-medium mb-1">Muertes totales</h4>
                    <p className={'text-sm'}>{stats.deaths} muertes</p>
                </div>
            </div>
        </div>) : <div className="flex flex-col items-center justify-center self-center w-full h-32">
            <div className="text-center">Cargando...</div>

        </div>) : <div className="flex flex-col items-center justify-center self-center w-full h-28">

            <UnplugIcon className="mb-4 mx-auto" />
            <div className="text-center">Estadisticas no disponibles.</div>

        </div>
        }
    </>
    );
}
