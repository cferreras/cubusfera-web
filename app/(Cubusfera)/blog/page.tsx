import Container from '@/components/Container';
import PostList from '@/components/PostList';
import Title from '@/components/Title';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Blog – Cubusfera',
    description: 'Blog del servidor de Minecraft Cubusfera',
}
export default async function Post() {
    // const postData = await getPostData(params.slug);
    const posts = getSortedPostsData();
    const latestPost = posts[0];
    const latestPostData = await getPostData(latestPost.slug);

    return (
        <>
            <Title title="Blog" subtitle="Nuestro blog" />
            <Container>
                <div className='lg:grid grid-cols-6 '>
                <div className='lg:order-last col-span-2 mt-8 p-4'>
                    <PostList posts={posts} />
                    </div>
                <article className=" mt-8 p-4 col-span-4">
                    <h1 className="text-3xl font-bold mb-4">{latestPost.title}</h1>
                    <p className="mb-4">
                        {format(new Date(latestPost.publishedAt), 'd MMMM, yyyy', { locale: es })}
                    </p>
                    <div
                        className="prose lg:prose-md prose-h1:text-2xl prose-h1:font-semibold prose-headings:text-black dark:prose-headings:text-white dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: latestPostData.contentHtml }}
                    />
                </article>
                </div>
            </Container>
        </>
    );
}