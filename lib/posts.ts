import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { rehype } from 'rehype';
import rehypeSlug from 'rehype-slug';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            slug,
            ...(matterResult.data as { publishedAt: string; title: string; description: string; author: string }),
        };
    });

    return allPostsData.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getPostData(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    // Process markdown content
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    // Add IDs to headings
    const contentWithIds = await rehype()
        .use(rehypeSlug)
        .process(processedContent.toString());

    const contentHtml = contentWithIds.toString();

    return {
        slug,
        contentHtml,
        ...(matterResult.data as { publishedAt: string; title: string; description: string; author: string }),
    };
}