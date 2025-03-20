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
    const supabase = createClient();

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
                            <AvatarFallback>{minecraftUsername[0] || ''}</AvatarFallback>
                        </Avatar>
                    </div>
                    {(bio && minecraftUsername) ? <div className="flex-1 w-full text-center md:text-left h-full">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-2 min-h-[50px] gap-4">
                            <h1 className="text-2xl font-semibold">{minecraftUsername || ""}{isAdmin && <PremiumBadge />}</h1>
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
                                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                                    <FaLocationDot className="w-4 h-4 mr-1" /> {location}
                                </div>
                            )}
                            {discord && (
                                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                                    <FaDiscord className="w-4 h-4 mr-1" />
                                    {discord}
                                </div>
                            )}
                            {twitter && (
                                <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
                                    <FaXTwitter className="w-4 h-4 mr-0.5" /> @{twitter}
                                </a>
                            )}
                            {instagram && (
                                <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
                                    <FaInstagram className="w-4 h-4 mr-0.5" /> @{instagram}
                                </a>
                            )}
                            {youtube && (
                                <a href={youtube} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
                                    <FaYoutube className="w-4 h-4 mr-0.5" /> YouTube
                                </a>
                            )}
                        </div>
                        <div className="bg-neutral-100 dark:bg-neutral-900 border p-2 rounded-xl mt-4 text-sm text-neutral-600 dark:text-neutral-400 prose dark:prose-invert max-w-none">
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

            <div className="space-y-8">
                <Tabs defaultValue="stats" className="w-full">
                    <TabsList className="flex gap-2 p-1 mb-8 bg-neutral-100 dark:bg-neutral-900 rounded-2xl h-16">
                        <TabsTrigger
                            value="stats"
                            className="text-lg h-full flex-1 rounded-2xl data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-sm"
                        >
                            Estadísticas
                        </TabsTrigger>
                        <TabsTrigger
                            value="comments"
                            className="text-lg h-full flex-1 rounded-2xl data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-sm"
                        >
                            Comentarios
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="stats" className="space-y-8">
                        <div className="space-y-6">
                            <div className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 min-h-[222px]">
                                <h3 className="font-semibold mb-4">Estadísticas del jugador</h3>
                                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                                    <Estadisticas name={minecraftUsername} />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="comments" className="space-y-8">
                        <div className="space-y-6">
                            <div className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800">
                                <h3 className="font-semibold mb-4">Comentarios</h3>
                                <Comentarios profileId={params?.slug ?? ""} currentUser={user} />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </Container>
    );
}