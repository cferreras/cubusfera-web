"use client";
import Head from 'next/head';

interface PostHeadProps {
    postData: {
        title: string;
        description: string;
        author: string;
        date: string;
    }
}

export default function PostHead({ postData }: PostHeadProps) {
    return (
        <Head>
            <title>{postData.title}</title>
            <meta name="description" content={postData.description} />
            <meta name="author" content={postData.author} />
            <meta property="og:title" content={postData.title} />
            <meta property="og:description" content={postData.description} />
        </Head>
    );
}