import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/posts';

// Define an interface for the post structure
interface Post {
    slug: string;
    publishedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Obtén todos los posts para el sitemap directamente desde la función
    const posts = getSortedPostsData();

    // URLs estáticas principales
    const routes = [
        '',
        '/blog',
        '/miembros',
        '/ranking',
        '/formulario',
    ].map(route => ({
        url: `https://cubusfera.com${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // URLs de posts del blog
    const postUrls = posts.map((post: Post) => ({
        url: `https://cubusfera.com/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...routes, ...postUrls];
}