"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export default function NavbarMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="flex h-16 justify-between">
                <div className="flex">
                    {/* Botón de menú móvil */}
                    <div className="-ml-2 mr-2 flex items-center lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    aria-controls="mobile-menu"
                                    aria-expanded="false"
                                >
                                    <span className="sr-only">Abrir menú principal</span>
                                    {/* Icono cuando el menú está cerrado */}
                                    <svg
                                        className={!isOpen ? "block h-6 w-6" : "hidden h-6 w-6"}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                        />
                                    </svg>
                                    {/* Icono cuando el menú está abierto */}
                                    <svg
                                        className={isOpen ? "block h-6 w-6" : "hidden h-6 w-6"}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </Button>
                            </SheetTrigger>

                            {/* Contenido del menú móvil */}
                            <SheetContent side="left" className="w-64">
                                <SheetHeader>
                                    <SheetTitle className="text-lg font-semibold">
                                        Menú
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="mt-4 space-y-2">
                                    <Link
                                        href="/"
                                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                    >
                                        <svg
                                            className="h-6 w-6 mr-2 text-indigo-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"
                                            />
                                        </svg>
                                        Inicio
                                    </Link>
                                    <Link
                                        href="/mapa"
                                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                    >
                                        <svg
                                            className="h-6 w-6 mr-2 text-indigo-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M15 5.1L9 3L3 5.02v16.2l6-2.33l6 2.1l6-2.02V2.77zm0 13.79l-6-2.11V5.11l6 2.11z"
                                            />
                                        </svg>
                                        Mapa
                                    </Link>
                                    <Link
                                        href="/blog"
                                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                    >
                                        <svg
                                            className="h-6 w-6 mr-2 text-indigo-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-6 14H8c-.55 0-1-.45-1-1s.45-1 1-1h5c.55 0 1 .45 1 1s-.45 1-1 1m3-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1m0-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1"
                                            />
                                        </svg>
                                        Blog
                                    </Link>
                                    <Link
                                        href="/normas"
                                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                    >
                                        <svg
                                            className="h-6 w-6 mr-2 text-indigo-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M12 3c-1.27 0-2.4.8-2.82 2H3v2h1.95L2 14c-.47 2 1 3 3.5 3s4.06-1 3.5-3L6.05 7h3.12c.33.85.98 1.5 1.83 1.83V20H2v2h20v-2h-9V8.82c.85-.32 1.5-.97 1.82-1.82h3.13L15 14c-.47 2 1 3 3.5 3s4.06-1 3.5-3l-2.95-7H21V5h-6.17C14.4 3.8 13.27 3 12 3m0 2a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m-6.5 5.25L7 14H4zm13 0L20 14h-3z"
                                            />
                                        </svg>
                                        Normas
                                    </Link>
                                    <Link
                                        href="/miembros"
                                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                    >
                                        <svg
                                            className="h-6 w-6 mr-2 text-indigo-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5"
                                            />
                                        </svg>
                                        Miembros
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Logo */}
                    <Link href="/" className="flex flex-shrink-0 items-center">
                    <svg className="h-10 w-auto hidden dark:block select-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756.22 756.22"><g data-name="Layer_1"><circle cx="378.11" cy="378.11" r="378.11" style={{ fill: "#fff" }}/><path d="M160.26 252.33v251.56l217.85 125.78 217.86-125.78V252.33L378.11 126.55 160.26 252.33z"/><path style={{ stroke: "#231f20", strokeMiterlimit: 10, fill: "#fff" }} d="M378.11 629.67V378.11l217.86-125.78-217.86 377.34z"/></g></svg>
                    <svg className="h-10 w-auto block dark:hidden select-none" id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756.22 756.22"><defs><style>{".cls-1{fill:#231f20}"}</style></defs><g id="Layer_1-2" data-name="Layer_1"><circle className="cls-1" cx="378.11" cy="378.11" r="378.11"/><path style={{fill:"#fff"}} d="M160.26 252.33v251.56l217.85 125.78 217.86-125.78V252.33L378.11 126.55 160.26 252.33z"/><path className="cls-1" d="M378.11 629.67V378.11l217.86-125.78-217.86 377.34z"/></g></svg>
                    </Link>

                    {/* Menú de escritorio */}
                    <div className="hidden lg:ml-6 lg:flex">
                        <Link
                            href="/"
                            className="inline-flex items-center px-8 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <svg
                                className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-500"
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"
                                />
                            </svg>
                            Inicio
                        </Link>
                        <Link
                            href="/mapa"
                            className="inline-flex items-center px-8 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <svg
                                className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-500"
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M15 5.1L9 3L3 5.02v16.2l6-2.33l6 2.1l6-2.02V2.77zm0 13.79l-6-2.11V5.11l6 2.11z"
                                />
                            </svg>
                            Mapa
                        </Link>
                        <Link
                            href="/blog"
                            className="inline-flex items-center px-8 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <svg
                                className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-500"
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-6 14H8c-.55 0-1-.45-1-1s.45-1 1-1h5c.55 0 1 .45 1 1s-.45 1-1 1m3-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1m0-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1"
                                />
                            </svg>
                            Blog
                        </Link>
                        <Link
                            href="/normas"
                            className="inline-flex items-center px-8 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <svg
                                className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-500"
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M12 3c-1.27 0-2.4.8-2.82 2H3v2h1.95L2 14c-.47 2 1 3 3.5 3s4.06-1 3.5-3L6.05 7h3.12c.33.85.98 1.5 1.83 1.83V20H2v2h20v-2h-9V8.82c.85-.32 1.5-.97 1.82-1.82h3.13L15 14c-.47 2 1 3 3.5 3s4.06-1 3.5-3l-2.95-7H21V5h-6.17C14.4 3.8 13.27 3 12 3m0 2a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m-6.5 5.25L7 14H4zm13 0L20 14h-3z"
                                />
                            </svg>
                            Normas
                        </Link>
                        <Link
                            href="/miembros"
                            className="inline-flex items-center px-8 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <svg
                                className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-500"
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5"
                                />
                            </svg>
                            Miembros
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}