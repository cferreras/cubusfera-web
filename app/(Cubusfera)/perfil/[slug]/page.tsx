"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Container from "@/components/Container";
import EditBio from "@/components/EditBio";
import ProfileTitle from "@/components/ProfileTitle";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Importa Spinner
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { ArrowUpRight, ChevronRightIcon, ExternalLink, ExternalLinkIcon, LoaderIcon, LocateIcon, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { set } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from 'react-markdown';
import { FaDiscord, FaInstagram, FaLocationDot, FaLocationPin, FaLocationPinLock, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { use } from "react";
import { useParams } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function Perfil() {
    const params = useParams<{ slug: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [bio, setBio] = useState("");
    const [twitter, setTwitter] = useState("");
    const [minecraftUsername, setMinecraftUsername] = useState("");
    const [instagram, setInstagram] = useState("");
    const [discord, setDiscord] = useState("");
    const [youtube, setYoutube] = useState("");
    const [location, setLocation] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    const supabase = createClient();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);

                const { data: profile, error } = await supabase
                    .from("profiles")
                    .select("bio, minecraft_username, twitter_username, instagram_username, youtube_channel_url, discord_username, location, id")
                    .eq("minecraft_username", params.slug)
                    .single();
                if (error) {
                    console.info("No se ha encontrado perfil:", error);
                    return;
                }
                if (profile) {
                    setBio(profile.bio || "No se ha proporcionado una biografía.");
                    setTwitter(profile.twitter_username || "");
                    setYoutube(profile.youtube_channel_url || "");
                    setDiscord(profile.discord_username || "");
                    setInstagram(profile.instagram_username || "");
                    setLocation(profile.location || "");
                    setMinecraftUsername(profile.minecraft_username || "");

                    // Show edit button only if the authenticated user is the profile owner
                    const isOwner = user?.id === profile.id;
                    setIsOwner(isOwner);

                }
            } catch (error) {
                console.error("Error al cargar los datos del usuario:", error);
            }
        };
        fetchUser();
    }, [params]); // Updated dependency array to use slug
    // In the JSX, wrap the EditBio component with isOwner check
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
                <div className="flex items-start gap-6">
                    <Avatar className="h-24 w-24">
                        <AvatarImage className="rounded-full"
                            src={`https://mc-heads.net/avatar/${minecraftUsername}/64`}
                            alt={`Avatar de ${minecraftUsername}`}
                        />
                        <AvatarFallback>{minecraftUsername[0] || 'Q'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <h1 className="text-2xl font-semibold">{minecraftUsername || "Guest"}</h1>
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
                        <div className="flex items-center gap-4 mb-4">
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
                        <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 prose dark:prose-invert max-w-none">
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
                    </div>
                </div>
            </div>

            {/* Tabs and Content */}
            <Tabs defaultValue="stats" className="w-full">
                <TabsList className="flex gap-2 p-1 mb-8 bg-neutral-100 dark:bg-neutral-900 rounded-2xl h-16">
                    <TabsTrigger
                        value="stats"
                        className="text-lg  h-full  flex-1 rounded-2xl data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-sm"
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
                        <div className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800">
                            <h3 className="font-semibold mb-4">Estadísticas del jugador</h3>
                            <p className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                                Próximamente...
                            </p>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="comments" className="space-y-8">
                    <div className="space-y-6">
                        <div className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800">
                            <h3 className="font-semibold mb-4">Comentarios</h3>
                            <p className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                                Próximamente...
                            </p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </Container>
    );
}