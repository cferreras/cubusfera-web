import Container from '@/components/Container';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'
import type { Metadata } from 'next'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import Comentarios from '@/components/Comentarios';
import TableOfContents from '@/components/TableOfContents';

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    // read route params
    const slug = (await params).slug
    const postData = await getPostData(slug);
    
    // Create absolute URL for the image
    const imageUrl = postData.coverImage 
        ? (postData.coverImage.startsWith('http') ? postData.coverImage : `https://cubusfera.com${postData.coverImage}`)
        : 'https://cubusfera.com/images/default-og.jpg';
    
    return {
        title: postData.title + " – " + "Cubusfera",
        description: postData.description,
        openGraph: {
            title: postData.title,
            description: postData.description,
            type: 'article',
            publishedTime: postData.publishedAt,
            url: `https://cubusfera.com/blog/${slug}`,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: postData.title,
                }
            ],
            siteName: 'Cubusfera',
        },
        twitter: {
            card: 'summary_large_image',
            title: postData.title,
            description: postData.description,
            images: [imageUrl],
        },
    };
}


export default async function Post({ params }: Props) {
    const slug = (await params).slug
    const postData = await getPostData(slug);
    
    // Get current user for comments
    const supabase = createClient();
    const { data: { user } } = await (await supabase).auth.getUser()
    
    // Create JSON-LD schema for better SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': postData.title,
        'description': postData.description,
        'author': {
            '@type': 'Person',
            'name': postData.author || 'Cubusfera'
        },
        'datePublished': postData.publishedAt,
        'image': postData.coverImage 
            ? (postData.coverImage.startsWith('http') ? postData.coverImage : `https://cubusfera.com${postData.coverImage}`)
            : 'https://cubusfera.com/images/default-og.jpg',
        'publisher': {
            '@type': 'Organization',
            'name': 'Cubusfera',
            'logo': {
                '@type': 'ImageObject',
                'url': 'https://cubusfera.com/cubusfera-logo.png'
            }
        },
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `https://cubusfera.com/blog/${slug}`
        }
    };
    
    return (
        <Container className="py-20">
            {/* Add JSON-LD script */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-3/4">
                    <Breadcrumb className="mb-8">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link className='text-lg dark:text-white text-black' href="/blog">Blog</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className='[&>svg]:w-5 [&>svg]:h-5'>
                                <ChevronRightIcon/>
                            </BreadcrumbSeparator>
                            <BreadcrumbItem className='text-lg'>
                                {postData.title}
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <article className="mt-8">
                        <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
                        <p className="mb-4 text-muted-foreground">
                            {format(new Date(postData.publishedAt), 'd MMMM, yyyy', { locale: es })}
                        </p>
                        <div
                            className="prose !max-w-none lg:prose-md prose-h1:text-2xl prose-h1:font-semibold dark:prose-invert prose-img:rounded-2xl prose-img:border prose-img:w-full prose-img:h-auto"
                            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                        />
                    </article>
                    
                    {/* Comments section */}
                    <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                        <h2 className="text-xl font-semibold mb-6">Comentarios</h2>
                        <Comentarios postSlug={slug} currentUser={user} />
                    </div>
                </div>
                
                {/* Table of Contents */}
                <div className="lg:w-1/4 hidden lg:block">
                    <div className="sticky top-24">
                        <TableOfContents contentHtml={postData.contentHtml} />
                    </div>
                </div>
            </div>
        </Container>
    );
}