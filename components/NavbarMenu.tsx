"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { HomeIcon, MapIcon, NotebookIcon, ScaleIcon, Trophy, UsersIcon, ShoppingCartIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NavbarMenu() {
    const pathname = usePathname();
    
    const isActive = (path: string) => pathname === path;
    
    const navItems = [
        { href: "/", icon: <HomeIcon className="h-4 w-4" />, label: "Inicio" },
        { href: "/mapa", icon: <MapIcon className="h-4 w-4" />, label: "Mapa" },
        { href: "/blog", icon: <NotebookIcon className="h-4 w-4" />, label: "Blog" },
        { href: "/normas", icon: <ScaleIcon className="h-4 w-4" />, label: "Reglas" },
        { href: "/miembros", icon: <UsersIcon className="h-4 w-4" />, label: "Miembros" },
        { href: "/ranking", icon: <Trophy className="h-4 w-4" />, label: "Ranking" },
        { href: "https://cubusfera.tebex.io/", icon: <ShoppingCartIcon className="h-4 w-4" />, label: "Tienda" }
    ];
    
    return (
        <div className="flex h-16 items-center justify-center">
            {/* Menú de escritorio */}
            <div className="hidden lg:flex space-x-1">
                {navItems.map((item) => (
                    <Button 
                        key={item.href}
                        asChild 
                        variant="ghost"
                        className={cn(
                            "transition-all duration-200",
                            isActive(item.href)             
                                ? "" 
                                : ""
                        )}
                    >
                        <Link href={item.href} className="flex items-center gap-x-1.5">
                            {item.href === "https://cubusfera.tebex.io/" ? item.icon : null} {item.label}
                        </Link>
                    </Button>
                ))}
            </div>
            
            {/* Menú móvil - Podemos implementarlo más adelante */}
        </div>
    );
}