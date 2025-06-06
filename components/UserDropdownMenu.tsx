"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOutIcon, HomeIcon, MapIcon, NotebookIcon, ScaleIcon, UsersIcon, UserIcon, Trophy, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { logout, signInWithDiscord } from "@/app/actions";

interface UserDropdownMenuProps {
    discordUser: string;
    discordAvatar: string;
    email: string;
    isOpen: boolean;
    onClose: () => void;
    minecraftUsername: string;
    isMobile: boolean;
}

export default function UserDropdownMenu({
    discordUser,
    discordAvatar,
    email,
    isOpen,
    onClose,
    minecraftUsername,
}: UserDropdownMenuProps) {
    return (
        <div className={`w-[calc(100vw-4rem)] sm:w-96 flex flex-col gap-2 absolute right-0 -bottom-4 translate-y-full p-4 dark:bg-neutral-900 bg-neutral-50 border border-black/10 dark:border-white/10 rounded-3xl shadow-xl shadow-black/25 backdrop-blur-sm transition-all duration-200 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            {discordUser !== 'Invitado' && <div className="flex flex-col bg-neutral-100 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 rounded-2xl overflow-hidden">
                <div className="flex flex-col items-center justify-center gap-2 px-4 py-6" data-pattern="cross">
                    <Avatar className="w-10 h-10 flex rounded-full shrink-0">
                        <AvatarImage
                            src={discordAvatar}
                            alt="Avatar del usuario"
                            className="rounded-full object-cover"
                        />
                        <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold">
                            {discordUser[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <span className="dark:text-neutral-300 text-neutral-600 text-sm">{email}</span>
                </div>
            </div>}

            <div className="flex gap-0 lg:hidden">
                <Link href="/" onClick={onClose} className="w-1/4 py-4 bg-neutral-100 dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700 hover:bg-neutral-200 focus-visible:bg-neutral-300 border border-neutral-200 border-r-0 dark:border-neutral-700 dark:bg-neutral-800 rounded-l-2xl outline-none">
                    <HomeIcon className="mx-auto w-4 h-4 flex items-center justify-center text-sm dark:text-neutral-300 text-neutral-700" />
                    <div className="text-xs text-center">Inicio</div>
                </Link>
                <Link href="/mapa" onClick={onClose} className="w-1/4 py-4 bg-neutral-100 dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700 hover:bg-neutral-200 focus-visible:bg-neutral-300 border border-neutral-200 border-r-0 dark:border-neutral-700 dark:bg-neutral-800 rounded-0 outline-none">
                    <MapIcon className="mx-auto w-4 h-4 flex items-center justify-center text-xs dark:text-neutral-300 text-neutral-700" />
                    <div className="text-xs text-center">Mapa</div>
                </Link>
                <Link href="/blog" onClick={onClose} className="w-1/4 py-4 bg-neutral-100 dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700 hover:bg-neutral-200 focus-visible:bg-neutral-300 border border-neutral-200 border-r-0 dark:border-neutral-700 dark:bg-neutral-800 rounded-0 outline-none">
                    <NotebookIcon className="mx-auto w-4 h-4 flex items-center justify-center text-xs dark:text-neutral-300 text-neutral-700" />
                    <div className="text-xs text-center">Blog</div>
                </Link>
                <Link href="/normas" onClick={onClose} className="w-1/4 py-4 bg-neutral-100 dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700 hover:bg-neutral-200 focus-visible:bg-neutral-300 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 rounded-r-2xl outline-none">
                    <ScaleIcon className="mx-auto w-4 h-4 flex items-center justify-center text-xs dark:text-neutral-300 text-neutral-700" />
                    <div className="text-xs text-center">Normas</div>
                </Link>
            </div>

            {discordUser !== 'Invitado' && <Link
                href={`/perfil/${minecraftUsername}`}
                onClick={onClose}
                className="flex items-center gap-4 px-4 py-5 bg-neutral-100 dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700 hover:bg-neutral-200 focus-visible:bg-neutral-300 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 rounded-2xl outline-none cursor-pointer"
            >
                <UserIcon className="w-4 h-4 flex items-center justify-center text-sm dark:text-neutral-300 text-neutral-700" />
                Perfil
            </Link>}
            
            <Link
                href={`/miembros`}
                onClick={onClose}
                className="flex lg:hidden items-center gap-4 px-4 py-5 bg-neutral-100 dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700 hover:bg-neutral-200 focus-visible:bg-neutral-300 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 rounded-2xl outline-none cursor-pointer"
            >
                <UsersIcon className="w-4 h-4 flex items-center justify-center text-sm dark:text-neutral-300 text-neutral-700" />
                Miembros
            </Link>

            <Link
                href={`/ranking`}
                onClick={onClose}
                className="flex lg:hidden items-center gap-4 px-4 py-5 bg-neutral-100 dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700 hover:bg-neutral-200 focus-visible:bg-neutral-300 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 rounded-2xl outline-none cursor-pointer"
            >
                <Trophy className="w-4 h-4 flex items-center justify-center text-sm dark:text-neutral-300 text-neutral-700" />
                Ranking
            </Link>

            <a
                href="https://cubusfera.tebex.io/"
                onClick={(e) => {
                    e.preventDefault();
                    window.open("https://cubusfera.tebex.io/", "_blank", "noopener,noreferrer");
                    onClose();
                }}
                className="flex items-center gap-4 px-4 py-5 bg-neutral-100 dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700 hover:bg-neutral-200 focus-visible:bg-neutral-300 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 rounded-2xl outline-none cursor-pointer"
            >
                <ShoppingCartIcon className="w-4 h-4 flex items-center justify-center text-sm dark:text-neutral-300 text-neutral-700" />
                Tienda
            </a>

            {discordUser !== 'Invitado' ? (<form action={logout} className="rounded-2xl py-0 px-0 bg-neutral-100 dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700 hover:bg-neutral-200 focus-visible:bg-neutral-300 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 outline-none">
                <button
                    type="submit"
                    className="flex items-center gap-4 px-4 py-5 w-full h-full"
                >
                    <LogOutIcon className="w-4 h-4 flex items-center justify-center fas fa-user text-sm dark:text-neutral-300 text-neutral-700" />
                    Cerrar sesión
                </button>
            </form>):
            (<form action={() => signInWithDiscord(undefined)} className="rounded-2xl py-0 px-0 bg-neutral-100 dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700 hover:bg-neutral-200 focus-visible:bg-neutral-300 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 outline-none">
                <button
                    type="submit"
                    className="flex items-center gap-4 px-4 py-5 w-full h-full"
                >
                    <LogOutIcon className="w-4 h-4 flex items-center justify-center fas fa-user text-sm dark:text-neutral-300 text-neutral-700" />
                    Iniciar sesión
                </button>
            </form>)}
        </div>
    );
}