import Container from '@/components/Container';
import PostList from '@/components/PostList';
import Title from '@/components/Title';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: String(post.slug),
    }));
}

export type paramsType = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: paramsType }) {
    const resolvedParams = await props.params;
    const postData = await getPostData(resolvedParams.slug);
    return {
        title: postData.title + " – " + "Cubusfera",
        description: postData.description,
    };
}

export default async function Post({ params }: { params: { slug: string } }) {
    const postData = await getPostData(params.slug);
    const posts = getSortedPostsData();
    return (
        <>
            <Title title="Blog" subtitle="Nuestro blog" />
            <Container>
                <div className='lg:grid grid-cols-6'>
                    <div className='lg:order-last col-span-2 mt-8 p-4'>
                        <PostList posts={posts} />
                    </div>
                    <article className=" mx-auto mt-8 p-4 col-span-4">
                        <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
                        <p className="text-gray-500 mb-4">
                            {format(new Date(postData.publishedAt), 'd MMMM, yyyy', { locale: es })}
                        </p>
                        <div
                            className="prose lg:prose-md prose-h1:text-2xl prose-h1:font-semibold prose-headings:text-gray-700"
                            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                        />
                    </article>
                </div>
            </Container>
        </>
    );
}