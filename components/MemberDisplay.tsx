"use client";
import { Card, CardContent } from "@/components/ui/card";
import OnlineStatus from "./OnlineStatus";
import PremiumBadge from "./PremiumBadge";
import VipBadge from "./VipBadge";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export interface Member {
    id: string;
    displayName: string;
    registered: string;
    isPremium: boolean;
    is_vip: boolean;
    vip_theme?: string;
    custom_banner_url?: string;
    role: string;
}

export default function MemberDisplay({ member, isOnline }: { member: Member, isOnline: boolean }) {
    // Function to get theme classes based on VIP theme
    const getThemeClasses = () => {
        if (!member.is_vip) return "";
        
        switch (member.vip_theme) {
            case 'theme-gold':
                return "!bg-yellow-50 dark:!bg-yellow-400/30 !border-yellow-300 dark:!border-yellow-400";
            case 'theme-diamond':
                return "!bg-blue-50 dark:!bg-blue-400/30 !border-blue-300 dark:!border-blue-400";
            case 'theme-emerald':
                return "!bg-emerald-50 dark:!bg-emerald-400/30 !border-emerald-300 dark:!border-emerald-400";
            case 'theme-ruby':
                return "!bg-red-50 dark:!bg-red-400/30 !border-red-300 dark:!border-red-400";
            case 'theme-amethyst':
                return "!bg-purple-50 dark:!bg-purple-400/30 !border-purple-300 dark:!border-purple-400";
            default:
                return "";
        }
    };

    // Function to get role badge classes based on VIP theme
    const getRoleBadgeClass = () => {
        if (!member.is_vip) return "bg-neutral-200 dark:bg-neutral-800 text-muted-foreground";
        
        switch (member.vip_theme) {
            case 'theme-gold':
                return "bg-yellow-100 dark:bg-yellow-600/50 text-yellow-900 dark:text-yellow-100";
            case 'theme-diamond':
                return "bg-blue-100 dark:bg-blue-600/50 text-blue-900 dark:text-blue-100";
            case 'theme-emerald':
                return "bg-emerald-100 dark:bg-emerald-400/50 text-emerald-900 dark:text-emerald-100";
            case 'theme-ruby':
                return "bg-red-100 dark:bg-red-600/50 text-red-900 dark:text-red-100";
            case 'theme-amethyst':
                return "bg-purple-100 dark:bg-purple-600/50 text-purple-900 dark:text-purple-100";
            default:
                return "bg-neutral-200 dark:bg-neutral-800 text-muted-foreground";
        }
    };
    
    return (
        <Link href={`/perfil/${member.displayName}`}>
            <Card className={`rounded-3xl transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 ${getThemeClasses()}`}>
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
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeClass()} transition-colors duration-200`}>
                                {member?.role === 'admin'
                                    ? 'Administrador'
                                : member?.role === 'mod'
                                        ? 'Moderador'
                                        : 'Miembro'}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {member.isPremium && <PremiumBadge />}
                        {member.is_vip && <VipBadge size="md" />}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}