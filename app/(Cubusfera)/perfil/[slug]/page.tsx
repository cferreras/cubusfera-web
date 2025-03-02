import ProfileClient from "@/components/ProfileClient";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

// Update the interface to match what Next.js expects
type PageProps = {
    params: {
        slug: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    // Await the params object before accessing its properties
    const { slug } = params;
    return {
        title: `Perfil de ${slug} - Cubusfera`,
    };
}

export default async function Perfil({ params }: PageProps) {
    const supabase = await createClient();
    // Await the params object before accessing its properties
    const { slug } = params;
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