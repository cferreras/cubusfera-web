import { Trophy, Clock, PickaxeIcon, Sword, Skull, Star, Map } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface AchievementBadgeProps {
    category: string;
    month: string;
    value: string;
}

const iconMap = {
    'Tiempo de Juego': Clock,
    'Bloques Minados': PickaxeIcon,
    'Mobs Eliminados': Sword,
    'Muertes': Skull,
    'Nivel de Experiencia': Star,
    'Distancia Recorrida': Map,
};

export default function AchievementBadge({ category, month, value }: AchievementBadgeProps) {
    const IconComponent = iconMap[category as keyof typeof iconMap] || Trophy;

    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button 
                        type="button" 
                        className="relative group focus:outline-none"
                        onClick={(e) => e.preventDefault()}
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                            <Trophy className="w-3 h-3 text-white" />
                        </div>
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <div className="text-sm">
                        <p className="font-bold">{category}</p>
                        <p className="text-xs text-muted-foreground">{month}</p>
                        <p className="text-xs">{value}</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}