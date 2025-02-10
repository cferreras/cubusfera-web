"use server";
import Link from "next/link";
import { createClient } from '@/utils/supabase/server';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { logout } from "@/app/actions";
import { LogOutIcon, UserIcon } from "lucide-react";

export default async function LoginProfileButton() {
    const supabase = await createClient();
    const session = await supabase.auth.getUser();
    const discordUser = session?.data?.user?.user_metadata?.full_name;

    return (
        <>
            {discordUser ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="h-10 w-10 border-2 border-black dark:border-white cursor-pointer transition-transform hover:scale-110">
                            <AvatarImage
                                src={`https://mc-heads.net/avatar/MHF_Steve/24`}
                                alt="Avatar del usuario"
                                className="rounded-full object-cover"
                            />
                            <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold">
                                {discordUser[0]?.toUpperCase() || 'U'} {/* Muestra la primera letra del nombre como fallback */}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-48 shadow-md rounded-md py-1 overflow-hidden">
                        <DropdownMenuItem asChild>
                            <Link href="/perfil" className="flex items-center px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                                <UserIcon className="mr-2 h-4 w-4" /> {/* Icono de perfil */}
                                Perfil
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <form action={logout} className="w-full">
                                <button
                                    type="submit"
                                    className="flex items-center w-full px-2 py-1 text-sm text-red-600"
                                >
                                    <LogOutIcon className="mr-2 h-4 w-4 text-red-600" /> {/* Icono de cierre de sesión */}
                                    Cerrar sesión
                                </button>
                            </form>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button variant="ghost" asChild>
                    <Link href="/login" className="flex items-center gap-x-1.5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"
                            />
                        </svg>
                        <span className="hidden sm:block">Iniciar sesión</span>
                    </Link>
                </Button>
            )}
        </>
    );
}