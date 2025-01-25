import Container from '@/components/Container';
import PostList from '@/components/PostList';
import Title from '@/components/Title';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'
import type { Metadata } from 'next'

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
    const posts = getSortedPostsData();
    return (
        <>
            <Title title="Blog" subtitle="Nuestro blog" />
            <Container>
                <div className='lg:grid grid-cols-6'>
                    <div className='lg:order-last col-span-2 mt-8 p-4'>
                        <PostList posts={posts} />
                    </div>
                    <article className="mt-8 p-4 col-span-4">
                        <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
                        <p className="mb-4">
                            {format(new Date(postData.publishedAt), 'd MMMM, yyyy', { locale: es })}
                        </p>
                        <div
                            className="prose lg:prose-md prose-h1:text-2xl prose-h1:font-semibold dark:prose-invert"
                            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                        />
                    </article>
                </div>
            </Container>
        </>
    );
}