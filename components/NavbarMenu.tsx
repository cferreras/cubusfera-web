"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import CubusferaIconDark from "@/components/icon/cubusfera-icon-dark"
import CubusferaIconLight from "@/components/icon/cubusfera-icon-light"
import { Group, GroupIcon, HomeIcon, MapIcon, NotebookIcon, ScaleIcon, UsersIcon } from "lucide-react";
import { ReaderIcon } from "@radix-ui/react-icons";

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
                                    <SheetTitle className="text-lg font-semibold text-center">
                                        Menú
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="mt-4 space-y-2 flex flex-col">
                                <Button asChild variant="ghost">
                            <Link href="/" className="gap-x-1">
                                <HomeIcon /> Inicio
                            </Link>
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href="/mapa" className="gap-x-1">
                                <MapIcon /> Mapa
                            </Link>
                        </Button>
                        <Button asChild variant="ghost">
                        <Link href="/blog" className="gap-x-1">
                                <NotebookIcon /> Blog
                        </Link>
                            </Button>
                            <Button asChild variant="ghost">
                        <Link href="/normas" className="gap-x-1">
                                <ScaleIcon /> Normas
                        </Link>
                            </Button>
                            <Button asChild variant="ghost">
                        <Link href="/miembros" className="gap-x-1">
                                <UsersIcon /> Miembros
                        </Link>
                            </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Logo */}
                    <Link href="/" className="flex flex-shrink-0 items-center gap-x-2 font-semibold">
                        <CubusferaIconDark className="hidden h-9 w-auto dark:block" />
                        <CubusferaIconLight className="block h-9 w-auto dark:hidden" />
                        Cubusfera
                    </Link>
                    {/* Menú de escritorio */}
                    <div className="hidden lg:ml-6 lg:flex self-center">
                        <Button asChild variant="ghost">
                            <Link href="/" className="gap-x-1">
                                <HomeIcon /> Inicio
                            </Link>
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href="/mapa" className="gap-x-1">
                                <MapIcon /> Mapa
                            </Link>
                        </Button>
                        <Button asChild variant="ghost">
                        <Link href="/blog" className="gap-x-1">
                                <NotebookIcon /> Blog
                        </Link>
                            </Button>
                            <Button asChild variant="ghost">
                        <Link href="/normas" className="gap-x-1">
                                <ScaleIcon /> Normas
                        </Link>
                            </Button>
                            <Button asChild variant="ghost">
                        <Link href="/miembros" className="gap-x-1">
                                <UsersIcon /> Miembros
                        </Link>
                            </Button>
                    </div>
                </div>
            </div>
        </>
    );
}