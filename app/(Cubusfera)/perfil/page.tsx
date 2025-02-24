"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Container from "@/components/Container";
import EditBio from "@/components/EditBio";
import ProfileTitle from "@/components/ProfileTitle";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Importa Spinner
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { ArrowUpRight, ExternalLink, ExternalLinkIcon, LoaderIcon, LocateIcon, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { set } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from 'react-markdown';
import { FaDiscord, FaInstagram, FaLocationDot, FaLocationPin, FaLocationPinLock, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { redirect } from 'next/navigation';

export default function Perfil() {
    const [user, setUser] = useState<User | null>(null);
    const [bio, setBio] = useState("");
    const [twitter, setTwitter] = useState("");
    const [minecraftUsername, setMinecraftUsername] = useState("");
    const [instagram, setInstagram] = useState("");
    const [discord, setDiscord] = useState("");
    const [youtube, setYoutube] = useState("");
    const [location, setLocation] = useState("");
    const supabase = createClient();

    useEffect(() => {
        const fetchUserAndRedirect = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);

                if (user) {
                    const { data: profile } = await supabase
                        .from("profiles")
                        .select("minecraft_username")
                        .eq("id", user.id)
                        .single();

                    if (profile?.minecraft_username) {
                        window.location.href = `/perfil/${profile.minecraft_username}`;
                    }
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchUserAndRedirect();
    }, []);

    // Show loading state while redirecting
    return (
        <Container className="py-20">
            <div className="flex justify-center items-center min-h-[50vh]">
                <p className="text-neutral-600 dark:text-neutral-400">Redirigiendo...</p>
            </div>
        </Container>
    );
}