
import Container from "@/components/Container";
import { Metadata } from "next";
import dotenv from "dotenv";
import MemberDisplay from "@/components/MemberDisplay";
import { createClient } from "@/utils/supabase/server";

dotenv.config();
export const metadata: Metadata = {
    title: 'Miembros – Cubusfera',
    description: 'Miembros del servidor de Minecraft Cubusfera',
}

export default async function Miembros() {
    const supabase = await createClient();

    const { data: members, error } = await supabase
        .from('profiles')
        .select('id, minecraft_username, created_at, role')
        .not('minecraft_username', 'is', null)
        .in('id', 
            (await supabase
                .from('forms')
                .select('id')
                .eq('status', 'accepted'))
                .data?.map(form => form.id) || []
        )
        .order('created_at', { ascending: false })
        .throwOnError();

    if (error) {
        console.error('Error fetching members:', error);
        return <div>Error loading members</div>;
    }

    const formattedMembers = members?.map((member: { id: string; minecraft_username: string; role: string; created_at: string | number | Date; }) => ({
        id: member.id,
        role: member.role,
        displayName: member.minecraft_username,
        registered: new Date(member.created_at).toLocaleDateString()
    })) || [];

    return (
        <Container className="py-20">
            <div className="flex flex-col gap-1 mb-12">
                <h1 className="text-lg font-bold">Miembros</h1>
                <p className="text-base text-muted-foreground">
                    Explora la lista de jugadores que forman parte de nuestra comunidad.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formattedMembers.map((member) => (
                    <MemberDisplay
                        key={member.id}
                        member={member}
                    />
                ))}
            </div>
        </Container>
    );
}