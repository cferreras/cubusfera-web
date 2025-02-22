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
import { use } from "react";

export default function Perfil({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
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
                const { data: profile, error } = await supabase
                    .from("profiles")
                    .select("bio, minecraft_username, twitter_username, instagram_username, youtube_channel_url, discord_username, location")
                    .eq("minecraft_username", resolvedParams.slug)
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
            } catch (error) {
                console.error("Error al cargar los datos del usuario:", error);
            }
        };
        fetchUser();
    }, [resolvedParams.slug]); // Updated dependency

    return (
        <>
            <ProfileTitle
                title={minecraftUsername ?? "Guest"}
                rank="Owner"
                tooltip={minecraftUsername ?? "Guest"}
            />
            <Container className="mb-12 pb-12">
                <div className="md:flex gap-16 space-y-8 md:space-y-0">
                    <div className="md:w-3/4">
                        <h3 className="font-bold text-2xl">Bio</h3>
                        {bio ? (
                            <div className="text-md/7 prose dark:prose-invert max-w-none">
                                <ReactMarkdown
                                    components={{
                                        h1: 'span',
                                        h2: 'span',
                                        h3: 'span',
                                        h4: 'span',
                                        h5: 'span',
                                        h6: 'span',
                                        img: ({ node, ...props }) => <span>{props.alt}</span>,
                                        a: ({ node, ...props }) => <span>{props.children}</span>
                                    }}
                                >
                                    {bio}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <Skeleton className="w-full h-24 " />
                        )}
                        <Separator className="mt-7 mb-4" />
                        <h3 className="font-bold text-2xl">Estadísticas</h3>
                        <div className="text-md/7">Próximamente...</div>
                    </div>
                    <div className="md:w-1/4">
                        <div className="border rounded-lg px-6 py-8 space-y-6">
                            {location && <div className="">
                                <div className="font-semibold text-xs">Ubicación</div>
                                <div className="font-semibold py-1 text-md">
                                    {location}
                                </div>
                            </div>}
                            {discord && <div className="">
                                <div className="font-semibold text-xs">Discord</div>
                                <div className="font-semibold py-1 text-md">
                                    {discord}
                                </div>
                            </div>}
                            {twitter && <div className="">
                                <div className="font-semibold text-xs">Twitter (x)</div>
                                <Button variant="link" asChild className="font-semibold p-0 text-md"><a href={`https://twitter.com/${twitter}`}>@{twitter} <ArrowUpRight className="h-4 w-4 ml-1" /></a></Button>
                            </div>}
                            {instagram && <div className="">
                                <div className="font-semibold text-xs">Instagram</div>
                                <Button variant="link" asChild className="font-semibold p-0 text-md">
                                    <a href={`https://instagram.com/${instagram}`}>@{instagram} <ArrowUpRight className="h-4 w-4 ml-1" /></a>
                                </Button>
                            </div>}
                            {youtube && <div className="">
                                <div className="font-semibold text-xs">Youtube</div>
                                <Button variant="link" asChild className="font-semibold p-0 text-md">
                                    <a href={youtube}>@{youtube.split('@')[1]} <ArrowUpRight className="h-4 w-4 ml-1" /></a>
                                </Button>
                            </div>}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}