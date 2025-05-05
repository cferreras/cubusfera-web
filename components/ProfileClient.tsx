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
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import PremiumBadge from "@/components/PremiumBadge";
import { ChevronRightIcon, Palette } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Estadisticas from "@/components/Estadisticas";
import Comentarios from "@/components/Comentarios";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VipBadge from "./VipBadge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

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
    // const params = useParams<{ slug: string }>();
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

    // Función para actualizar configuración VIP
    const handleVipUpdate = async (updates: Partial<typeof vipSettings>) => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    ...updates
                })
                .eq('id', initialData.id);

            if (error) throw error;
            setVipSettings(prev => ({ ...prev, ...updates }));
        } catch (error) {
            console.error('Error al actualizar configuración VIP:', error);
        }
    };

    // Obtener clases para los iconos sociales basadas en el tema
    const getSocialIconClasses = (theme: string) => {
        if (!initialData.is_vip) return "text-neutral-600 dark:text-neutral-400";

        switch (theme) {
            case 'theme-gold':
                return 'text-yellow-700 dark:text-yellow-300';
            case 'theme-diamond':
                return 'text-blue-700 dark:text-blue-300';
            case 'theme-emerald':
                return 'text-emerald-700 dark:text-emerald-300';
            case 'theme-ruby':
                return 'text-red-700 dark:text-red-300';
            case 'theme-amethyst':
                return 'text-purple-700 dark:text-purple-300';
            default:
                return 'text-neutral-600 dark:text-neutral-400';
        }
    };

    // Obtener clases para los enlaces sociales basadas en el tema
    const getSocialLinkClasses = (theme: string) => {
        if (!initialData.is_vip) return "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200";

        switch (theme) {
            case 'theme-gold':
                return 'text-yellow-700 hover:text-yellow-900 dark:text-yellow-300 dark:hover:text-yellow-100';
            case 'theme-diamond':
                return 'text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100';
            case 'theme-emerald':
                return 'text-emerald-700 hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-100';
            case 'theme-ruby':
                return 'text-red-700 hover:text-red-900 dark:text-red-300 dark:hover:text-red-100';
            case 'theme-amethyst':
                return 'text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-100';
            default:
                return 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200';
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

    // Estilo de banner personalizado para usuarios VIP
    const bannerStyle = initialData.is_vip && vipSettings.custom_banner_url
        ? { backgroundImage: `url(${vipSettings.custom_banner_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : {};

    return (
        <Container className="py-20">
            <Breadcrumb className="mb-6">
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

            {/* Banner para usuarios VIP con botón de personalización */}
            {initialData.is_vip && (
                <>
                    {vipSettings.custom_banner_url && (
                        <div
                            className="w-full h-48 mb-0 relative rounded-t-3xl"
                            style={bannerStyle}
                        >
                            {isOwner && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="absolute bottom-4 right-4 bg-white/80 dark:bg-black/50 backdrop-blur-sm"
                                    onClick={() => setIsVipSettingsOpen(true)}
                                >
                                    <Palette className="w-4 h-4 mr-2" />
                                    Personalizar Perfil
                                </Button>
                            )}
                        </div>
                    )}
                    
                    {!vipSettings.custom_banner_url && isOwner && (
                        <div className="flex justify-end mb-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-white/80 dark:bg-black/50 backdrop-blur-sm"
                                onClick={() => setIsVipSettingsOpen(true)}
                            >
                                <Palette className="w-4 h-4 mr-2" />
                                Personalizar Perfil
                            </Button>
                        </div>
                    )}
                </>
            )}

            <div className={`flex flex-col gap-6 mb-12 p-6 bg-white dark:bg-neutral-950 rounded-3xl shadow-sm ${initialData.is_vip && vipSettings.custom_banner_url ? 'rounded-t-none' : ''}` }>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className={`flex justify-center ${initialData.is_vip && vipSettings.custom_banner_url ? '-mt-24 z-10' : ''}`}>
                        <Avatar className={`${initialData.is_vip ? 'h-36 w-36' : 'h-32 w-32'} md:h-24 md:w-24 ${initialData.is_vip ? 'ring-4 shadow-lg rounded-sm' : ''} ${vipSettings.vip_theme === 'theme-gold' ? 'ring-yellow-400 dark:ring-yellow-500' :
                            vipSettings.vip_theme === 'theme-diamond' ? 'ring-blue-400 dark:ring-blue-500' :
                                vipSettings.vip_theme === 'theme-emerald' ? 'ring-emerald-400 dark:ring-emerald-500' :
                                    vipSettings.vip_theme === 'theme-ruby' ? 'ring-red-400 dark:ring-red-500' :
                                        vipSettings.vip_theme === 'theme-amethyst' ? 'ring-purple-400 dark:ring-purple-500' :
                                            'ring-white dark:ring-neutral-800'
                            }`}>
                            <AvatarImage className="rounded-sm"
                                src={`https://mc-heads.net/avatar/${minecraftUsername}/128`}
                                alt={`Avatar de ${minecraftUsername}`}
                            />
                            <AvatarFallback className="rounded-sm">{minecraftUsername[0] || ''}</AvatarFallback>
                        </Avatar>
                    </div>

                    {(bio && minecraftUsername) ? <div className="flex-1 w-full text-center md:text-left h-full">
                        <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between gap-4">
                            <h1 className="text-2xl font-semibold flex items-center gap-2">
                                {minecraftUsername || ""}
                                <div className="flex items-center gap-1">
                                    {isAdmin && <PremiumBadge />}
                                    {initialData.is_vip && <VipBadge />}
                                </div>
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
                                        youtube={youtube}
                                        onUpdateYoutube={setYoutube}
                                        location={location}
                                        onUpdateLocation={setLocation}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Información social */}
                        <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-4">
                            {location && (
                                <div className="flex items-center gap-1">
                                    <FaLocationDot className={getSocialIconClasses(vipSettings.vip_theme)} />
                                    <span className={getSocialLinkClasses(vipSettings.vip_theme)}>{location}</span>
                                </div>
                            )}
                            {discord && (
                                <div className="flex items-center gap-1">
                                    <FaDiscord className={getSocialIconClasses(vipSettings.vip_theme)} />
                                    <span className={getSocialLinkClasses(vipSettings.vip_theme)}>{discord}</span>
                                </div>
                            )}
                            {twitter && (
                                <Link href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                    <FaXTwitter className={getSocialIconClasses(vipSettings.vip_theme)} />
                                    <span className={getSocialLinkClasses(vipSettings.vip_theme)}>@{twitter}</span>
                                </Link>
                            )}
                            {instagram && (
                                <Link href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                    <FaInstagram className={getSocialIconClasses(vipSettings.vip_theme)} />
                                    <span className={getSocialLinkClasses(vipSettings.vip_theme)}>@{instagram}</span>
                                </Link>
                            )}
                            {youtube && (
                                <Link href={youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                    <FaYoutube className={getSocialIconClasses(vipSettings.vip_theme)} />
                                    <span className={getSocialLinkClasses(vipSettings.vip_theme)}>YouTube</span>
                                </Link>
                            )}
                        </div>

                        {/* Biografía */}
                        <div className="prose prose-sm dark:prose-invert max-w-none text-center sm:text-left">
                            <ReactMarkdown>{bio}</ReactMarkdown>
                        </div>
                    </div> : <div className="flex-1 w-full flex flex-col gap-4">
                        <div className="flex justify-between">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-8 w-8" />
                        </div>
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>}
                </div>
            </div>

            {/* Diálogo de configuración VIP */}
            {initialData.is_vip && isOwner && (
                <Dialog open={isVipSettingsOpen} onOpenChange={setIsVipSettingsOpen}>
                    <DialogContent className="sm:max-w-[500px] bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold">Personalizar Perfil VIP</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="theme">Tema VIP</Label>
                                <Select
                                    value={vipSettings.vip_theme}
                                    onValueChange={(value) => handleVipUpdate({ vip_theme: value })}
                                >
                                    <SelectTrigger id="theme" className="w-full">
                                        <SelectValue placeholder="Seleccionar tema" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="default">Predeterminado</SelectItem>
                                        <SelectItem value="theme-gold">Oro</SelectItem>
                                        <SelectItem value="theme-diamond">Diamante</SelectItem>
                                        <SelectItem value="theme-emerald">Esmeralda</SelectItem>
                                        <SelectItem value="theme-ruby">Rubí</SelectItem>
                                        <SelectItem value="theme-amethyst">Amatista</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="banner">URL de Banner Personalizado</Label>
                                <Input
                                    id="banner"
                                    value={vipSettings.custom_banner_url || ''}
                                    onChange={(e) => setVipSettings(prev => ({ ...prev, custom_banner_url: e.target.value }))}
                                    placeholder="https://ejemplo.com/mi-banner.jpg"
                                />
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    Ingresa la URL de una imagen para usarla como banner (recomendado: 1200x300px)
                                </p>
                                <Button
                                    onClick={() => handleVipUpdate({ custom_banner_url: vipSettings.custom_banner_url })}
                                    className="mt-2"
                                >
                                    Guardar Banner
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {/* Tabs para información, estadísticas y comentarios */}
            <div className="mt-8">
                <Tabs defaultValue="stats" className="w-full">
                    <TabsList className="w-full grid grid-cols-3 mb-6 rounded-xl p-1 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">

                        <TabsTrigger
                            value="stats"
                            className="data-[state=active]:bg-neutral-100 dark:data-[state=active]:bg-neutral-800"
                        >
                            Estadísticas
                        </TabsTrigger>
                        <TabsTrigger
                            value="achivements"
                            className="data-[state=active]:bg-neutral-100 dark:data-[state=active]:bg-neutral-800"
                        >
                            Insignias
                        </TabsTrigger>
                        <TabsTrigger
                            value="comments"
                            className="data-[state=active]:bg-neutral-100 dark:data-[state=active]:bg-neutral-800"
                        >
                            Comentarios
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="stats" className="p-6 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold mb-3">Estadísticas del jugador</h3>

                            <Estadisticas
                                name={minecraftUsername || ''}
                                isVip={initialData.is_vip || false}
                                vipTheme={vipSettings.vip_theme || 'default'}
                            />

                        </div>
                    </TabsContent>

                    <TabsContent value="achivements" className="p-6 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
                        <div className="space-y-6">

                            <h3 className="text-xl font-semibold mb-3">Insignias</h3>
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

                    </TabsContent>

                    <TabsContent value="comments" className="p-6 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold mb-3">Comentarios</h3>
                            <Comentarios
                                profileId={minecraftUsername}
                                currentUser={user}
                                isVip={initialData.is_vip || false}
                                vipTheme={vipSettings.vip_theme || 'default'}
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </Container>
    );
}

