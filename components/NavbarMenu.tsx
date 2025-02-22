"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import CubusferaIconDark from "@/components/icon/cubusfera-icon-dark"
import CubusferaIconLight from "@/components/icon/cubusfera-icon-light"
import { HomeIcon, MapIcon, NotebookIcon, ScaleIcon, UsersIcon } from "lucide-react";

export default function NavbarMenu() {
    return (
        <div className="flex h-16 justify-between">
            <div className="flex">
                {/* Logo */}
                <Link href="/" className="flex flex-shrink-0 items-center gap-x-2 font-semibold">
                    <CubusferaIconDark className="hidden h-9 w-auto dark:block" />
                    <CubusferaIconLight className="block h-9 w-auto dark:hidden" />
                    Cubusfera
                </Link>
                {/* Menú de escritorio */}
                <div className="hidden lg:ml-6 lg:flex self-center">
                    <Button asChild variant="ghost">
                        <Link href="/" className="flex items-center gap-x-1">
                            <HomeIcon className="h-4 w-4" /> Inicio
                        </Link>
                    </Button>
                    <Button asChild variant="ghost">
                        <Link href="/mapa" className="flex items-center gap-x-1">
                            <MapIcon className="h-4 w-4" /> Mapa
                        </Link>
                    </Button>
                    <Button asChild variant="ghost">
                        <Link href="/blog" className="flex items-center gap-x-1">
                            <NotebookIcon className="h-4 w-4" /> Blog
                        </Link>
                    </Button>
                    <Button asChild variant="ghost">
                        <Link href="/normas" className="flex items-center gap-x-1">
                            <ScaleIcon className="h-4 w-4" /> Normas
                        </Link>
                    </Button>
                    <Button asChild variant="ghost">
                        <Link href="/miembros" className="flex items-center gap-x-1">
                            <UsersIcon className="h-4 w-4" /> Miembros
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}