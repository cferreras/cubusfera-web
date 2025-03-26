import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Clock, Sword, Skull, Star, Map, PickaxeIcon } from "lucide-react";
import { MonthlyAchievement } from "@/types/achievements";
import Link from "next/link";

const iconMap = {
    Clock: Clock,
    Pickaxe: PickaxeIcon,
    Sword: Sword,
    Skull: Skull,
    Star: Star,
    Map: Map,
};

export default function AchievementCard({ achievement }: { achievement: MonthlyAchievement }) {
    const IconComponent = iconMap[achievement.icon as keyof typeof iconMap];

    return (
        <Card className="rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{achievement.category}</CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{achievement.value} {achievement.suffix}</div>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <span>Ganador:</span>
                    <div className="flex items-center gap-2">
                        <img 
                            src={`https://mc-heads.net/avatar/${achievement.winner}/24`}
                            alt={`${achievement.winner}'s avatar`}
                            className="w-6 h-6 rounded"
                            width={24}
                            height={24}
                        />
                        <Link href={achievement.profileUrl || '#'} className="hover:underline text-primary">
                            {achievement.winner}
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}