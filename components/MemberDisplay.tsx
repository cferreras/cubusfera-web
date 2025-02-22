import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Calendar, Activity } from "lucide-react"; // Importamos los iconos
import Link from "next/link";

export default function MemberDisplay({ member }: { member: any }) {
    const displayName = member?.displayName || 'Unknown';

    return (
        <Link href={`/perfil/${displayName}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Tooltip>
                        <TooltipTrigger>
                            <Avatar className="h-16 w-16">
                                <AvatarImage
                                    src={`https://mc-heads.net/avatar/${displayName}/64`}
                                    alt={`Avatar de ${displayName}`}
                                />
                                <AvatarFallback>{displayName[0]}</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            <div>{displayName}</div>
                        </TooltipContent>
                    </Tooltip>
                    <div className="text-2xl font-medium group-hover:underline">
                        {displayName}
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <p>Registrado: {member?.registered || 'No disponible'}</p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}