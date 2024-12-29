import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'


/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PostList({ posts }: { posts: any[] }) {
    return (
        <>
            <div className='text-3xl font-bold mb-4'>Noticias</div>
            <ul className="space-y-4 divide-y divide-gray-200 bg-gray-50 py-4 px-3 border">
                {posts.map(({ slug, publishedAt, title }) => (
                    <li key={slug} className="p-4 ">
                        <Link href={`/blog/${slug}`} className="text-indigo-500 hover:underline">
                            <h2 className="text-xl font-semibold">{title}</h2>
                        </Link>
                        <p className="text-gray-500">{format(new Date(publishedAt), 'd MMMM, yyyy', { locale: es })}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}