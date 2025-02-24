import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Calendar } from "lucide-react"; // Importamos los iconos
import Link from "next/link";
import AdminBadge from "./AdminBadge";

export default function MemberDisplay({ member }: { member: any }) {
    const displayName = member?.displayName || 'Unknown';
    const isAdmin = member?.role === 'admin' || false;
    console.log(member?.role + ' ' + isAdmin)

    return (
        <Link href={`/perfil/${displayName}`}>
            <Card className="cursor-pointer dark:hover:bg-neutral-700 hover:bg-neutral-200 rounded-3xl">
                <TooltipProvider>
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
                            {displayName}{isAdmin && <AdminBadge/>}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <Calendar className="h-4 w-4" />
                            <p>Registrado: {member?.registered || 'No disponible'}</p>
                        </div>
                    </CardContent>
                </TooltipProvider>
            </Card>
        </Link >
    );
}