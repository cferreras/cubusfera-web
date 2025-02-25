"use server"
import Link from "next/link";
import { createClient } from '@/utils/supabase/server';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogInIcon, MenuIcon } from "lucide-react";
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
                    isMobile={false}
                />
            ) : (
                <>
                    <Button 
                        variant="outline" 
                        asChild 
                        className="hidden md:flex rounded-xl border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900"
                    >
                        <Link href="/login" className="flex items-center gap-x-2">
                            <LogInIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-400"/>
                            <span className="text-neutral-900 dark:text-neutral-100">Iniciar sesión</span>
                        </Link>
                    </Button>
                    <div className="md:hidden">
                        <UserMenuButton
                            minecraftUsername=""
                            discordUser="Invitado"
                            discordAvatar=""
                            email=""
                            isMobile={true}
                        />
                    </div>
                </>
            )}
        </>
    );
}