"use client"
import Container from '@/components/Container';
import {  getSortedPostsData } from '@/lib/posts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from '@/components/ui/pagination';
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link';

export default function Post() {
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const postsPerPage = 4;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts');
                const data = await response.json();
                setPosts(data);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Pagination calculations
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <Container className='py-20'>
                <div className="flex flex-col gap-1 mb-12">
                    <div className="text-lg font-bold">Blog</div>
                    <p className="text-base text-muted-foreground">Descubre las ultimas novedades del servidor aquí.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {isLoading ? (
                        <>
                            {Array.from({ length: postsPerPage }).map((_, index) => (
                                <Skeleton 
                                    key={index} 
                                    className="h-[300px] w-full rounded-3xl"
                                />
                            ))}
                        </>
                    ) : (
                        currentPosts.map((post) => (
                            <Link 
                                href={`/blog/${post?.slug}`} 
                                key={post?.slug}
                            >
                                <div className="group relative overflow-hidden rounded-3xl dark:bg-neutral-900 bg-neutral-100 p-8 dark:hover:bg-neutral-800 hover:bg-neutral-200 transition-colors">
                                    <div className="relative z-10 flex h-full flex-col">
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-semibold mb-2">{post?.title}</h3>
                                            <p className="dark:text-neutral-400 text-neutral-600 mb-4">{post?.description}</p>
                                        </div>
                                        <div className="text-sm text-neutral-500">
                                            {format(new Date(post?.publishedAt), 'MMM d, yyyy', { locale: es })}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                <Pagination className="mt-12">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href="#"
                                    onClick={() => paginate(page)}
                                    isActive={page === currentPage}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : currentPage)}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </Container>
        </>
    );
}