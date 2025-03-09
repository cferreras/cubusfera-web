
import Container from "@/components/Container";
import { Metadata } from "next";
import dotenv from "dotenv";
import MemberDisplay from "@/components/MemberDisplay";
import { createClient } from "@/utils/supabase/server";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

dotenv.config();
export const metadata: Metadata = {
    title: 'Miembros – Cubusfera',
    description: 'Miembros del servidor de Minecraft Cubusfera',
}

export default async function Miembros({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    // Convert searchParams to a regular object if it's a Promise
    const params = searchParams instanceof Promise ? await searchParams : searchParams;
    const currentPage = Number(params?.page) || 1;
    const membersPerPage = 15; // 3x5 grid
    const supabase = await createClient();

    // Get all members
    const { data: allMembers } = await supabase
        .from('profiles')
        .select('id, minecraft_username, created_at, role')
        .not('minecraft_username', 'is', null)
        .in('id',
            (await supabase
                .from('forms')
                .select('id, premium_minecraft')
                .eq('status', 'accepted'))
                .data?.map(form => form.id) || []
        );

    // Format all members
    const formattedMembers = await Promise.all(allMembers?.map(async (member: {
        id: string;
        minecraft_username: string;
        role: string;
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
            isPremium: formData?.premium_minecraft === 'Sí'
        };
    }) || []);

    // Group members by role
    const adminMembers = formattedMembers.filter(member => member.role === 'admin');
    const modMembers = formattedMembers.filter(member => member.role === 'mod');
    const regularMembers = formattedMembers.filter(member => member.role === 'user' || !member.role);

    // Paginate regular members only
    const startIndex = (currentPage - 1) * membersPerPage;
    const endIndex = startIndex + membersPerPage;
    const paginatedRegularMembers = regularMembers.slice(startIndex, endIndex);

    // Calculate total pages for regular members
    const totalPages = Math.ceil(regularMembers.length / membersPerPage);

    return (
        <Container className="py-20">
            <div className="flex flex-col gap-1 mb-12">
                <h1 className="text-lg font-bold">Miembros</h1>
                <p className="text-base text-muted-foreground">
                    Explora la lista de jugadores que forman parte de nuestra comunidad.
                </p>
            </div>

            {/* Admin Section */}
            {adminMembers.length > 0 && (
                <>
                    <h2 className="text-xl font-semibold mb-4 mt-8">Administradores</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {adminMembers.map((member) => (
                            <MemberDisplay
                                key={member.id}
                                member={member}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Mod Section */}
            {modMembers.length > 0 && (
                <>
                    <h2 className="text-xl font-semibold mb-4 mt-8">Moderadores</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {modMembers.map((member) => (
                            <MemberDisplay
                                key={member.id}
                                member={member}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Regular Members Section */}
            <h2 className="text-xl font-semibold mb-4 mt-8">Miembros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedRegularMembers.map((member) => (
                    <MemberDisplay
                        key={member.id}
                        member={member}
                    />
                ))}
            </div>

            {/* Pagination only for regular members */}
            {totalPages > 1 && (
                <Pagination className="mt-8">
                    <PaginationContent>
                        {currentPage > 1 && (
                            <PaginationItem>
                                <PaginationPrevious href={`/miembros?page=${currentPage - 1}`} />
                            </PaginationItem>
                        )}

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            // Show current page and adjacent pages
                            if (
                                page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 1 && page <= currentPage + 1)
                            ) {
                                return (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href={`/miembros?page=${page}`}
                                            isActive={page === currentPage}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            }

                            // Show ellipsis for gaps
                            if (
                                (page === 2 && currentPage > 3) ||
                                (page === totalPages - 1 && currentPage < totalPages - 2)
                            ) {
                                return (
                                    <PaginationItem key={`ellipsis-${page}`}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }

                            return null;
                        })}

                        {currentPage < totalPages && (
                            <PaginationItem>
                                <PaginationNext href={`/miembros?page=${currentPage + 1}`} />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            )}
        </Container>
    );
}