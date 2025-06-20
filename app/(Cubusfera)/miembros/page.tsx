
import Container from "@/components/Container";
import dotenv from "dotenv";
import { createClient } from "@/utils/supabase/server";
import ServerStatsSection from "@/components/ServerStatsSection";
import MemberList from "@/components/MemberList";

dotenv.config();

type SearchParams = {
    page?: string; // Define the expected query parameters
    [key: string]: string | string[] | undefined; // Allow for additional query parameters
};

type PageProps = {
    searchParams: Promise<SearchParams>; // Note that searchParams is now a Promise
};

export default async function Miembros({
    searchParams,
}: PageProps) {
    const resolvedSearchParams = await searchParams;
    const currentPage = Number(resolvedSearchParams.page) || 1;
    const membersPerPage = 15;
    const supabase = await createClient();

    // Get all members and calculate stats from database
    const { data: allMembers } = await supabase
        .from('profiles')
        .select('id, minecraft_username, created_at, role, is_vip, vip_theme, custom_banner_url')
        .not('minecraft_username', 'is', null)
        .in('id',
            (await supabase
                .from('forms')
                .select('id, premium_minecraft')
                .eq('status', 'accepted'))
                .data?.map(form => form.id) || []
        );


    // Calculate stats
    const totalPlayers = allMembers?.length || 0;

    // Format all members
    const formattedMembers = await Promise.all(allMembers?.map(async (member: {
        id: string;
        minecraft_username: string;
        role: string;
        is_vip: boolean;
        vip_theme: string;
        custom_banner_url: string;
        created_at: string | number | Date;
    }) => {
        const { data: formData } = await supabase
            .from('forms')
            .select('premium_minecraft')
            .eq('id', member.id)
            .single();

        return {
            id: member.id,
            role: member.role || 'miembro', // Default to 'miembro' if role is null
            displayName: member.minecraft_username,
            registered: new Date(member.created_at).toLocaleDateString(),
            isPremium: formData?.premium_minecraft === 'Sí',
            is_vip: member.is_vip,
            vip_theme: member.vip_theme,
            custom_banner_url: member.custom_banner_url
        };
    }) || []);

    // Group members by role
    const adminMembers = formattedMembers.filter(member => member.role === 'admin');
    const modMembers = formattedMembers.filter(member => member.role === 'mod');
    const regularMembers = formattedMembers.filter(member => member.role === 'user' || !member.role);

    // Calculate total pages for regular members
    const totalPages = Math.ceil(regularMembers.length / membersPerPage);

    return (
        <Container className="py-20">
            <div className="flex flex-col gap-1 mb-12">
                <h1 className="text-lg">Miembros</h1>
                <p className="text-base text-muted-foreground">
                    Explora la lista de jugadores que forman parte de nuestra comunidad.
                </p>
            </div>

            <ServerStatsSection 
                totalPlayers={totalPlayers}
            />

            <MemberList members={adminMembers} title="Administradores" showPagination={false} />
            <MemberList members={modMembers} title="Moderadores" showPagination={false} />
            <MemberList 
                members={regularMembers} 
                title="Miembros" 
                showPagination={true}
                currentPage={currentPage}
                totalPages={totalPages}
                membersPerPage={membersPerPage}

            />
        </Container>
    );
}