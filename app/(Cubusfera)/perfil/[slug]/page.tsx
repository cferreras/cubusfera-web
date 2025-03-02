import ProfileClient from "@/components/ProfileClient";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const {slug} = await params;
    return {
        title: `Perfil de ${slug} - Cubusfera`,
    };
}

export default async function Perfil({ params }: PageProps) {
    const supabase = await createClient();
    const {slug} = await params;
    const { data: profile } = await supabase
        .from("profiles")
        .select("bio, minecraft_username, twitter_username, instagram_username, youtube_channel_url, discord_username, location, id, role")
        .eq("minecraft_username", slug)
        .single();

    if (!profile) {
        throw new Error("Profile not found");
    }

    const { data: formData } = await supabase
        .from("forms")
        .select("premium_minecraft")
        .eq("id", profile.id)
        .eq("status", "accepted")
        .single();

    return <ProfileClient initialData={{
        ...profile,
        isPremium: formData?.premium_minecraft === 'Sí'
    }} />;
}