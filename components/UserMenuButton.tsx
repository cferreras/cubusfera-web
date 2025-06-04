"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import UserDropdownMenu from "./UserDropdownMenu"
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useState, useEffect, useRef } from "react"

interface UserMenuButtonProps {
    discordUser: string
    discordAvatar: string
    email: string
    minecraftUsername: string
    isMobile: boolean
}

export default function UserMenuButton({ discordUser, discordAvatar, email, minecraftUsername, isMobile }: UserMenuButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={dropdownRef} className=" items-center gap-4 backdrop-blur-sm hover:bg-white/5 rounded-xl z-[1]">
            <div className="flex grow items-center">
                <Button 
                    variant="ghost" 
                    className="flex grow items-center justify-center gap-3 !rounded-xl bg-gray-100 hover:bg-gray-100 dark:bg-[#21364A] hover:saturate-150"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {!isMobile && (
                        <Avatar className="w-6 h-6 flex rounded-full shrink-0">
                            <AvatarImage
                                src={discordAvatar}
                                alt="Avatar del usuario"
                                className="rounded-full object-cover"
                            />
                            <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold">
                                {discordUser[0]?.toUpperCase() || 'U'}
                            </AvatarFallback>
                        </Avatar>
                    )}
                    {!isOpen ? <HamburgerMenuIcon className=" items-center justify-center" /> :
                    <Cross1Icon className=" items-center justify-center" />}
                </Button>
                <UserDropdownMenu 
                    discordUser={discordUser}
                    discordAvatar={discordAvatar}
                    minecraftUsername={minecraftUsername}
                    email={email}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    isMobile={isMobile}
                />
            </div>
        </div>
    )
}