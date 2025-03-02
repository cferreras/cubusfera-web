"use client"; // Asegúrate de marcar este componente como "use client"
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from '@/components/ui/pagination';
import { useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PostList({ posts }: { posts: any[] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4; // Número de posts por página

    // Calcular los posts que se mostrarán en la página actual
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Cambiar de página
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(posts.length / postsPerPage);

    return (
        <>
            <div className='text-3xl font-bold mb-4'>Noticias</div>
            <div className="space-y-4">
                {currentPosts.map(({ slug, publishedAt, title }) => (
                    <Card key={slug} className="hover:shadow-lg transition-shadow">
                        <Link href={`/blog/${slug}`}>
                            <CardHeader>
                                <h2 className="text-xl font-semibold text-indigo-500 dark:text-indigo-300 hover:underline">
                                    {title}
                                </h2>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {format(new Date(publishedAt), 'd MMMM, yyyy', { locale: es })}
                                </p>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>

            {/* Paginación */}
            <Pagination className="mt-6">
                <PaginationContent>
                    {/* Botón "Anterior" */}
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {/* Números de página */}
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

                    {/* Botón "Siguiente" */}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : currentPage)}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
}