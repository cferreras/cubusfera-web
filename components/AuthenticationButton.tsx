"use server"
import Link from "next/link";
import { createClient } from '@/utils/supabase/server';
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
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
                        className="hidden md:flex rounded-lg bg-blue-500 hover:text-white border-none text-white dark:text-white hover:bg-blue-600"
                    >
                        <Link href="/login" className="flex items-center gap-x-2">
                            <span>Iniciar Sesión</span>
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