"use client"
import Container from '@/components/Container';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useEffect, useState, Suspense } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from '@/components/ui/pagination';
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { useSearchParams, useRouter } from 'next/navigation';

interface Post {
    slug: string;
    title: string;
    description: string;
    publishedAt: string;
    category?: string;
}

function BlogContent() {
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<string[]>([]);
    const [categoryCounts, setCategoryCounts] = useState<{[key: string]: number}>({});
    const postsPerPage = 6; // Increased from 4 to 6 for more content visibility
    
    const searchParams = useSearchParams();
    const router = useRouter();
    const categoryFilter = searchParams.get('categoria');
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts');
                const data = await response.json();
                // Sort posts by publishedAt date in descending order (newest first)
                const sortedPosts = [...data].sort((a, b) => 
                    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
                );
                setPosts(sortedPosts);
                
                // Extract unique categories and count posts per category
                const uniqueCategories = Array.from(
                    new Set(sortedPosts.map(post => post.category).filter(Boolean))
                );
                setCategories(['Todos', ...uniqueCategories] as string[]);
                
                // Count posts per category
                const counts: {[key: string]: number} = {'Todos': sortedPosts.length};
                uniqueCategories.forEach(category => {
                    counts[category as string] = sortedPosts.filter(post => post.category === category).length;
                });
                setCategoryCounts(counts);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Filter posts by category if needed
    const filteredPosts = categoryFilter && categoryFilter !== 'Todos'
        ? posts.filter(post => post.category === categoryFilter)
        : posts;

    // Pagination calculations
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    
    const handleCategoryChange = (category: string) => {
        setCurrentPage(1); // Reset to first page when changing category
        if (category === 'Todos') {
            router.push('/blog');
        } else {
            router.push(`/blog?categoria=${category}`);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-1 mb-8">
                <h1 className="text-3xl font-bold">Blog de Minecraft Técnico</h1>
                <p className="text-base text-muted-foreground">
                    Tutoriales, guías y noticias sobre redstone, granjas y técnicas avanzadas en Minecraft.
                    Descubre los secretos del juego y mejora tus construcciones con nuestros artículos especializados.
                </p>
            </div>
            
            {/* Categories filter */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Categorías</h2>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <Badge 
                            key={category}
                            variant={categoryFilter === category || (!categoryFilter && category === 'Todos') ? "default" : "outline"}
                            className="px-3 py-1 cursor-pointer hover:bg-primary/90 dark:hover:text-black hover:text-white"
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category} {categoryCounts[category] && `(${categoryCounts[category]})`}
                        </Badge>
                    ))}
                </div>
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
                ) : currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                        <Link
                            href={`/blog/${post?.slug}`}
                            key={post?.slug}
                        >
                            <article className="group relative overflow-hidden rounded-3xl dark:bg-neutral-900 bg-neutral-100 p-8 dark:hover:bg-neutral-800 hover:bg-neutral-200 transition-colors">
                                <div className="relative z-10 flex h-full flex-col">
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-2xl font-semibold">{post?.title}</h3>
                                            {post.category && (
                                                <Badge variant="secondary" className="ml-2">
                                                    {post.category}
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="dark:text-neutral-400 text-neutral-600 mb-4 line-clamp-3">
                                            {post?.description}
                                        </p>
                                    </div>
                                    <time dateTime={post?.publishedAt} className="text-sm text-neutral-500">
                                        {format(new Date(post?.publishedAt), 'MMM d, yyyy', { locale: es })}
                                    </time>
                                </div>
                            </article>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-2 py-12 text-center">
                        <h3 className="text-xl font-medium mb-2">No hay artículos en esta categoría</h3>
                        <p className="text-muted-foreground mb-4">
                            Estamos trabajando en nuevos contenidos para esta categoría. Mientras tanto, 
                            puedes explorar otras categorías o volver más tarde para ver las actualizaciones.
                        </p>
                        <Badge 
                            variant="outline"
                            className="px-3 py-1 cursor-pointer hover:bg-primary/90"
                            onClick={() => handleCategoryChange('Todos')}
                        >
                            Ver todos los artículos
                        </Badge>
                    </div>
                )}
            </div>

            {filteredPosts.length > 0 && (
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
            )}
            
            {/* SEO-friendly content section */}
            <section className="mt-16 border-t pt-8 dark:border-neutral-800 border-neutral-200">
                <h2 className="text-2xl font-semibold mb-4">Sobre nuestro blog de Minecraft Técnico</h2>
                <div className="prose dark:prose-invert max-w-none">
                    <p>
                        Bienvenido al blog de Cubusfera, tu fuente definitiva de información sobre Minecraft técnico. 
                        Nuestros artículos están escritos por jugadores experimentados que comparten sus conocimientos 
                        sobre redstone, granjas eficientes, comandos avanzados y mucho más.
                    </p>
                    <p>
                        Ya seas un jugador novato o un veterano de Minecraft, encontrarás contenido valioso 
                        que te ayudará a mejorar tus habilidades y a descubrir nuevas formas de disfrutar del juego.
                    </p>
                    <p>
                        Explora nuestras diferentes categorías para encontrar exactamente lo que buscas, 
                        desde tutoriales paso a paso hasta análisis detallados de las últimas actualizaciones.
                    </p>
                </div>
            </section>
        </>
    );
}

export default function Post() {
    return (
        <Container className='py-20'>
            <Suspense fallback={
                <div className="flex flex-col gap-8">
                    <div>
                        <Skeleton className="h-10 w-64 mb-4" />
                        <Skeleton className="h-6 w-full max-w-2xl" />
                    </div>
                    <div>
                        <Skeleton className="h-8 w-32 mb-3" />
                        <div className="flex gap-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} className="h-8 w-24" />
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-[300px] w-full rounded-3xl"
                            />
                        ))}
                    </div>
                </div>
            }>
                <BlogContent />
            </Suspense>
        </Container>
    );
}