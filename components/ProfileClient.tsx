"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Container from "@/components/Container";
import EditBio from "@/components/EditBio";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from 'react-markdown';
import { FaDiscord, FaInstagram, FaLocationDot, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import PremiumBadge from "@/components/PremiumBadge";
import { ChevronRightIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Estadisticas from "@/components/Estadisticas";
import Comentarios from "@/components/Comentarios";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VipBadge from "./VipBadge";

interface ProfileData {
    bio: string;
    minecraft_username: string;
    twitter_username: string;
    instagram_username: string;
    youtube_channel_url: string;
    discord_username: string;
    location: string;
    id: string;
    role: string;
    isPremium: boolean;
    is_vip?: boolean;
    vip_theme?: string;
    custom_banner_url?: string;
    achievements?: {
        category: string;
        month: string;
        value: string;
    }[];
}

export default function ProfileClient({ initialData }: { initialData: ProfileData }) {
    const params = useParams<{ slug: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [bio, setBio] = useState(initialData?.bio || "No se ha proporcionado una biografía.");
    const [twitter, setTwitter] = useState(initialData?.twitter_username || "");
    const [minecraftUsername] = useState(initialData?.minecraft_username || "");
    const [instagram, setInstagram] = useState(initialData?.instagram_username || "");
    const [discord, setDiscord] = useState(initialData?.discord_username || "");
    const [youtube, setYoutube] = useState(initialData?.youtube_channel_url || "");
    const [location, setLocation] = useState(initialData?.location || "");
    const [isOwner, setIsOwner] = useState(false);
    const [isAdmin] = useState(initialData?.isPremium);
    const [isVipSettingsOpen, setIsVipSettingsOpen] = useState(false);
    const [vipSettings, setVipSettings] = useState({
        custom_banner_url: initialData?.custom_banner_url || '',
        vip_theme: initialData?.vip_theme || 'default'
    });
    const supabase = createClient();

    // Add handleVipUpdate function
    const handleVipUpdate = async (updates: Partial<typeof vipSettings>) => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    ...updates
                    // Removed the updated_at field that was causing the error
                })
                .eq('id', initialData.id);

            if (error) throw error;
            setVipSettings(prev => ({ ...prev, ...updates }));
        } catch (error) {
            console.error('Error updating VIP settings:', error);
        }
    };

    // Get theme classes based on selected theme
    const getThemeClasses = (theme: string) => {
        switch (theme) {
            case 'theme-gold':
                return 'bg-yellow-50 dark:bg-yellow-400/40 border-yellow-400 dark:border-yellow-400 dark:text-white/90';
            case 'theme-diamond':
                return 'bg-blue-100 dark:bg-blue-400/40 border-blue-300 dark:border-blue-400 dark:text-white/90';
            case 'theme-emerald':
                return 'bg-emerald-100 dark:bg-emerald-400/40 border-emerald-300 dark:border-emerald-400 dark:text-white/90';
            default:
                return 'bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 dark:text-white/90';
        }
    };


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);
                if (user) {
                    setIsOwner(user.id === initialData.id);
                }
            } catch (error) {
                console.error("Error al cargar los datos del usuario:", error);
            }
        };
        fetchUser();
    }, [initialData.id, supabase.auth]);

    return (
        <Container className="py-20">
            <Breadcrumb className="mb-12">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link className='text-lg dark:text-white text-black' href="/miembros">Miembros</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='[&>svg]:w-5 [&>svg]:h-5'>
                        <ChevronRightIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem className='text-lg'>
                        {minecraftUsername || "Guest"}
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-col gap-6 mb-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 min-h-[114px]">
                    <div className="flex justify-center">
                        <Avatar className="h-32 w-32 md:h-24 md:w-24">
                            <AvatarImage className="rounded-sm"
                                src={`https://mc-heads.net/avatar/${minecraftUsername}/64`}
                                alt={`Avatar de ${minecraftUsername}`}
                            />
                            <AvatarFallback className="rounded-sm">{minecraftUsername[0] || ''}</AvatarFallback>
                        </Avatar>
                    </div>
                    {(bio && minecraftUsername) ? <div className="flex-1 w-full text-center md:text-left h-full">
                        <div className="flex flex-col md:flex-row justify-between mb-2 gap-4">
                            <h1 className="text-2xl font-semibold flex items-center gap-2">{minecraftUsername || ""}
                                {isAdmin && <PremiumBadge />}{initialData.is_vip && <VipBadge />}
                            </h1>
                            <div className="min-w-[42px]">
                                {isOwner && (
                                    <EditBio
                                        userId={user?.id ?? ""}
                                        currentBio={bio}
                                        onUpdateBio={setBio}
                                        discord={discord}
                                        onUpdateDiscord={setDiscord}
                                        twitter={twitter}
                                        onUpdateTwitter={setTwitter}
                                        instagram={instagram}
                                        onUpdateInstagram={setInstagram}
                                        location={location}
                                        onUpdateLocation={setLocation}
                                        youtube={youtube}
                                        onUpdateYoutube={setYoutube}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-4">
                            {location && (
                                <div className={`flex items-center text-sm ${initialData.is_vip ? '' : 'text-neutral-600 dark:text-neutral-400'}`}>
                                    <FaLocationDot className="w-4 h-4 mr-1" /> {location}
                                </div>
                            )}
                            {discord && (
                                <div className={`flex items-center text-sm ${initialData.is_vip ? '' : 'text-neutral-600 dark:text-neutral-400'}`}>
                                    <FaDiscord className="w-4 h-4 mr-1" />
                                    {discord}
                                </div>
                            )}
                            {twitter && (
                                <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer"
                                    className={`flex items-center text-sm ${initialData.is_vip ? 'hover:opacity-70' : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'} transition-colors`}>
                                    <FaXTwitter className="w-4 h-4 mr-0.5" /> @{twitter}
                                </a>
                            )}
                            {instagram && (
                                <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer"
                                    className={`flex items-center text-sm ${initialData.is_vip ? 'hover:opacity-70' : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'} transition-colors`}>
                                    <FaInstagram className="w-4 h-4 mr-0.5" /> @{instagram}
                                </a>
                            )}
                            {youtube && (
                                <a href={youtube} target="_blank" rel="noopener noreferrer"
                                    className={`flex items-center text-sm ${initialData.is_vip ? 'hover:opacity-70' : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'} transition-colors`}>
                                    <FaYoutube className="w-4 h-4 mr-0.5" /> YouTube
                                </a>
                            )}
                        </div>
                        <div className={`border p-2 rounded-xl mt-4 text-sm prose dark:prose-invert max-w-none ${initialData.is_vip ? getThemeClasses(vipSettings.vip_theme) : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'}`}>
                            <ReactMarkdown
                                components={{
                                    h1: 'p',
                                    h2: 'p',
                                    h3: 'p',
                                    h4: 'p',
                                    h5: 'p',
                                    h6: 'p',
                                    a: ({ children }) => <span>{children}</span>,
                                    img: ({ alt }) => <span>{alt}</span>
                                }}
                            >
                                {bio}
                            </ReactMarkdown>
                        </div>
                    </div> :
                        <Skeleton className="w-full h-[114px] rounded-2xl" />}
                </div>
            </div>

            {/* VIP Features */}
            {initialData.is_vip && (
                <div className="mt-8 mb-8">
                    {vipSettings?.custom_banner_url && <div
                        className="w-full h-48 rounded-xl bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${vipSettings.custom_banner_url})`,
                        }}
                    />
                    }

                    {isOwner && (
                        <div className={`mt-8  rounded-3xl border ${getThemeClasses(vipSettings.vip_theme)}`}>
                            <button
                                onClick={() => setIsVipSettingsOpen(!isVipSettingsOpen)}
                                className="flex items-center justify-between w-full p-4"
                            >
                                    <h2 className="text-lg font-semibold">Personalización VIP</h2>
                                <ChevronRightIcon className={`w-5 h-5 transition-transform ${isVipSettingsOpen ? 'rotate-90' : ''}`} />
                            </button>

                            {isVipSettingsOpen && (
                                <div className="space-y-4 mt-4 m-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">URL del Banner</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border p-2 bg-white dark:bg-neutral-800"
                                            value={vipSettings.custom_banner_url}
                                            onChange={(e) => handleVipUpdate({ custom_banner_url: e.target.value })}
                                            placeholder="https://ejemplo.com/mi-banner.jpg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Tema</label>
                                        <Select
                                            value={vipSettings.vip_theme}
                                            onValueChange={(value) => handleVipUpdate({ vip_theme: value })}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecciona un tema" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="default">Por defecto</SelectItem>
                                                <SelectItem value="theme-gold">Oro</SelectItem>
                                                <SelectItem value="theme-diamond">Diamante</SelectItem>
                                                <SelectItem value="theme-emerald">Esmeralda</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="space-y-8">
                <Tabs defaultValue="stats" className="w-full">
                    <TabsList className={`h-auto flex flex-col sm:flex-row gap-2 p-1 mb-8 rounded-2xl ${initialData.is_vip ? getThemeClasses(vipSettings.vip_theme) : 'bg-neutral-100 dark:bg-neutral-900'}`}>
                        <TabsTrigger
                            value="stats"
                            className="text-base sm:text-lg h-14 sm:h-12 flex-1 rounded-2xl"
                        >
                            Estadísticas
                        </TabsTrigger>
                        <TabsTrigger
                            value="achievements"
                            className="text-base sm:text-lg h-14 sm:h-12 flex-1 rounded-2xl"
                        >
                            Insignias
                        </TabsTrigger>
                        <TabsTrigger
                            value="comments"
                            className="text-base sm:text-lg h-14 sm:h-12 flex-1 rounded-2xl"
                        >
                            Comentarios
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="stats" className="space-y-8">
                        <div className="space-y-6">
                            <div className={`p-6 rounded-3xl border min-h-[222px] ${initialData.is_vip ? getThemeClasses(vipSettings.vip_theme) : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'}`}>
                                <h3 className="font-semibold mb-4">Estadísticas del jugador</h3>
                                <div className={`w-full ${initialData.is_vip ? '' : 'text-neutral-600 dark:text-neutral-400'}`}>
                                    <Estadisticas
                                        name={minecraftUsername}
                                        isVip={initialData.is_vip}
                                        vipTheme={initialData.is_vip ? vipSettings.vip_theme : undefined}
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="achievements" className="space-y-8">
                        <div className="space-y-6">
                            <div className={`p-6 rounded-3xl border ${initialData.is_vip ? getThemeClasses(vipSettings.vip_theme) : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'}`}>
                                <h3 className="font-semibold mb-4">Insignias</h3>
                                <div className="flex flex-col items-center justify-center self-center w-full h-32">
                                    <div className="text-center text-sm">Próximamente...</div>
                                </div>
                                {/* <div className="flex flex-wrap gap-4">
                                    {initialData.achievements?.map((achievement, index) => (
                                        <AchievementBadge
                                            key={index}
                                            category={achievement.category}
                                            month={achievement.month}
                                            value={achievement.value}
                                        />
                                    ))}
                                </div> */}
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="comments" className="space-y-8">
                        <div className="space-y-6">
                            <div className={`p-6 rounded-3xl border ${initialData.is_vip ? getThemeClasses(vipSettings.vip_theme) : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'}`}>
                                <h3 className="font-semibold mb-4">Comentarios</h3>
                                <Comentarios
                                    profileId={params?.slug ?? ""}
                                    currentUser={user}
                                    isVip={initialData.is_vip || false}
                                    vipTheme={initialData.is_vip ? vipSettings.vip_theme : ''}
                                />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </Container>
    );
}
