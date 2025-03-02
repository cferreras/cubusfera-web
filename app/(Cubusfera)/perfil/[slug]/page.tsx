import ProfileClient from "@/components/ProfileClient";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

// Update the type to handle params as a Promise
type PageProps = {
    params: Promise<{
        slug: string;
    }>;
    searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    // Await the params Promise before accessing its properties
    const resolvedParams = await params;
    return {
        title: `Perfil de ${resolvedParams.slug} - Cubusfera`,
    };
}

export default async function Perfil({ params }: PageProps) {
    const supabase = await createClient();
    // Await the params Promise before accessing its properties
    const resolvedParams = await params;
    
    const { data: profile } = await supabase
        .from("profiles")
        .select("bio, minecraft_username, twitter_username, instagram_username, youtube_channel_url, discord_username, location, id, role")
        .eq("minecraft_username", resolvedParams.slug)
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