import Container from '@/components/Container';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'
import type { Metadata } from 'next'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';

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
    return {
        // guion largo de
        title: postData.title + " – " + "Cubusfera",
        description: postData.description,
    };
}


export default async function Post({ params }: Props) {
    const slug = (await params).slug
    const postData = await getPostData(slug);
    return (
        <Container className="py-20">
            <div>
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link className='text-lg dark:text-white text-black' href="/blog">Blog</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator  className='[&>svg]:w-5 [&>svg]:h-5'>
                        <ChevronRightIcon/>
                        </BreadcrumbSeparator>
                        <BreadcrumbItem className='text-lg'>
                                {postData.title}
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <article className="mt-8 ">
                    <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
                    <p className="mb-4 text-muted-foreground">
                        {format(new Date(postData.publishedAt), 'd MMMM, yyyy', { locale: es })}
                    </p>
                    <div
                        className="prose !max-w-none lg:prose-md prose-h1:text-2xl prose-h1:font-semibold dark:prose-invert prose-img:rounded-2xl prose-img:border"
                        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                    />
                </article>
            </div>
        </Container>
    );
}