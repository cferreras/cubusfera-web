"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import CubusferaIconDark from "@/components/icon/cubusfera-icon-dark"
import CubusferaIconLight from "@/components/icon/cubusfera-icon-light"
import { HomeIcon, MapIcon, NotebookIcon, ScaleIcon, Trophy, UsersIcon } from "lucide-react";

export default function NavbarMenu() {
    return (
        <div className="flex h-16 justify-between">
            <div className="flex">
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
                    <Button asChild variant="ghost">
                        <Link href="/ranking" className="flex items-center gap-x-1">
                            <Trophy className="h-4 w-4" /> Ranking
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}