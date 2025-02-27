import ProfileClient from "@/components/ProfileClient";
import { createClient } from "@/utils/supabase/server";

export default async function Perfil({ params }: { params: { slug: string } }) {
    const supabase = await createClient();
    
    const { data: profile } = await supabase
        .from("profiles")
        .select("bio, minecraft_username, twitter_username, instagram_username, youtube_channel_url, discord_username, location, id, role")
        .eq("minecraft_username", params.slug)
        .single();

    if (!profile) {
        throw new Error("Profile not found");
    }

    return <ProfileClient initialData={profile} />;
}