"use client";
import { useOnlinePlayers } from "@/hooks/useOnlinePlayers";
import MemberDisplay, { Member } from "./MemberDisplay";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface MemberListProps {
    members: Member[];
    title: string;
    showPagination?: boolean;
    currentPage?: number;
    totalPages?: number;
    membersPerPage?: number;
}

export default function MemberList({ 
    members, 
    title, 
    showPagination = false,
    currentPage = 1,
    totalPages = 1,
    membersPerPage = 15
}: MemberListProps) {
    const onlinePlayers = useOnlinePlayers();

    // Sort members: online first, then alphabetically
    const sortedMembers = [...members].sort((a, b) => {
        const aOnline = onlinePlayers.includes(a.displayName);
        const bOnline = onlinePlayers.includes(b.displayName);
        
        if (aOnline && !bOnline) return -1;
        if (!aOnline && bOnline) return 1;
        return a.displayName.localeCompare(b.displayName);
    });

    // Apply pagination if needed
    const displayedMembers = showPagination 
        ? sortedMembers.slice((currentPage - 1) * membersPerPage, currentPage * membersPerPage)
        : sortedMembers;

    if (members.length === 0) return null;

    return (
        <>
            <h2 className="text-xl font-semibold mb-4 mt-8">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {displayedMembers.map((member) => (
                    <MemberDisplay
                        key={member.id}
                        member={member}
                        isOnline={onlinePlayers.includes(member.displayName)}
                    />
                ))}
            </div>

            {showPagination && totalPages > 1 && (
                <Pagination className="mt-8">
                    <PaginationContent>
                        {currentPage > 1 && (
                            <PaginationItem>
                                <PaginationPrevious href={`/miembros?page=${currentPage - 1}`} />
                            </PaginationItem>
                        )}

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
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
        </>
    );
}