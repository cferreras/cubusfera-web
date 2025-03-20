"use client";
import { Card, CardContent } from "@/components/ui/card";
import OnlineStatus from "./OnlineStatus";
import PremiumBadge from "./PremiumBadge";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export interface Member {
    id: string;
    displayName: string;
    registered: string;
    isPremium: boolean;
    role: string;
}

export default function MemberDisplay({ member, isOnline }: { member: Member, isOnline: boolean }) {
    return (
        <Link href={`/perfil/${member.displayName}`}>
            <Card className="rounded-3xl transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Avatar className="rounded-sm w-12 h-12">
                                <AvatarImage
                                    src={`https://mc-heads.net/avatar/${member.displayName}`}
                                    alt={member.displayName}
                                />
                                <AvatarFallback className="rounded-sm w-12 h-12">
                                    {member.displayName.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <OnlineStatus isOnline={isOnline} />
                        </div>
                        <div>
                            <p className="font-medium group-hover:text-primary">{member.displayName}</p>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-muted-foreground transition-colors duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-700">
                                {member?.role === 'admin'
                                    ? 'Administrador'
                                : member?.role === 'mod'
                                        ? 'Moderador'
                                        : 'Miembro'}
                            </span>
                        </div>
                    </div>
                    {member.isPremium && (
                        <PremiumBadge />
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}