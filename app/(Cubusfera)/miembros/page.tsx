import Title from "@/components/Title";
import Container from "@/components/Container";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import dotenv from "dotenv";
import MemberDisplay from "@/components/MemberDisplay";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createClient } from "@/utils/supabase/server";

dotenv.config();
export const metadata: Metadata = {
    title: 'Miembros – Cubusfera',
    description: 'Miembros del servidor de Minecraft Cubusfera',
}

export default async function Miembros() {
    const supabase = createClient();
    
    const { data: members, error } = await (await supabase)
        .from('profiles')
        .select('id, minecraft_username, created_at')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching members:', error);
        return <div>Error loading members</div>;
    }

    const formattedMembers = members?.map((member: { id: any; minecraft_username: any; created_at: string | number | Date; }) => ({
        id: member.id,
        displayName: member.minecraft_username,
        registered: new Date(member.created_at).toLocaleDateString()
    })) || [];

    return (
        <TooltipProvider>
            <Title title="Miembros" subtitle="Miembros del servidor" />
            <Container className="py-9">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formattedMembers.map((member) => (
                        <MemberDisplay
                            key={member.id}
                            member={member}
                        />
                    ))}
                </div>
            </Container>
        </TooltipProvider>
    );
}