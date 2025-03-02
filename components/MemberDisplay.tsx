import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import AdminBadge from "./PremiumBadge";

interface Member {
    displayName?: string;
    role?: string;
    registered?: string;
    isPremium?: boolean;
}

export default function MemberDisplay({ member }: { member: Member }) {
    const displayName = member?.displayName || 'Unknown';
    const isPremium = member?.isPremium;

    return (
        <Link href={`/perfil/${displayName}`}>
            <div className="p-6 cursor-pointer dark:hover:bg-neutral-700 hover:bg-neutral-200 rounded-3xl border bg-neutral-100 dark:bg-neutral-900 ">
                <TooltipProvider>
                    <div className="flex flex-row items-center gap-4">
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
                                <p className="font-semibold">{displayName}</p>
                            </TooltipContent>
                        </Tooltip>
                        <div className="flex flex-col gap-2">
                            <div className="text-2xl font-medium group-hover:underline flex items-center gap-2">
                                {displayName}{isPremium && <AdminBadge/>}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-muted-foreground">
                                    {member?.role === 'admin' ? 'Administrador' : 'Miembro'}
                                </span>
                            </div>
                        </div>
                    </div>
                </TooltipProvider>
            </div>
        </Link>
    );
}