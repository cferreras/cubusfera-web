"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Container from "@/components/Container";
import EditBio from "@/components/EditBio";
import ProfileTitle from "@/components/ProfileTitle";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Importa Spinner
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { ArrowUpRight, ExternalLink, ExternalLinkIcon, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { set } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from 'react-markdown';
import { FaDiscord, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Perfil() {
    const [user, setUser] = useState<User | null>(null);
    const [bio, setBio] = useState("");
    const [twitter, setTwitter] = useState("");
    const [minecraftUsername, setMinecraftUsername] = useState("");
    const [instagram, setInstagram] = useState("");
    const [discordFullName, setDiscordFullName] = useState("");
    const [discord, setDiscord] = useState("");
    const [youtube, setYoutube] = useState("");
    const [location, setLocation] = useState("");
    const supabase = createClient();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Obtén el usuario autenticado
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);

                if (user) {
                    // Extrae el nombre completo de Discord del campo raw_user_meta_data
                    const discordData = user?.user_metadata?.full_name;
                    if (discordData && user?.user_metadata?.full_name) {
                        setDiscordFullName(user?.user_metadata?.full_name);
                    }

                    // Obtén la biografía y el nombre de Minecraft del perfil del usuario
                    const { data: profile, error } = await supabase
                        .from("profiles")
                        .select("bio, minecraft_username, twitter_username, instagram_username, youtube_channel_url, discord_username, location")
                        .eq("id", user.id)
                        .single();

                    if (error) {
                        console.info("No se ha encontrado perfil:", error);
                    }

                    if (profile) {
                        setBio(profile.bio || "No se ha proporcionado una biografía.");
                        setTwitter(profile.twitter_username || "");
                        setYoutube(profile.youtube_channel_url || "");
                        setDiscord(profile.discord_username || "");
                        setInstagram(profile.instagram_username || "");
                        setLocation(profile.location || "");
                        setMinecraftUsername(profile.minecraft_username || "");
                    }
                }
            } catch (error) {
                console.error("Error al cargar los datos del usuario:", error);
            }
        };
        fetchUser();
    }, []);

    return (
        <Container className="py-20">
            {/* Header Section */}
            <div className="flex flex-col gap-6 mb-12">
                <div className="flex items-start gap-6">
                    <img
                        src={user?.user_metadata?.avatar_url}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <h1 className="text-2xl font-semibold">{minecraftUsername || "Guest"}</h1>
                            <EditBio
                                userId={user?.id ?? ""}
                                currentBio={bio}
                                onUpdateBio={setBio}
                                discord={discordFullName}
                                onUpdateDiscord={setDiscordFullName}
                                twitter={twitter}
                                onUpdateTwitter={setTwitter}
                                instagram={instagram}
                                onUpdateInstagram={setInstagram}
                                location={location}
                                onUpdateLocation={setLocation}
                                youtube={youtube}
                                onUpdateYoutube={setYoutube}
                            />
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            {location && (
                                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                    📍 {location}
                                </div>
                            )}
                            {discord && (
                                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                    <FaDiscord className="inline-block w-4 h-4 mr-1" />
                                    {discord}
                                </div>
                            )}
                            {twitter && (
                                <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer"
                                    className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
                                    <FaXTwitter className="inline-block w-4 h-4 mr-0.5" /> @{twitter}
                                </a>
                            )}
                            {instagram && (
                                <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer"
                                    className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
                                    <FaInstagram className="inline-block w-4 h-4 mr-0.5" /> @{instagram}
                                </a>
                            )}
                            {youtube && (
                                <a href={youtube} target="_blank" rel="noopener noreferrer"
                                    className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
                                    <FaYoutube className="inline-block w-4 h-4 mr-0.5" /> YouTube
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

                {/* Stats Bar */}
                {/* <div className="flex gap-8 p-6 bg-neutral-100 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold">3+</span>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold">5</span>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Certificates</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold">2</span>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Internships</span>
                </div>
            </div> */}
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
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Próximamente...
                            </p>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="comments" className="space-y-8">
                    <div className="space-y-6">
                        <div className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800">
                            <h3 className="font-semibold mb-4">Comentarios</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Próximamente...
                            </p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </Container>
    );
}