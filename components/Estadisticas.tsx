import { PickaxeIcon, SwordIcon } from "lucide-react";
import { FaSkull, FaPersonWalking, FaClock, FaGhost, FaCube, FaWandSparkles } from "react-icons/fa6";

export default function Estadisticas() {
    const stats = {
        playTime: "324h 15m",
        distanceTraveled: "1,234.5 km",
        mobsKilled: {
            total: 1567,
            zombies: 456,
            skeletons: 389,
            creepers: 234,
            others: 488
        },
        blocksStats: {
            placed: 45678,
            mined: {
                stone: 12345,
                iron: 890,
                gold: 234,
                diamond: 67
            }
        },
        craftedItems: 2345,
        experienceGained: "Level 78",
        pvpKills: 45,
        deaths: 127
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <div className="flex items-start gap-3">
                <FaClock className="w-5 h-5 mt-1 text-emerald-500" />
                <div>
                    <h4 className="font-medium mb-1">Tiempo de juego</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{stats.playTime}</p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <FaPersonWalking className="w-5 h-5 mt-1 text-blue-500" />
                <div>
                    <h4 className="font-medium mb-1">Distancia recorrida</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{stats.distanceTraveled}</p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <FaGhost className="w-5 h-5 mt-1 text-purple-500" />
                <div>
                    <h4 className="font-medium mb-1">Mobs eliminados</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {stats.mobsKilled.total} totales
                        <br />
                        <span className="text-xs">
                            {stats.mobsKilled.zombies} zombies, {stats.mobsKilled.skeletons} esqueletos
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <PickaxeIcon className="w-5 h-5 mt-1 text-yellow-500" />
                <div>
                    <h4 className="font-medium mb-1">Bloques minados</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {stats.blocksStats.mined.stone} piedra
                        <br />
                        <span className="text-xs">
                            {stats.blocksStats.mined.diamond} diamantes
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <FaCube className="w-5 h-5 mt-1 text-orange-500" />
                <div>
                    <h4 className="font-medium mb-1">Items fabricados</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{stats.craftedItems} items</p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <FaWandSparkles className="w-5 h-5 mt-1 text-green-500" />
                <div>
                    <h4 className="font-medium mb-1">Experiencia</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{stats.experienceGained}</p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <SwordIcon className="w-5 h-5 mt-1 text-red-500" />
                <div>
                    <h4 className="font-medium mb-1">PvP Kills</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{stats.pvpKills} jugadores</p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <FaSkull className="w-5 h-5 mt-1 text-gray-500" />
                <div>
                    <h4 className="font-medium mb-1">Muertes totales</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{stats.deaths} muertes</p>
                </div>
            </div>
        </div>
    );
}