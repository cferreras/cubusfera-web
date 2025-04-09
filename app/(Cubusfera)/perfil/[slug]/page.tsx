import ProfileClient from "@/components/ProfileClient";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

// Update the type to handle both params and searchParams as Promises
type PageProps = {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
    const resolvedParams = await params;
    
    const { data: profile } = await supabase
        .from("profiles")
        .select("bio, minecraft_username, twitter_username, instagram_username, youtube_channel_url, discord_username, location, id, role, is_vip, vip_theme, custom_banner_url")
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

    // Mock achievements - replace with real data later
    const mockAchievements = [
        {
            category: "Tiempo de Juego",
            month: "Enero 2024",
            value: "126 horas"
        },
        {
            category: "Bloques Minados",
            month: "Enero 2024",
            value: "45,892 bloques"
        },
        {
            category: "Mobs Eliminados",
            month: "Enero 2024",
            value: "1,234 mobs"
        },
        {
            category: "Muertes",
            month: "Enero 2024",
            value: "89 muertes"
        },
        {
            category: "Nivel de Experiencia",
            month: "Enero 2024",
            value: "Nivel 156"
        },
        {
            category: "Distancia Recorrida",
            month: "Enero 2024",
            value: "789 km"
        }
    ];

    return <ProfileClient initialData={{
        ...profile,
        isPremium: formData?.premium_minecraft === 'Sí',
        achievements: mockAchievements,
    }} />;
}