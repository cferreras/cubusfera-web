import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
            <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                    Registrado: {member.registered}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                    Actividad: {member.activityIndex}
                </p>
            </CardContent>
        </Card>
    );
}