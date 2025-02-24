"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User2, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/actions";
import DarkmodeToggle from "./DarkmodeToggle";

interface UserDropdownMenuProps {
    discordUser: string;
    discordAvatar: string;
    email: string;
    isOpen: boolean;
    onClose: () => void;
    minecraftUsername: string;  // Add this prop
}

export default function UserDropdownMenu({ 
    discordUser, 
    discordAvatar, 
    email, 
    isOpen, 
    onClose,
    minecraftUsername 
}: UserDropdownMenuProps) {
    return (
        <div className={`w-[calc(100vw-3rem)] sm:w-96 flex flex-col gap-2 absolute right-0 -bottom-4 translate-y-full p-4 dark:bg-neutral-900 bg-neutral-50 border border-white/10 rounded-3xl shadow-xl shadow-black/25 backdrop-blur-sm transition-all duration-200 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="flex flex-col bg-neutral-100 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 rounded-2xl overflow-hidden">
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
            </div>
            
            <Link 
                href={`/perfil/${minecraftUsername}`}
                onClick={onClose}
                className="flex items-center gap-4 px-4 py-5 bg-neutral-100 dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700 hover:bg-neutral-200 focus-visible:bg-neutral-300 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 rounded-2xl outline-none cursor-pointer"
            >
                <User2 className="w-4 h-4 flex items-center justify-center fas fa-user text-sm dark:text-neutral-300 text-neutral-700" />
                Perfil
            </Link>

            <form action={logout} className="rounded-2xl py-0 px-0 bg-neutral-100 dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700 hover:bg-neutral-200 focus-visible:bg-neutral-300 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 outline-none">
                <button
                    type="submit"
                    className="flex items-center gap-4 px-4 py-5 w-full h-full"
                >
                    <LogOutIcon className="w-4 h-4 flex items-center justify-center fas fa-user text-sm dark:text-neutral-300 text-neutral-700" />
                    Cerrar sesión
                </button>
            </form>
            <DarkmodeToggle />
        </div>
    );
}