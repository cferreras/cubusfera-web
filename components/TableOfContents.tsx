"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents({ contentHtml }: { contentHtml: string }) {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    // Extract headings from HTML content
    useEffect(() => {
        if (!contentHtml) return;

        // Create a temporary div to parse the HTML
        const div = document.createElement('div');
        div.innerHTML = contentHtml;

        // Find all heading elements (h1, h2, h3)
        const headingElements = div.querySelectorAll('h1, h2, h3');

        const items: TOCItem[] = Array.from(headingElements).map((heading) => {
            // Get the heading level from the tag name (h1 -> 1, h2 -> 2, etc.)
            const level = parseInt(heading.tagName.substring(1));

            // Get or create an ID for the heading
            const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';

            // If the heading doesn't have an ID, add one
            if (!heading.id) {
                heading.id = id;
            }

            return {
                id,
                text: heading.textContent || '',
                level,
            };
        });

        setHeadings(items);
    }, [contentHtml]);

    // Track active heading on scroll
    useEffect(() => {
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px' }
        );

        // Observe all heading elements
        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [headings]);

    if (headings.length === 0) {
        return null;
    }

    return (
        <div className="rounded-lg">
            <h3 className="text-lg font-medium mb-3 ml-3">Contenido</h3>
            <nav>
                <ul className="space-y-2 m-0 p-0 list-none">
                    {headings.map((heading) => (
                        <li
                            key={heading.id}
                            style={{ paddingLeft: heading.level > 1 ? `${(heading.level - 1) * 0.75}rem` : '0' }}
                        >
                            <a
                                href={`#${heading.id}`}
                                className={cn(
                                    "block text-sm hover:text-primary transition-colors py-1",
                                    activeId === heading.id ? "text-primary font-medium" : "text-muted-foreground"
                                )}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById(heading.id);
                                    if (element) {
                                        // Get the navbar height to offset the scroll
                                        const navbar = document.querySelector('nav.sticky, header.sticky');
                                        const navbarHeight = navbar ? navbar.clientHeight : 80; // Default to 80px if not found
                                        
                                        const elementPosition = element.getBoundingClientRect().top;
                                        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20; // Extra 20px padding
                                        
                                        window.scrollTo({
                                            top: offsetPosition,
                                            behavior: 'smooth'
                                        });
                                    }
                                    setActiveId(heading.id);
                                }}
                            >
                                {heading.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}