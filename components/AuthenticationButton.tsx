"use server"
import Link from "next/link";
import { createClient } from '@/utils/supabase/server';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import UserDropdownMenu from "./UserDropdownMenu";
import UserMenuButton from "./UserMenuButton"

export default async function LoginProfileButton() {
    const supabase = await createClient()
    const session = await supabase.auth.getUser()
    const discordUser = session?.data?.user?.user_metadata?.full_name
    const discordAvatar = session?.data?.user?.user_metadata?.avatar_url
    const email = session?.data?.user?.email

    let minecraftUsername = ""
    if (session?.data?.user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('minecraft_username')
            .eq('id', session.data.user.id)
            .single()
        minecraftUsername = profile?.minecraft_username || ""
    }

    return (
        <>
            {discordUser ? (
                <UserMenuButton
                    minecraftUsername={minecraftUsername}
                    discordUser={discordUser}
                    discordAvatar={discordAvatar}
                    email={email || ''}
                />
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