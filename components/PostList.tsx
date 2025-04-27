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
    const postsPerPage = 6; // Aumentado de 4 a 6 para mostrar más contenido

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
            <div className='text-3xl font-bold mb-4'>Noticias y Tutoriales de Minecraft</div>
            <div className="space-y-4">
                {currentPosts.map(({ slug, publishedAt, title, description }) => (
                    <Card key={slug} className="hover:shadow-lg transition-shadow">
                        <Link href={`/blog/${slug}`}>
                            <CardHeader>
                                <h2 className="text-xl font-semibold text-indigo-500 dark:text-indigo-300 hover:underline">
                                    {title}
                                </h2>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                                    {description}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {format(new Date(publishedAt), 'd MMMM, yyyy', { locale: es })}
                                </p>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>
            
            {/* Sección de categorías populares */}
            <div className="mt-8 mb-6">
                <h3 className="text-lg font-semibold mb-3">Categorías Populares</h3>
                <div className="flex flex-wrap gap-2">
                    <Link href="/blog?categoria=tutoriales" className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
                        Tutoriales
                    </Link>
                    <Link href="/blog?categoria=redstone" className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
                        Redstone
                    </Link>
                    <Link href="/blog?categoria=granjas" className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
                        Granjas
                    </Link>
                    <Link href="/blog?categoria=comandos" className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors">
                        Comandos
                    </Link>
                    <Link href="/blog?categoria=noticias" className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                        Noticias
                    </Link>
                </div>
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