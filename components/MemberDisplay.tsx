import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Calendar, Activity } from "lucide-react"; // Importamos los iconos

export default function MemberDisplay({ member }: { member: any }) {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
                <Tooltip>
                    <TooltipTrigger>
                        <Avatar className="h-16 w-16">
                            <AvatarImage
                                src={`https://mc-heads.net/avatar/${member.displayName}/64`}
                                alt={`Avatar de ${member.displayName}`}
                            />
                            <AvatarFallback>{member.displayName[0]}</AvatarFallback>
                        </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{member.displayName}</p>
                    </TooltipContent>
                </Tooltip>
                <div className="text-2xl font-medium group-hover:underline">
                    {member.displayName}
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <p>Registrado: {member.registered}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Activity className="h-4 w-4" />
                    <p>Actividad: {member.activityIndex}</p>
                </div>
            </CardContent>
        </Card>
    );
}